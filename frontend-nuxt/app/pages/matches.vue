<template>
  <div>
    <h2 class="mb-4 fw-bold text-dark border-bottom pb-2">Próximos Partidos</h2>
    
    <div v-if="matchStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    
    <div v-else-if="matchStore.error" class="alert alert-danger">
      {{ matchStore.error }}
    </div>
    
    <div v-else class="row g-4">
      <div v-for="match in matchStore.matches" :key="match.id" class="col-md-6 col-lg-4">
        <MatchCard :match="match" />
      </div>
    </div>
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
