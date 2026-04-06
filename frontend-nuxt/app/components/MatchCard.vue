<template>
  <div class="card h-100 shadow-sm border-0">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold text-primary">{{ match.home_team }} vs {{ match.away_team }}</h5>
      <h6 class="card-subtitle mb-2 text-muted fw-semibold">🏟️ {{ match.stadium }}</h6>
      <p class="card-text text-secondary mb-4">📅 {{ formatDate(match.date) }}</p>
      
      <!-- Botón anclado abajo -->
      <div class="mt-auto">
        <NuxtLink :to="`/match/${match.id}`" class="btn btn-outline-primary w-100 fw-bold">
          Ver entradas
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  match: {
    type: Object,
    required: true
  }
});

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
</script>
