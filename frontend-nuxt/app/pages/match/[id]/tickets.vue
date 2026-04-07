<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <h2 class="mb-4 fw-bold border-bottom pb-2">Comprar Entradas</h2>
      
      <div v-if="matchStore.loading || ticketStore.loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      
      <div v-else-if="matchStore.error || ticketStore.error" class="alert alert-danger">
        {{ matchStore.error || ticketStore.error }}
      </div>
      
      <div v-else-if="matchStore.currentMatch">
        <div class="alert alert-info border-0 shadow-sm mb-4">
          <h5 class="fw-bold mb-1">{{ matchStore.currentMatch.home_team }} vs {{ matchStore.currentMatch.away_team }}</h5>
          <small> {{ matchStore.currentMatch.stadium }}</small>
        </div>
        
        <TicketSelector 
          :tickets="matchStore.currentMatch.tickets || []" 
          @reserve="handleReserve" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMatchStore } from '~/stores/matchStore';
import { useTicketStore } from '~/stores/ticketStore';
import { socket } from '~/services/socket';

const route = useRoute();
const router = useRouter();

const matchStore = useMatchStore();
const ticketStore = useTicketStore();

onMounted(() => {
  // Asegurar que el partido e inventario (tickets) estén cargados
  if (!matchStore.currentMatch || matchStore.currentMatch.id != route.params.id) {
    matchStore.fetchMatch(route.params.id);
  }

  // NUEVO: Escuchar evento de websocket
  socket.on("ticketsUpdated", (data) => {
    if (data.matchId == route.params.id) {
      matchStore.fetchMatch(route.params.id); // recargar datos en tiempo real
    }
  });
});

// NUEVO: Limpiamos evento al salir
onUnmounted(() => {
  socket.off("ticketsUpdated");
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
