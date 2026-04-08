<template>
  <div>
    <div v-if="matchStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    
    <div v-else-if="matchStore.error" class="alert alert-danger">
      {{ matchStore.error }}
    </div>
    
    <div v-else-if="matchStore.currentMatch" class="card shadow-sm border-0 mt-3">
      <div class="card-header bg-primary text-white py-3">
        <h3 class="mb-0 fw-bold">{{ matchStore.currentMatch.home_team }} vs {{ matchStore.currentMatch.away_team }}</h3>
      </div>
      <div class="card-body py-4">
        <div class="row align-items-center">
          <div class="col-md-8">
            <h5 class="text-muted fw-semibold mb-3">🏟️ Estadio: {{ matchStore.currentMatch.stadium }}</h5>
            <p class="fs-5 mb-0">📅 Fecha: <span class="fw-bold">{{ formatDate(matchStore.currentMatch.date) }}</span></p>
            <p class="text-danger fw-bold mt-3">🔥 {{ viewers }} persona(s) viendo este partido ahora</p>
          </div>
          <div class="col-md-4 text-md-end mt-4 mt-md-0">
            <NuxtLink :to="`/match/${route.params.id}/tickets`" class="btn btn-success btn-lg fw-bold shadow-sm">
              Seleccionar entrada
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMatchStore } from '~/stores/matchStore';
import { socket } from '~/services/socket';

const route = useRoute();
const matchStore = useMatchStore();
const viewers = ref(1);

onMounted(() => {
  matchStore.fetchMatch(route.params.id);

  // Unirse a la sala para contar demanda
  socket.emit("viewMatch", route.params.id);

  // Escuchar número de personas viendo el partido
  socket.on("viewersUpdate", (data) => {
    if (data.matchId == route.params.id) {
      viewers.value = data.count;
    }
  });
});

onUnmounted(() => {
  socket.emit("leaveMatch", route.params.id);
  socket.off("viewersUpdate");
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
</script>
