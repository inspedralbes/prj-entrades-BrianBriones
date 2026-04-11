<template>
  <div class="admin-layout min-vh-100 d-flex overflow-hidden">
    
    <!-- Sidebar -->
    <aside class="admin-sidebar d-flex flex-column flex-shrink-0">
      
      <!-- Logo / Brand -->
      <div class="sidebar-brand mb-5 px-4 pt-4 border-bottom border-secondary border-opacity-25 pb-4">
        <h2 class="text-white fw-bold mb-0 fs-5">FastGoal Admin</h2>
        <div class="text-neon" style="font-size: 0.65rem; letter-spacing: 1px;">PANELL DE CONTROL</div>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav flex-grow-1 px-3 d-flex flex-column gap-2">
        
        <a href="#" class="nav-item" :class="{ active: activeTab === 'gestio' }" @click.prevent="activeTab = 'gestio'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Gestió d'esdeveniments
        </a>
        
        <a href="#" class="nav-item" :class="{ active: activeTab === 'realtime' }" @click.prevent="activeTab = 'realtime'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Panell en temps real
        </a>
        
        <a href="#" class="nav-item" :class="{ active: activeTab === 'informes' }" @click.prevent="activeTab = 'informes'">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          Informes
        </a>
      </nav>

      <!-- Bottom Actions -->
      <div class="sidebar-bottom p-4">
         <div class="d-flex flex-column gap-3">
          <NuxtLink to="/" class="nav-item border-0 p-0 fs-6 text-muted-custom bg-transparent mt-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Tornar a la botiga
          </NuxtLink>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main flex-grow-1 p-4 p-md-5 overflow-auto">
      
      <!-- 3.2.1 GESTIÓ DE L'ESDEVENIMENT -->
      <div v-if="activeTab === 'gestio'" class="fade-in">
        <div class="mb-5 d-flex justify-content-between align-items-end">
          <div>
            <h1 class="text-white fw-bold mb-1 fs-3">Gestió de l'Esdeveniment</h1>
            <p class="text-muted-custom m-0" style="font-size: 0.95rem;">Crear i editar partits, tipus d'entrades i aforament.</p>
          </div>
          <button class="btn btn-primary fw-bold text-dark px-4" @click="isPanelOpen = true">
             + Nou Esdeveniment
          </button>
        </div>

        <div class="card card-dark border-0 rounded-4 p-4 shadow-lg">
          <table class="table table-borderless text-white mb-0 align-middle">
            <thead>
              <tr class="text-muted-custom border-bottom border-secondary border-opacity-25" style="font-size: 0.75rem; letter-spacing: 1px;">
                <th class="pb-3 fw-bold">ESDEVENIMENT</th>
                <th class="pb-3 fw-bold">AFORAMENT</th>
                <th class="pb-3 fw-bold">CATEGORIES</th>
                <th class="pb-3 fw-bold text-end">ACCIONS</th>
              </tr>
            </thead>
            <tbody>
              <!-- Match MOCK -->
              <tr v-for="match in matches" :key="match.id" class="border-bottom border-secondary border-opacity-10">
                <td class="py-3">
                  <div class="fw-bold fs-6">{{ match.home_team }} vs {{ match.away_team }}</div>
                  <div class="text-muted-custom small">{{ match.stadium }} - {{ formatDate(match.date) }}</div>
                </td>
                <td class="py-3">Global</td>
                <td class="py-3">General</td>
                <td class="py-3 text-end">
                  <button class="btn btn-sm btn-outline-neon px-3 rounded-pill" @click="isPanelOpen = true">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 3.2.2 PANELL EN TEMPS REAL -->
      <div v-if="activeTab === 'realtime'" class="fade-in">
        <div class="mb-5">
          <h1 class="text-white fw-bold mb-1 fs-3">Panell en Temps Real</h1>
          <p class="text-muted-custom m-0" style="font-size: 0.95rem;">Monitorització del trànsit i vendes en directe de l'esdeveniment actual.</p>
        </div>

        <div class="row g-4 mb-4">
          <div class="col-md-3">
            <div class="card card-dark border-0 rounded-4 p-4 shadow-sm text-center h-100 border-top border-warning border-3">
              <div class="text-warning fw-bold mb-2">Usuaris Connectats</div>
              <div class="fs-1 fw-bold text-white lh-1">{{ stats.sockets_connected || 1 }}</div>
              <div class="text-muted-custom small mt-2">Navegant per la web</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card card-dark border-0 rounded-4 p-4 shadow-sm text-center h-100 border-top border-info border-3">
              <div class="text-info fw-bold mb-2">Reserves Actives (Cua)</div>
              <div class="fs-1 fw-bold text-white lh-1">{{ stats.active_reserves_in_queue || 0 }}</div>
              <div class="text-muted-custom small mt-2">Pagaments en procés</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card card-dark border-0 rounded-4 p-4 shadow-sm text-center h-100 border-top border-success border-3">
              <div class="text-success fw-bold mb-2">Compres Confirmades</div>
              <div class="fs-1 fw-bold text-white lh-1">{{ stats.confirmed_purchases }}</div>
              <div class="text-muted-custom small mt-2">Tickets validats</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="card card-dark border-0 rounded-4 p-4 shadow-sm text-center h-100">
              <div class="text-neon fw-bold mb-2">Seients (D / R / V)</div>
              <div class="fs-4 fw-bold text-white lh-1 mt-2">
                 {{ stats.available_seats }} / {{ stats.active_reserves_in_queue }} / {{ stats.sold_seats }}
              </div>
              <div class="text-muted-custom small mt-2">Disp / Reserv / Venuts</div>
            </div>
          </div>
        </div>

        <!-- Fake Live log for professional look -->
        <div class="card card-dark border-0 rounded-4 p-4">
          <h5 class="text-white mb-3 fw-bold">Activitat d'entrades en directe</h5>
          <div class="d-flex flex-column gap-2 opacity-75" style="font-family: monospace; font-size: 0.85rem;">
             <div v-for="(log, idx) in activityLogs" :key="idx" :class="log.color">[{{ log.tag }}] {{ log.text }}</div>
          </div>
        </div>
      </div>

      <!-- 3.2.3 INFORMES -->
      <div v-if="activeTab === 'informes'" class="fade-in">
        <div class="mb-5">
          <h1 class="text-white fw-bold mb-1 fs-3">Informes i Vendes</h1>
          <p class="text-muted-custom m-0" style="font-size: 0.95rem;">Resum comptable, ocupació i evolució temporal.</p>
        </div>

        <div class="row g-4 mb-4">
          <!-- Recaptació Total -->
          <div class="col-md-6">
            <div class="card card-dark border-0 rounded-4 p-4 d-flex flex-row justify-content-between align-items-center h-100 bg-gradient-brand">
              <div>
                <div class="text-white text-opacity-75 fw-bold mb-1">Recaptació Total</div>
                <div class="text-white fw-bold display-5">{{ Number(stats.total_revenue).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}</div>
              </div>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="text-white opacity-50" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
          </div>
          <!-- Ocupació -->
          <div class="col-md-6">
            <div class="card card-dark border-0 rounded-4 p-4 h-100">
               <div class="text-muted-custom fw-bold mb-3">Percentatge d'Ocupació (Global)</div>
               <div class="d-flex align-items-center gap-4">
                  <div class="fs-1 text-white fw-bold">{{ stats.occupancy_percentage }}%</div>
                  <div class="flex-grow-1" style="height: 12px; background-color: rgba(255,255,255,0.1); border-radius: 6px; overflow: hidden;">
                     <div class="h-100" :style="{ width: stats.occupancy_percentage + '%', backgroundColor: 'var(--primary-neon)' }"></div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- Recaptació per tipus -->
          <div class="col-md-5">
            <div class="card card-dark border-0 rounded-4 p-4 h-100">
              <h5 class="text-white fw-bold mb-4">Recaptació per Categoria</h5>
              <div class="d-flex flex-column gap-3">
                 <div v-for="(cat, ic) in stats.revenue_by_category" :key="ic" class="d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25 pb-2">
                    <div class="text-muted-custom">{{ cat.zone }}</div>
                    <div class="text-white fw-bold">{{ Number(cat.total).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}</div>
                 </div>
                 <div v-if="!stats.revenue_by_category || stats.revenue_by_category.length === 0" class="text-muted-custom small">
                    Encara no hi ha dades de recaptació.
                 </div>
              </div>
            </div>
          </div>
          <!-- Evolució Temporal MOCK -->
          <div class="col-md-7">
             <div class="card card-dark border-0 rounded-4 p-4 h-100">
               <h5 class="text-white fw-bold mb-4">Evolució temporal de vendes</h5>
               <div class="flex-grow-1 bg-dark bg-opacity-50 rounded-3 d-flex align-items-end p-3 gap-2" style="min-height: 200px; border: 1px dashed rgba(255,255,255,0.1);">
                  <!-- Fake chart bars -->
                  <div title="Dilluns" style="flex:1; background-color: var(--primary-neon); height: 20%; border-radius: 4px 4px 0 0; opacity: 0.6"></div>
                  <div title="Dimarts" style="flex:1; background-color: var(--primary-neon); height: 40%; border-radius: 4px 4px 0 0; opacity: 0.7"></div>
                  <div title="Dimecres" style="flex:1; background-color: var(--primary-neon); height: 35%; border-radius: 4px 4px 0 0; opacity: 0.7"></div>
                  <div title="Dijous" style="flex:1; background-color: var(--primary-neon); height: 60%; border-radius: 4px 4px 0 0; opacity: 0.8"></div>
                  <div title="Divendres" style="flex:1; background-color: var(--primary-neon); height: 85%; border-radius: 4px 4px 0 0; opacity: 0.9"></div>
                  <div title="Avui" style="flex:1; background-color: var(--primary-neon); height: 100%; border-radius: 4px 4px 0 0; box-shadow: 0 0 15px rgba(44,235,112,0.4)"></div>
               </div>
               <div class="d-flex justify-content-between mt-2 text-muted-custom small">
                  <span>Fa 6 dies</span>
                  <span>Avui</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Overlay Backdrop -->
    <div v-if="isPanelOpen" class="slide-backdrop" @click="isPanelOpen = false"></div>

    <!-- Right Slide Panel: Crear / Editar Esdeveniment -->
    <aside class="slide-panel d-flex flex-column" :class="{ 'is-open': isPanelOpen }">
      <div class="p-4 d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25">
        <h2 class="text-white fw-bold fs-4 mb-0">Crear Esdeveniment</h2>
        <button class="btn btn-link text-muted-custom p-0" @click="isPanelOpen = false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div class="p-4 pt-4 flex-grow-1 overflow-auto bg-dark">
        <!-- 3.2.1 Data fields -->
        <div class="mb-4">
          <label class="form-label text-neon" style="font-size: 0.75rem; letter-spacing: 1px;">INFORMACIÓ</label>
          <input type="text" v-model="formData.name" class="form-control form-control-dark custom-input mb-3" placeholder="Nom de l'esdeveniment (ex: Final Lliga)">
          <div class="row g-2">
             <div class="col-6"><input type="date" v-model="formData.date" class="form-control form-control-dark custom-input"></div>
             <div class="col-6"><input type="time" v-model="formData.time" class="form-control form-control-dark custom-input"></div>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label text-neon" style="font-size: 0.75rem; letter-spacing: 1px;">AFORAMENT</label>
          <input type="number" v-model="formData.capacity" class="form-control form-control-dark custom-input" placeholder="Aforament Total (ex: 50000)">
        </div>
        
        <div class="mb-4">
          <label class="form-label text-neon" style="font-size: 0.75rem; letter-spacing: 1px;">PLÀNOL DE SEIENTS / ZONES</label>
          <select class="form-select form-control-dark custom-input text-white">
            <option>Plantilla Estadi Standard (4 Zones)</option>
            <option>Plantilla Estadi Circular (8 Zones)</option>
            <option>Sense seients (General Entrada Lliure)</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label text-neon" style="font-size: 0.75rem; letter-spacing: 1px;">CATEGORIES I PREUS</label>
          <div class="card card-dark border-0 p-3 d-flex flex-column gap-2 mt-2">
             <div v-for="(cat, k) in formData.categories" :key="k" class="d-flex gap-2">
               <input type="text" v-model="cat.name" class="form-control form-control-dark custom-input" placeholder="Nom">
               <input type="number" v-model="cat.price" class="form-control form-control-dark custom-input w-50" placeholder="Preu €">
             </div>
             <button class="btn btn-sm btn-outline-secondary mt-2 border-dashed" @click="formData.categories.push({name:'', price:''})">+ Afegir Categoria</button>
          </div>
        </div>

      </div>

      <div class="p-4 border-top border-secondary border-opacity-25 d-flex gap-3 mt-auto bg-dark">
        <button class="btn border-secondary text-white fw-bold py-2 px-4 shadow-sm" @click="isPanelOpen = false">Cancel·lar</button>
        <button class="btn btn-primary fw-bold py-2 px-4 flex-grow-1 text-dark shadow-sm" @click="submitEvent">Guardar Esdeveniment</button>
      </div>
    </aside>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { api } from '~/services/api';
const token = useCookie('auth_token');

const activeTab = ref('gestio');
const isPanelOpen = ref(false);

const stats = ref({
   total_revenue: 0,
   confirmed_purchases: 0,
   occupancy_percentage: 0,
   sockets_connected: 0,
   active_reserves_in_queue: 0,
   sold_seats: 0,
   available_seats: 0,
   revenue_by_category: [],
   evolution: []
});

const matches = ref([]);
const activityLogs = ref([
   { tag: "SISTEMA", color: "text-muted-custom", text: "Iniciant connexió de dades en temps real..." }
]);

const formData = ref({
   name: '',
   date: '',
   time: '',
   capacity: '',
   categories: [
     { name: 'VIP', price: '120.00' },
     { name: 'Tribuna', price: '80.00' },
     { name: 'General', price: '50.00' }
   ]
});

let intervalId = null;

const loadStats = async () => {
    try {
        if(token.value) {
            const data = await api.getAdminStats(token.value);
            stats.value = data;
        }
    } catch(e) { console.error(e) }
};

const loadMatches = async () => {
    try {
        matches.value = await api.getMatches();
    } catch(e) { console.error(e) }
};

// Fake live activity generation for demo polish
const generateFakeActivity = () => {
   const events = [
      { t: "CONFIRMAT", c: "text-success", m: "Usuari ha pagat 2x entrades (VIP)" },
      { t: "RESERVA", c: "text-warning", m: "Usuari ha iniciat procés per entrades (Lateral)" },
      { t: "EXPIRAT", c: "text-danger", m: "Reserva temporal alliberada." },
      { t: "CONNEXIÓ", c: "text-info", m: "Nous usuaris a la cua virtual." }
   ];
   const ev = events[Math.floor(Math.random() * events.length)];
   activityLogs.value.unshift({ tag: ev.t, color: ev.c, text: ev.m });
   if (activityLogs.value.length > 5) activityLogs.value.pop();
};

onMounted(() => {
    loadStats();
    loadMatches();
    intervalId = setInterval(() => {
        loadStats();
        if(Math.random() > 0.5) generateFakeActivity();
    }, 4000);
});

onUnmounted(() => {
    if(intervalId) clearInterval(intervalId);
});

const submitEvent = async () => {
    try {
        if(!formData.value.name || !formData.value.date || !formData.value.capacity) {
            alert('Has d\'omplir els camps obligatoris');
            return;
        }
        await api.createMatch(formData.value, token.value);
        isPanelOpen.value = false;
        alert('Esdeveniment creat correctament!');
        formData.value.name = '';
        formData.value.capacity = '';
        loadMatches();
    } catch(e) {
        alert('Error: ' + e.message);
    }
}

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.admin-layout {
  background-color: var(--bg-color); 
  font-family: var(--font-family);
}

.admin-sidebar {
  width: 270px;
  background-color: rgba(0,0,0,0.3); 
  border-right: 1px solid rgba(255,255,255,0.05);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  text-decoration: none;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background-color: rgba(255,255,255,0.03);
  color: var(--text-main);
}

.nav-item.active {
  background-color: rgba(44, 235, 112, 0.05); 
  color: var(--text-main);
  border-left: 3px solid var(--primary-neon);
  font-weight: 600;
}

.nav-item.active svg {
  color: var(--primary-neon);
}

.card-dark {
  background-color: var(--card-bg); 
}

.bg-gradient-brand {
  background: linear-gradient(135deg, rgba(44,235,112,0.1) 0%, rgba(11,17,33,1) 100%);
  border: 1px solid rgba(44,235,112,0.2) !important;
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide Panel */
.slide-panel {
  position: fixed;
  top: 0;
  right: -450px;
  width: 450px;
  height: 100vh;
  background-color: #0b1121; 
  box-shadow: -10px 0 30px rgba(0,0,0,0.5);
  z-index: 1050;
  transition: right 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border-left: 1px solid rgba(255,255,255,0.05);
}

.slide-panel.is-open {
  right: 0;
}

.slide-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  backdrop-filter: blur(2px);
  z-index: 1040;
}

.custom-input {
  background-color: #030712 !important; 
  border: 1px solid rgba(255,255,255,0.1) !important;
  color: white !important;
  padding: 10px 14px;
}
.custom-input:focus {
  border-color: var(--primary-neon) !important;
  box-shadow: 0 0 0 0.1rem rgba(44, 235, 112, 0.25);
}
.border-dashed {
  border: 1px dashed rgba(255,255,255,0.3) !important;
}
</style>
