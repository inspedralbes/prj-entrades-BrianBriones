<template>
  <div class="match-details-container py-5">
    <div v-if="matchStore.loading" class="text-center py-5">
      <div class="spinner-border text-neon" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
    
    <div v-else-if="matchStore.error" class="alert alert-danger mx-auto" style="max-width: 800px;">
      {{ matchStore.error }}
    </div>
    
    <div v-else-if="matchStore.currentMatch" class="container" style="max-width: 1140px;">
      
      <!-- Top Teams Section -->
      <div class="row mb-5 align-items-center justify-content-center text-center">
        <!-- Home Team -->
        <div class="col-md-4 d-flex flex-column align-items-center">
          <div class="team-logo-container mb-3 position-relative">
            <div class="logo-backdrop"></div>
            <img src="/img/home_player.png" alt="Home Team" class="team-player-img" />
          </div>
          <h1 class="team-name text-main fw-bold mb-0 text-uppercase">{{ matchStore.currentMatch.home_team }}</h1>
        </div>
        
        <!-- VS -->
        <div class="col-md-4 d-flex flex-column align-items-center my-4 my-md-0">
          <h1 class="vs-text fw-bold fst-italic display-2 m-0 text-neon" style="letter-spacing: -2px;">VS</h1>
          <div class="badge rounded-pill bg-dark-subtle mt-3 px-4 py-2 text-uppercase" style="letter-spacing: 1.5px; font-size: 0.75rem; background-color: #24354b !important;">
            LA LIGA EA SPORTS
          </div>
        </div>
        
        <!-- Away Team -->
        <div class="col-md-4 d-flex flex-column align-items-center">
          <div class="team-logo-container mb-3 position-relative">
            <div class="logo-backdrop"></div>
            <img src="/img/away_player.png" alt="Away Team" class="team-player-img" />
          </div>
          <h1 class="team-name text-main fw-bold mb-0 text-uppercase">{{ matchStore.currentMatch.away_team }}</h1>
        </div>
      </div>

      <!-- Main Layout -->
      <div class="row g-4 mt-2">
        <!-- Left Column -->
        <div class="col-lg-8">
          
          <!-- Info Cards -->
          <div class="row g-3 mb-4">
            <!-- Data -->
            <div class="col-md-4">
              <div class="card bg-dark border-0 rounded-4 p-3 h-100 card-dark-custom">
                <div class="d-flex align-items-center mb-2"> 
                  <span class="text-muted-custom fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">DATA</span>
                </div>
                <h5 class="text-white fw-bold mb-0">{{ formatDate(matchStore.currentMatch.date) }}</h5>
              </div>
            </div>
            <!-- Horari -->
            <div class="col-md-4">
              <div class="card bg-dark border-0 rounded-4 p-3 h-100 card-dark-custom">
                <div class="d-flex align-items-center mb-2">

                  <span class="text-muted-custom fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">HORARI</span>
                </div>
                <h5 class="text-white fw-bold mb-0">{{ formatTime(matchStore.currentMatch.date) }} CET</h5>
              </div>
            </div>
            <!-- Estadi -->
            <div class="col-md-4">
              <div class="card bg-dark border-0 rounded-4 p-3 h-100 card-dark-custom">
                <div class="d-flex align-items-center mb-2">

                  <span class="text-muted-custom fw-bold" style="font-size: 0.75rem; letter-spacing: 1px;">ESTADI</span>
                </div>
                <h5 class="text-white fw-bold mb-0">{{ matchStore.currentMatch.stadium }}</h5>
              </div>
            </div>
          </div>
          
          <!-- Stadium Map Card -->
          <div class="card border-0 rounded-4 overflow-hidden mb-4 stadium-card position-relative card-dark-custom">
            <img src="/img/stadium_map.png" class="stadium-map-img w-100" alt="Stadium Map" style="height: 380px; object-fit: cover;" />
            <div class="stadium-overlay position-absolute bottom-0 start-0 w-100 p-4">
              <h4 class="text-white fw-bold mb-1">Mapa de l'Estadi</h4>

            </div>
          </div>
          
          <!-- About this match -->
          <div class="card border-0 rounded-4 p-4 card-dark-custom mb-4 mb-lg-0">
            <h5 class="text-white fw-bold mb-3">Sobre aquest partit</h5>
            <p class="text-muted-custom mb-0 lh-lg" style="font-size: 0.95rem;">
              Viu la passió d'un dels duels més intensos de La Liga. El {{ matchStore.currentMatch.home_team }} rep a l'{{ matchStore.currentMatch.away_team }} en un enfrontament crucial per a la lluita pel títol. Ambdues plantilles arriben en el seu millor moment, prometent una nit de futbol tàctic, velocitat i emoció sota els focus de l'estadi.
            </p>
          </div>
          
        </div>
        
        <!-- Right Column (Checkout/Pricing panel) -->
        <div class="col-lg-4">
          <div class="card border-0 rounded-4 p-4 sticky-top checkout-panel card-dark-custom" style="top: 2rem;">
            
            <!-- Viewers badge -->
            <div class="d-flex justify-content-center align-items-center rounded-3 py-2 px-3 mb-4 viewers-badge">
              <span class="text-neon fw-bold" style="font-size: 0.85rem;"> {{ viewers }} persones estan mirant aquest partit</span>
            </div>
            
            <p class="text-muted-custom mb-1" style="font-size: 0.85rem;">Preus des de</p>
            <div class="d-flex align-items-end mb-4">
              <h1 class="text-neon fw-bold mb-0 lh-1" style="font-size: 3.5rem;">85€</h1>
              <span class="text-muted-custom ms-2 pb-2" style="font-size: 0.9rem;">/ entrada</span>
            </div>
            
            <!-- Zones List -->
            <div class="zones-list mb-4">
              <div class="d-flex justify-content-between border-bottom pb-3 mb-3" style="border-color: rgba(255,255,255,0.05) !important;">
                <span class="text-muted-custom" style="font-size: 0.9rem;">Zona General</span>
                <span class="text-white fw-bold" style="font-size: 0.9rem;">Des de 85€</span>
              </div>
              <div class="d-flex justify-content-between border-bottom pb-3 mb-3" style="border-color: rgba(255,255,255,0.05) !important;">
                <span class="text-muted-custom" style="font-size: 0.9rem;">Lateral</span>
                <span class="text-white fw-bold" style="font-size: 0.9rem;">Des de 120€</span>
              </div>
              <div class="d-flex justify-content-between pb-2">
                <span class="text-warning" style="font-size: 0.9rem;">Tribuna VIP</span>
                <span class="text-warning fw-bold" style="font-size: 0.9rem;">Des de 450€</span>
              </div>
            </div>
            
            <NuxtLink :to="`/match/${route.params.id}/tickets`" class="btn btn-neon w-100 py-3 rounded-2 fw-bold text-dark mt-2 mb-4 d-flex justify-content-center align-items-center" style="font-size: 1.05rem;"> Seleccionar Seients
            </NuxtLink>
            
            <p class="text-center text-muted-custom mb-0" style="font-size: 0.7rem; line-height: 1.5;">
              Pagament 100% segur. Entrades digitals enviades a l'instant.
            </p>
            
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
const viewers = ref(12);

onMounted(() => {
  matchStore.fetchMatch(route.params.id);

  socket.emit("viewMatch", route.params.id);

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
  if (!dateString) return '';
  const options = { weekday: 'long', day: 'numeric', month: 'short' };
  const str = new Date(dateString).toLocaleDateString('ca-ES', options);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleTimeString('ca-ES', options);
};
</script>

<style scoped>
.match-details-container {
  min-height: 100vh;
  font-family: inherit;
}

.text-neon {
  color: #1ed760 !important;
}

.btn-neon {
  background-color: #1ed760;
  border-color: #1ed760;
  transition: all 0.2s ease;
}

.btn-neon:hover {
  background-color: #1db954;
  border-color: #1db954;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 215, 96, 0.3);
}

.text-muted-custom {
  color: #8b949e !important;
}

.card-dark-custom {
  background-color: #151a23; /* Dark card color */
  box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
}

.vs-text {
  text-shadow: 0 0 15px rgba(30, 215, 96, 0.3);
}

.team-logo-container {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.logo-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(40,50,70,0.8) 0%, rgba(15,20,30,0.95) 100%);
  z-index: -1;
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}

.team-player-img {
  width: 130%;
  height: 130%;
  object-fit: contain;
  border-radius: 0 0 50% 50%;
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
  transform: scale(1.1) translateY(-15px);
}

.team-name {
  font-size: 2rem;
  letter-spacing: -1.5px;
}

.stadium-overlay {
  background: linear-gradient(to top, rgba(13,17,23,1) 0%, rgba(13,17,23,0) 100%);
}

.viewers-badge {
  background-color: rgba(30, 215, 96, 0.1);
  border: 1px solid rgba(30, 215, 96, 0.15);
}

.custom-alert {
  background-color: #3b2a2a; /* Darker red-brown */
  color: #ff6b6b;
}

.custom-alert .fw-bold.text-white {
  color: #fff !important;
}
</style>
