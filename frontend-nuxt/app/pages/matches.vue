<template>
  <div class="container-fluid pb-4">
    
    <!-- Hero Section -->
    <div class="hero-section rounded-4 overflow-hidden mb-5 position-relative shadow-lg border border-secondary" style="height: 350px;">
      <div class="position-absolute w-100 h-100 bg-dark" style="background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.6)), url('https://images.unsplash.com/photo-1518605368461-1e1e38ce8032?q=80&w=2000&auto=format&fit=crop') center/cover;"></div>
      <div class="position-absolute bottom-0 start-0 p-5 w-100">
         <span class="badge bg-neon text-dark mb-2 px-3 py-2 fw-bold text-uppercase" style="letter-spacing: 2px;">Pròxim gran partit</span>
         <h1 class="display-3 fw-bold text-white mb-2" style="font-size: 5rem; letter-spacing: -2px;">EL CLÀSSIC</h1>
         <p class="fs-5 text-light mb-4" style="max-width: 600px;">Viu l'emoció del millor futbol del món sota els focus de l'estadi.</p>
         <button class="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill text-dark shadow">
            Comprar Ara
         </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
       <div class="d-flex gap-2">
         <button class="btn btn-primary rounded-pill px-4 fw-bold shadow-sm">Tots els partits</button>
       </div>
    </div>
    
    <div v-if="matchStore.loading" class="text-center py-5">
      <div class="spinner-grow text-neon" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3 fw-bold text-muted-custom">Obteniendo lista de partidos reales desde TheSportsDB...</p>
    </div>
    
    <div v-else-if="matchStore.error" class="alert alert-danger shadow border-0 rounded-3 p-4 text-center bg-dark text-white border border-danger">
      <h5>Error de sincronización</h5>
      <p class="mb-0">{{ matchStore.error }}</p>
    </div>
    
    <div v-else-if="matchStore.matches.length === 0" class="alert alert-info shadow border-0 rounded-3 p-4 text-center bg-dark text-white border border-info">
      No hi ha partits programats pròximament.
    </div>
    
    <!-- Renderizamos nuestro nuevo componente -->
    <ListaPartidos v-else :matches="matchStore.matches" />
    
    <div class="text-center mt-5 mb-3">
       <button @click="matchStore.fetchMatches()" class="btn btn-outline-secondary rounded-pill px-5 py-3 border-secondary text-white fw-semibold">
           Recarregar partits
       </button>
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
