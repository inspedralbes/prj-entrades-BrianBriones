<template>
  <div class="container py-4">
    <h2 class="mb-5 fw-bold text-dark border-bottom pb-3 text-center">🏆 La Liga - Próximos Partidos</h2>
    
    <div v-if="matchStore.loading" class="text-center py-5">
      <div class="spinner-grow text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 fw-bold text-secondary">Obteniendo lista de partidos reales desde TheSportsDB...</p>
    </div>
    
    <div v-else-if="matchStore.error" class="alert alert-danger shadow border-0 rounded-3 p-4 text-center">
      <h5>⚠️ Error de sincronización</h5>
      <p class="mb-0">{{ matchStore.error }}</p>
    </div>
    
    <div v-else-if="matchStore.matches.length === 0" class="alert alert-info shadow border-0 rounded-3 p-4 text-center">
      No hay partidos programados próximamente.
    </div>
    
    <!-- Renderizamos nuestro nuevo componente -->
    <ListaPartidos v-else :matches="matchStore.matches" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useMatchStore } from '~/stores/matchStore';

const matchStore = useMatchStore();

onMounted(() => {
  matchStore.fetchMatches();
});
</script>
