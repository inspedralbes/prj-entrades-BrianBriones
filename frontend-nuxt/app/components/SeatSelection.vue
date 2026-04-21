<template>
  <div class="seat-selection-container p-4">
    <!-- Match Info Header -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
      <div>
        <div class="text-neon fw-bold mb-1" style="font-size: 0.75rem; letter-spacing: 1.5px;">LALIGA EA SPORTS</div>
        <h1 class="text-main fw-bold mb-2 match-title" style="letter-spacing: -1px;">
           {{ match?.home_team || 'Partit' }} <span class="text-muted-custom fw-normal fs-3 px-1">VS</span> {{ match?.away_team || '' }}
        </h1>
        <div class="d-flex flex-wrap gap-3 text-muted-custom mt-2" style="font-size: 0.9rem;">
          <div class="d-flex align-items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            {{ formatDate(match?.date) }}
          </div>
          <div class="d-flex align-items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {{ match?.stadium || 'Estadi Principal' }}
          </div>
        </div>
      </div>
      
      <!-- Legend -->
      <div class="d-flex gap-3 align-items-center card-dark px-3 py-2 rounded-pill mt-3 mt-md-0">
        <div class="legend-item"><span class="legend-dot free"></span> Lliure</div>
        <div class="legend-item"><span class="legend-dot occupied"></span> Ocupat</div>
        <div class="legend-item"><span class="legend-dot locked"></span> Reservat per un altre</div>
        <div class="legend-item"><span class="legend-dot selected"></span> Seleccionat</div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <!-- Left Column: Stadium Map -->
      <div class="col-xl-8">
        <div class="card h-100 border-0 rounded-4 p-0 overflow-hidden position-relative stadium-container card-dark shadow-lg" style="min-height: 550px;">
          
          <!-- Football Pitch SVG/Background -->
          <div class="pitch-bg position-absolute w-100 h-100 p-5 d-flex align-items-center justify-content-center">
            <div class="pitch-field position-relative border border-success rounded-1 w-100 h-100 opacity-25">
               <!-- Center circle & line -->
               <div class="pitch-center-line position-absolute top-0 bottom-0 start-50 translate-middle-x"></div>
               <div class="pitch-center-circle position-absolute top-50 start-50 translate-middle rounded-circle"></div>
               <!-- Penalty areas -->
               <div class="pitch-penalty-left position-absolute top-50 start-0 translate-middle-y"></div>
               <div class="pitch-penalty-right position-absolute top-50 end-0 translate-middle-y"></div>
            </div>
          </div>

          <!-- Seating Blocks Container -->
          <div class="seating-blocks-wrapper position-absolute w-100 h-100 top-0 start-0">
             
            <!-- Top Block (Lateral) -->
            <div class="seat-block block-top position-absolute start-50 translate-middle-x">
              <div class="block-label mb-2 text-center text-muted-custom fw-bold">LATERAL</div>
              <div class="seat-grid horizontal p-2 rounded-3 bg-opacity-10 bg-black">
                <div v-for="n in 40" :key="`lat-${n}`" 
                     class="seat-dot" 
                     :class="seatStates.lateral[n - 1] === 1 ? 'occupied' : seatStates.lateral[n - 1] === 2 ? 'selected' : seatStates.lateral[n - 1] === 3 ? 'locked' : 'free'" 
                     @click="toggleSeat({id: `lat-${n}`, zone: 'LATERAL', sector: 204, row: Math.ceil(n/10), num: n, price: 125}, 'lateral', n)"></div>
              </div>
            </div>
            
            <!-- Bottom Block (Tribuna) -->
            <div class="seat-block block-bottom position-absolute start-50 translate-middle-x">
              <div class="seat-grid horizontal p-2 rounded-3 bg-opacity-10 bg-black">
                <div v-for="n in 40" :key="`trib-${n}`" 
                     class="seat-dot" 
                     :class="seatStates.tribuna[n - 1] === 1 ? 'occupied' : seatStates.tribuna[n - 1] === 2 ? 'selected' : seatStates.tribuna[n - 1] === 3 ? 'locked' : 'free'" 
                     @click="toggleSeat({id: `trib-${n}`, zone: 'TRIBUNA', sector: 110, row: Math.ceil(n/10), num: n, price: 150}, 'tribuna', n)"></div>
              </div>
              <div class="block-label mt-2 text-center text-muted-custom fw-bold">TRIBUNA</div>
            </div>

            <!-- Left Block (Gol Nord) -->
            <div class="seat-block block-left position-absolute top-50 translate-middle-y">
              <div class="seat-grid vertical p-2 rounded-3 bg-opacity-10 bg-black">
                <div v-for="n in 24" :key="`goln-${n}`" 
                     class="seat-dot" 
                     :class="seatStates.golNord[n - 1] === 1 ? 'occupied' : seatStates.golNord[n - 1] === 2 ? 'selected' : seatStates.golNord[n - 1] === 3 ? 'locked' : 'free'" 
                     @click="toggleSeat({id: `goln-${n}`, zone: 'GOL NORD', sector: 102, row: Math.ceil(n/4), num: n, price: 85}, 'golNord', n)"></div>
              </div>
            </div>

            <!-- Right Block (Gol Sud) -->
            <div class="seat-block block-right position-absolute top-50 translate-middle-y">
              <div class="seat-grid vertical p-2 rounded-3 bg-opacity-10 bg-black">
                <div v-for="n in 24" :key="`gols-${n}`" 
                     class="seat-dot" 
                     :class="seatStates.golSud[n - 1] === 1 ? 'occupied' : seatStates.golSud[n - 1] === 2 ? 'selected' : seatStates.golSud[n - 1] === 3 ? 'locked' : 'free'" 
                     @click="toggleSeat({id: `gols-${n}`, zone: 'GOL SUD', sector: 112, row: Math.ceil(n/4), num: n, price: 85}, 'golSud', n)"></div>
              </div>
            </div>

          </div>

          <!-- Zoom Controls -->
          <div class="zoom-controls position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2 p-1 rounded-3 card-dark shadow-sm">
             <button class="btn btn-sm btn-dark bg-transparent border-0 zoom-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg></button>
             <button class="btn btn-sm btn-dark bg-transparent border-0 zoom-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg></button>
             <button class="btn btn-sm btn-dark bg-transparent border-0 zoom-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg></button>
          </div>
          
        </div>
      </div>

      <!-- Right Column: Summary Sidebar -->
      <div class="col-xl-4 d-flex flex-column gap-3">
        <!-- Summary Card -->
        <div class="card flex-grow-1 border-0 rounded-4 p-4 shadow-lg summary-card card-dark">
          <h3 class="text-main fw-bold mb-4" style="font-size: 1.3rem;">Resum de la selecció</h3>
          
          <!-- Selected Seats List -->
          <div class="selected-seats-container d-flex flex-column gap-3 mb-4 flex-grow-1 overflow-auto" style="min-height: 200px; max-height: 300px;">
            <transition-group name="list">
              <div v-for="seat in selectedSeatsList" :key="seat.id" class="selected-seat-card d-flex justify-content-between p-3 rounded-3 position-relative mb-2">
                 <!-- Green Side Indicator -->
                 <div class="position-absolute top-0 start-0 h-100 rounded-start-3" style="width: 4px; background-color: var(--primary-neon);"></div>
                 
                 <div class="ps-2">
                    <div class="text-neon fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 1px;">{{ seat.zone }} - SECTOR {{ seat.sector }}</div>
                    <div class="text-main fw-medium" style="font-size: 0.95rem;">Fila {{ seat.row }}, Seient {{ seat.num }}</div>
                 </div>
                 <div class="text-end d-flex flex-column justify-content-between align-items-end">
                    <div class="text-main fw-bold fs-5 mb-1" style="line-height: 1;">{{ seat.price }} €</div>
                    <button class="btn btn-link p-0 text-danger text-decoration-none fw-bold hover-opacity" style="font-size: 0.65rem; letter-spacing: 0.5px;" @click="removeSeatFromList(seat)">ELIMINAR</button>
                 </div>
              </div>
            </transition-group>
            
            <div v-if="selectedSeatsList.length === 0" class="text-muted-custom text-center py-5 d-flex flex-column align-items-center justify-content-center h-100">
               <svg class="mb-3 opacity-50" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
               Cap seient seleccionat
            </div>
          </div>

          <hr class="border-secondary opacity-25 my-4">

          <!-- Pricing details -->
          <div class="d-flex justify-content-between mb-2 text-muted-custom" style="font-size: 0.95rem;">
             <span>Subtotal ({{ selectedSeatsList.length }} entrades)</span>
             <span>{{ subtotal }} €</span>
          </div>
          <div class="d-flex justify-content-between mb-4 text-muted-custom" style="font-size: 0.95rem;">
             <span>Despeses de gestió</span>
             <span>{{ despesesFormated }} €</span>
          </div>

          <div class="d-flex justify-content-between align-items-end mb-4 pt-2">
             <span class="text-main fw-bold fs-5 mb-1">Total</span>
             <span class="text-neon fw-bold d-flex align-items-start" style="font-size: 2.2rem; line-height: 1;">
               {{ totalFormated }}<span class="fs-4 ms-1">€</span>
             </span>
          </div>

          <button class="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-none text-dark" style="font-size: 1.05rem; letter-spacing: 0.5px;" :disabled="selectedSeatsList.length === 0" @click="emitConfirm">
             CONFIRMAR I PAGAR
          </button>
        </div>

        <!-- Security Badge Card -->
        <div class="card border-0 rounded-4 p-3 d-flex flex-row align-items-center gap-3 shadow-sm card-dark">
           <div class="flex-shrink-0 d-flex align-items-center justify-content-center rounded-3 bg-opacity-25" style="width: 48px; height: 48px; background-color: rgba(255, 193, 7, 0.1);">
             <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="#ffc107" stroke="#ffc107" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               <path d="M9 12l2 2 4-4" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </div>
           <div>
             <div class="text-main fw-bold mb-1" style="font-size: 0.9rem;">Pagament 100% Segur</div>
             <div class="text-muted-custom" style="font-size: 0.8rem; line-height: 1.3;">
               Entrades oficials garantides per FastGoal Tickets.
             </div>
           </div>
        </div>
      </div>
    </div>
    <!-- Custom Alert Warning -->
    <transition name="fade">
      <div v-if="alertMessage" class="alert alert-warning position-fixed shadow-lg border border-warning d-flex align-items-center gap-3" style="top: 20px; left: 50%; transform: translateX(-50%); z-index: 1050; border-radius: 12px; font-weight: bold;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        {{ alertMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { socket } from '~/services/socket';

const props = defineProps({
  match: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['confirm']);

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('ca-ES', options);
};

// Seat states: 0 = libre, 1 = ocupado permanentemente, 2 = seleccionado por mi, 3 = bloqueado por otro en tiempo real
const seatStates = ref({
  lateral: Array(40).fill(0),
  tribuna: Array(40).fill(0),
  golNord: Array(24).fill(0),
  golSud: Array(24).fill(0),
});

const selectedSeatsList = ref([]);

const alertMessage = ref('');
let alertTimeout = null;
const showAlert = (msg) => {
  alertMessage.value = msg;
  if (alertTimeout) clearTimeout(alertTimeout);
  alertTimeout = setTimeout(() => { alertMessage.value = ''; }, 3500);
};

const mapIdToZone = {
  'lat': 'lateral',
  'trib': 'tribuna',
  'goln': 'golNord',
  'gols': 'golSud'
};

const setSeatStateById = (id, state) => {
  const parts = id.split('-');
  const zone = mapIdToZone[parts[0]];
  const index = parseInt(parts[1], 10);
  console.log(`[setSeatStateById] Actualizando ${zone} en índice ${index} a estado ${state}`);
  
  if (zone && index) {
     const newArr = [...seatStates.value[zone]];
     newArr[index - 1] = state;
     
     // 100% Guaranteed Hack para Vue Reactivity
     seatStates.value = {
        ...seatStates.value,
        [zone]: newArr
     };
     
     // Si cambiaron el estado a 3 y lo teniamos seleccionado, removerlo!
     if (state === 3) {
        selectedSeatsList.value = selectedSeatsList.value.filter(s => s.id !== id);
     }
  }
};

onMounted(() => {
  if (props.match) {
    socket.emit('getLocks', props.match.id);
  }

  socket.on('initialLocks', (locks) => {
    for (const seatId in locks) {
      if (locks[seatId] !== socket.id) {
        setSeatStateById(seatId, 3);
      }
    }
  });

  socket.on('initialOccupied', (seatsList) => {
    seatsList.forEach(seatId => setSeatStateById(seatId, 1));
  });

  socket.on('seatsOccupied', (seatsList) => {
    seatsList.forEach(seatId => setSeatStateById(seatId, 1));
  });

  socket.on('seatLocked', ({ seatId, socketId }) => {
    console.log(`[Socket] Received seatLocked! seatId: ${seatId}, socketId: ${socketId}, My socket: ${socket.id}`);
    if (socketId !== socket.id) {
       setSeatStateById(seatId, 3);
    }
  });

  socket.on('globalSeatLocked', ({ matchId, seatId, socketId }) => {
    console.log(`[Socket] globalSeatLocked: matchId ${matchId}, seatId ${seatId}`);
    if (props.match && props.match.id == matchId && socketId !== socket.id) {
       setSeatStateById(seatId, 3);
    }
  });

  socket.on('globalSeatUnlocked', ({ matchId, seatId }) => {
    if (props.match && props.match.id == matchId) {
       setSeatStateById(seatId, 0);
    }
  });

  socket.on('seatLockFailed', ({ seatId }) => {
     setSeatStateById(seatId, 3);
     showAlert('Aquesta entrada acaba de ser reservada per un altre usuari!');
  });
});

onUnmounted(() => {
  socket.off('initialLocks');
  socket.off('seatLocked');
  socket.off('seatUnlocked');
  socket.off('globalSeatLocked');
  socket.off('globalSeatUnlocked');
  socket.off('seatLockFailed');
  socket.off('initialOccupied');
  socket.off('seatsOccupied');
});

// getSeatState can be safely removed or kept empty since it's now inline

const toggleSeat = (seatData, zone, index) => {
  const currentState = seatStates.value[zone][index - 1];
  
  if (currentState === 1) return; // ocupado fijo
  
  if (currentState === 3) {
    showAlert('Aquesta entrada acaba de ser reservada per un altre usuari que està pagant!');
    return;
  }

  if (currentState === 2) {
    const newArr = [...seatStates.value[zone]];
    newArr[index - 1] = 0;
    seatStates.value[zone] = newArr;
    selectedSeatsList.value = selectedSeatsList.value.filter(s => s.id !== seatData.id);
    if (props.match) socket.emit('unlockSeat', { matchId: props.match.id, seatId: seatData.id });
  } else {
    // Check limit
    if (selectedSeatsList.value.length >= 8) {
       showAlert('Com a màxim es poden seleccionar 8 entrades.');
       return;
    }
    
    const newArr = [...seatStates.value[zone]];
    newArr[index - 1] = 2;
    seatStates.value[zone] = newArr;
    selectedSeatsList.value.push({ ...seatData, list: zone, index });
    if (props.match) socket.emit('lockSeat', { matchId: props.match.id, seatId: seatData.id });
  }
};

const removeSeatFromList = (seat) => {
  const newArr = [...seatStates.value[seat.list]];
  newArr[seat.index - 1] = 0;
  seatStates.value[seat.list] = newArr;
  selectedSeatsList.value = selectedSeatsList.value.filter(s => s.id !== seat.id);
  if (props.match) socket.emit('unlockSeat', { matchId: props.match.id, seatId: seat.id });
};

// Computed totals
const subtotal = computed(() => {
  return selectedSeatsList.value.reduce((sum, seat) => sum + seat.price, 0);
});

const DESPESES_PER_TICKET = 2.25;

const despeses = computed(() => {
  return selectedSeatsList.value.length > 0 ? (selectedSeatsList.value.length * DESPESES_PER_TICKET) : 0;
});

const total = computed(() => {
  return subtotal.value + despeses.value;
});

// Formateadores para 2 decimales y coma
const despesesFormated = computed(() => {
  return despeses.value.toFixed(2).replace('.', ',');
});

const totalFormated = computed(() => {
  return total.value.toFixed(2).replace('.', ',');
});

const emitConfirm = () => {
  if (selectedSeatsList.value.length > 0) {
    emit('confirm', selectedSeatsList.value);
  }
};
</script>

<style scoped>
/* Leyenda / Legend */
.legend-item {
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
.legend-dot.free { background-color: var(--primary-neon); }
.legend-dot.occupied { background-color: var(--card-bg-light); border: 1px solid rgba(128,128,128,0.3); cursor: not-allowed; }
.legend-dot.locked { background-color: #ff8c00 !important; }
.legend-dot.selected { background-color: #fff; box-shadow: 0 0 10px rgba(255,255,255,0.5); }

/* Pitch Background CSS */
.pitch-bg {
  background: radial-gradient(circle at center, #0a1711 0%, #050a08 100%);
  pointer-events: none;
}
.pitch-field {
  max-width: 90%;
  max-height: 55%;
}
.pitch-center-line { width: 1px; background-color: var(--bs-success); opacity: 0.8; }
.pitch-center-circle { width: 25%; aspect-ratio: 1; border: 1px solid var(--bs-success); opacity: 0.8; }
.pitch-penalty-left { width: 12%; height: 40%; border: 1px solid var(--bs-success); border-left: none; opacity: 0.8; }
.pitch-penalty-right { width: 12%; height: 40%; border: 1px solid var(--bs-success); border-right: none; opacity: 0.8; }

/* Blocks layout */
.seat-block {
  z-index: 2;
}
.block-top { top: 8%; }
.block-bottom { bottom: 8%; }
.block-left { left: 5%; }
.block-right { right: 5%; }
.block-label { font-size: 0.65rem; letter-spacing: 4px; opacity: 0.7; }

/* Grid of Dots */
.seat-grid {
  display: grid;
  gap: 6px;
  background-color: var(--card-bg-light);
  border: 1px solid rgba(255,255,255,0.05);
}
.seat-grid.horizontal {
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(4, 1fr);
}
.seat-grid.vertical {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

/* Individual Seat */
.seat-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}
.seat-dot:hover:not(.occupied) {
  transform: scale(1.3);
  z-index: 10;
}
.seat-dot.free { background-color: var(--primary-neon); }
.seat-dot.occupied { background-color: rgba(128,128,128,0.2); cursor: not-allowed; }
.seat-dot.locked { background-color: #ff8c00 !important; opacity: 1 !important; cursor: not-allowed !important; }
.seat-dot.selected { 
  background-color: #fff; 
  box-shadow: 0 0 10px rgba(255,255,255,0.6); 
  transform: scale(1.1);
}

/* Right Sidebar Cards */
.selected-seat-card {
  background-color: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
}

.hover-opacity { transition: opacity 0.2s; opacity: 0.8; }
.hover-opacity:hover { opacity: 1; text-decoration: underline !important; }

/* Animation para la lista lateral */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px) !important;
}

/* Scrollbar customization para la lista de asientos */
.selected-seats-container::-webkit-scrollbar {
  width: 6px;
}
.selected-seats-container::-webkit-scrollbar-track {
  background: transparent;
}
.selected-seats-container::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
}
.selected-seats-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255,255,255,0.2);
}

.zoom-btn {
  color: var(--text-main);
  opacity: 0.7;
}
.zoom-btn:hover {
  background-color: rgba(255,255,255,0.1) !important;
  opacity: 1;
}
</style>
