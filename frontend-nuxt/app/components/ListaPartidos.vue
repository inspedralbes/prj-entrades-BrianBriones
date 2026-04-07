<template>
  <div class="row g-4">
    <div v-for="match in matches" :key="match.id" class="col-md-6 col-lg-4">
      <div class="card h-100 shadow border-0 rounded-4 overflow-hidden" style="transition: transform 0.2s ease;">
        <div class="card-header bg-dark text-white p-3 border-0">
          <h5 class="card-title fw-bold mb-0 text-center">{{ match.home_team }} <br> <span class="text-secondary small">vs</span> <br> {{ match.away_team }}</h5>
        </div>
        <div class="card-body d-flex flex-column p-4">
          <p class="card-subtitle mb-3 text-muted text-center fw-semibold">
             {{ match.stadium }}
          </p>
          <div class="bg-light p-3 rounded-3 text-center mb-4 border">
            <p class="card-text text-secondary mb-0 fw-bold"> {{ formatDate(match.date) }}</p>
          </div>
          
          <div class="mt-auto">
            <NuxtLink :to="`/match/${match.id}`" class="btn btn-primary btn-lg w-100 fw-bold shadow-sm rounded-pill d-flex align-items-center justify-content-center gap-2">
               Comprar Entradas
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  matches: {
    type: Array,
    required: true
  }
});

const formatDate = (dateString) => {
  const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
</script>

<style scoped>
.card:hover {
  transform: translateY(-5px);
}
</style>
