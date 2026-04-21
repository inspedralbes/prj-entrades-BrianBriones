<template>
  <!-- Componente de Tarjeta de Partido -->
  <div class="card h-100 border-0 card-dark">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title fw-bold text-main">{{ match.home_team }} vs {{ match.away_team }}</h5>
      <h6 class="card-subtitle mb-2 text-muted-custom fw-semibold">Estadi: {{ match.stadium }}</h6>
      <p class="card-text text-muted-custom mb-4">Data: {{ formatDate(match.date) }}</p>
      
      <!-- Botón anclado abajo -->
      <div class="mt-auto">
        <NuxtLink :to="`/match/${match.id}`" class="btn btn-outline-neon w-100 fw-bold">
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
