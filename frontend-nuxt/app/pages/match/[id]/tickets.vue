<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
         <h2 class="fw-bold mb-0">Comprar Entradas</h2>
         <div v-if="!inQueue && (matchStore.currentMatch)" class="card card-dark border-0 rounded-pill px-3 py-1 d-flex flex-row align-items-center gap-2 shadow-sm border border-danger border-opacity-50">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-danger"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
           <span class="text-main fw-bold">{{ timerFormatted }}</span>
         </div>
      </div>
      
      <!-- Pantalla de Cola Virtual -->
      <div v-if="inQueue" class="text-center py-5 card shadow-sm p-4 border-warning">
        <h3 class="text-warning fw-bold mb-3">Estàs a la cua virtual...</h3>
        <div class="spinner-border text-warning my-3" style="width: 3rem; height: 3rem;" role="status"></div>
        <p class="fs-4 mt-3">La teva posició: <strong class="badge bg-warning text-dark fs-3">{{ queuePosition }}</strong></p>
        <p class="text-muted mt-3"><small>Si us plau, no recarreguis la pàgina.</small></p>
      </div>

      <div v-else-if="matchStore.loading || ticketStore.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Carregant disponibilitat...</p>
      </div>
      
      <div v-else-if="matchStore.error || ticketStore.error" class="alert alert-danger">
        {{ matchStore.error || ticketStore.error }}
      </div>
      
      <div v-else-if="matchStore.currentMatch">
        <div class="alert alert-info border-0 shadow-sm mb-4">
          <h5 class="fw-bold mb-1">{{ matchStore.currentMatch.home_team }} vs {{ matchStore.currentMatch.away_team }}</h5>
          <small>Estadi: {{ matchStore.currentMatch.stadium }}</small>
        </div>
        
        <SeatSelection
          v-if="currentStep === 'selection'"
          :match="matchStore.currentMatch"
          @confirm="handleSeatSelection"
        />

        <ResumCompra
          v-else-if="currentStep === 'resum'"
          :match="matchStore.currentMatch"
          :seats="selectedSeatsData"
          @pay="handlePayment"
          @timeout="handleTimeout"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMatchStore } from '~/stores/matchStore';
import { useTicketStore } from '~/stores/ticketStore';
import { socket } from '~/services/socket';

const route = useRoute();
const router = useRouter();

const matchStore = useMatchStore();
const ticketStore = useTicketStore();

// Estados para la cola
const inQueue = ref(true);
const queuePosition = ref(0);

// Flujo de compra
const currentStep = ref('selection');
const selectedSeatsData = ref([]);

// Temporizador Global
const timeLeft = ref(420); // 7 minutes
let timerInterval = null;

const timerFormatted = computed(() => {
  const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0');
  const s = (timeLeft.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

const startTimer = () => {
   if (timerInterval) clearInterval(timerInterval);
   timerInterval = setInterval(() => {
      if (timeLeft.value > 0) {
         timeLeft.value -= 1;
      } else {
         clearInterval(timerInterval);
         handleTimeout();
      }
   }, 1000);
}

watch(inQueue, (newVal) => {
   if (!newVal && currentStep.value !== 'confirmed') {
      startTimer();
   }
});

onMounted(() => {
  // Asegurar que el partido e inventario (tickets) estén cargados
  if (!matchStore.currentMatch || matchStore.currentMatch.id != route.params.id) {
    matchStore.fetchMatch(route.params.id);
  }

  // --- LÓGICA DE SALAS Y COLA ---
  socket.emit('viewMatch', route.params.id);
  socket.emit('joinQueue');
  
  socket.on('queuePosition', (data) => {
    inQueue.value = true;
    queuePosition.value = data.position;
  });

  socket.on('queueApproved', () => {
    inQueue.value = false;
  });

  // --- ESCUCHAR CAMBIOS DE TICKETS EN TIEMPO REAL ---
  socket.on("ticketsUpdated", (data) => {
    // Si la pantalla de tickets la estamos viendo y hay un mensaje o actualización del mismo partido
    if (data.matchId == route.params.id || data.message) {
      matchStore.fetchMatch(route.params.id, true); // recarga en segundo plano sin spinner!
    }
  });
});

// Limpiamos eventos al salir
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
  socket.emit('leaveQueue'); 
  socket.emit('leaveMatch', route.params.id); // Al salir de tickets, liberamos bloqueos temporales
  socket.off("ticketsUpdated");
  socket.off("queuePosition");
  socket.off("queueApproved");
});

// Se invoca al dar click en 'CONFIRMAR I PAGAR' en la vista de Asientos
  const handleSeatSelection = (seats) => {
    // Verificación final en el servidor (Race Condition Check)
    const seatIds = seats.map(s => s.id);
    socket.emit('requestHold', { matchId: route.params.id, seats: seatIds });
    selectedSeatsData.value = seats; // Guardamos temporal
  };

  // Escuchadores de respuesta al HOLD!
  socket.on('holdSuccess', () => {
    currentStep.value = 'resum'; // Pasamos a finalizar compra!
  });

  socket.on('holdFailed', () => {
    alert('⚠️ Error: Un altre usuari ja ha reservat o comprat algun d\'aquests seients just abans que tu. Si us plau, escull-ne uns altres.');
  });
  
  // Clean listeners on leaving
  onUnmounted(() => {
    socket.off('holdSuccess');
    socket.off('holdFailed');
  });

const handlePayment = async () => {
  // Simplificado para la demostración - usando el primer ticket disponible si TheSportsDB
  let tkId = 1; 
  if (matchStore.currentMatch.tickets && matchStore.currentMatch.tickets.length > 0) {
     tkId = matchStore.currentMatch.tickets[0].id;
  }
  
  ticketStore.selectedTicket = tkId;
  ticketStore.quantity = selectedSeatsData.value.length;
  
  // Asegurarnos de que el match_id sea un número entero para no chocar con la validación de Laravel
  const parsedId = parseInt(route.params.id, 10);
  ticketStore.matchId = isNaN(parsedId) ? 1 : parsedId;
  
  await ticketStore.reserveTicket();
  
  if (ticketStore.success) {
    const seatIds = selectedSeatsData.value.map(s => s.id);
    socket.emit('seatPurchased', { matchId: route.params.id, seats: seatIds });
    router.push('/confirmation');
  }
};

const handleTimeout = () => {
  alert("El temps ha expirat. Els seients han sigut alliberats.");
  socket.emit('leaveMatch', route.params.id);
  router.push(`/match/${route.params.id}`);
};
</script>
