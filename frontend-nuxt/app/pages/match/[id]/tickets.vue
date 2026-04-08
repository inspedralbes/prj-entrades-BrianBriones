<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <h2 class="mb-4 fw-bold border-bottom pb-2">Comprar Entradas</h2>
      
      <!-- Pantalla de Cola Virtual -->
      <div v-if="inQueue" class="text-center py-5 card shadow-sm p-4 border-warning">
        <h3 class="text-warning fw-bold mb-3">Estás en la cola virtual 🚶‍♂️</h3>
        <div class="spinner-border text-warning my-3" style="width: 3rem; height: 3rem;" role="status"></div>
        <p class="fs-4 mt-3">Tu posición: <strong class="badge bg-warning text-dark fs-3">{{ queuePosition }}</strong></p>
        <p class="text-muted mt-3"><small>Por favor, no recargues la página ni cierres esta ventana.</small></p>
      </div>

      <div v-else-if="matchStore.loading || ticketStore.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Cargando disponibilidad...</p>
      </div>
      
      <div v-else-if="matchStore.error || ticketStore.error" class="alert alert-danger">
        {{ matchStore.error || ticketStore.error }}
      </div>
      
      <div v-else-if="matchStore.currentMatch">
        <div class="alert alert-info border-0 shadow-sm mb-4">
          <h5 class="fw-bold mb-1">{{ matchStore.currentMatch.home_team }} vs {{ matchStore.currentMatch.away_team }}</h5>
          <small>🏟️ {{ matchStore.currentMatch.stadium }}</small>
        </div>
        
        <TicketSelector 
          :tickets="matchStore.currentMatch.tickets || []"
          :loading="ticketStore.loading || inQueue"
          @reserve="handleReserve" 
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

onMounted(() => {
  // Asegurar que el partido e inventario (tickets) estén cargados
  if (!matchStore.currentMatch || matchStore.currentMatch.id != route.params.id) {
    matchStore.fetchMatch(route.params.id);
  }

  // --- LÓGICA DE COLA ---
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
      matchStore.fetchMatch(route.params.id); // recargar datos en tiempo real
    }
  });
});

// Limpiamos eventos al salir
onUnmounted(() => {
  socket.emit('leaveQueue'); // Avisar al servidor que salimos explícitamente
  socket.off("ticketsUpdated");
  socket.off("queuePosition");
  socket.off("queueApproved");
});

const handleReserve = async (data) => {
  ticketStore.selectedTicket = data.ticket_type_id;
  ticketStore.quantity = data.quantity;
  ticketStore.matchId = route.params.id;
  
  await ticketStore.reserveTicket();
  
  if (ticketStore.success) {
    router.push('/confirmation');
  }
};
</script>
