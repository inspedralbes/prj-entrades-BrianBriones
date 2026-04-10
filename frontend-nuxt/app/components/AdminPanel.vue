<template>
  <div class="admin-layout min-vh-100 d-flex overflow-hidden">
    
    <!-- Sidebar -->
    <aside class="admin-sidebar d-flex flex-column flex-shrink-0">
      
      <!-- Logo / Brand -->
      <div class="sidebar-brand mb-5 px-4 pt-4">
        <h2 class="text-white fw-bold mb-0 fs-5">Gestió FastGoal</h2>
        <div class="text-muted-custom" style="font-size: 0.65rem; letter-spacing: 1px;">PANELL DE CONTROL</div>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav flex-grow-1 px-3 d-flex flex-column gap-2">
        <a href="#" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          Dashboard
        </a>
        <a href="#" class="nav-item active">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Esdeveniments
        </a>
        <a href="#" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Vendes
        </a>
        <a href="#" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Usuaris
        </a>
        <a href="#" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          Configuració
        </a>
      </nav>

      <!-- Bottom Actions -->
      <div class="sidebar-bottom p-4">
        <button class="btn btn-primary w-100 fw-bold d-flex justify-content-center align-items-center gap-2 mb-4 shadow" style="font-size: 0.95rem;" @click="isPanelOpen = true">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
           Nou Event
        </button>
        
         <div class="d-flex flex-column gap-3">
          <a href="#" class="nav-item border-0 p-0 fs-6 text-muted-custom bg-transparent">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            Suport
          </a>
          <a href="#" class="nav-item border-0 p-0 fs-6 text-muted-custom bg-transparent mt-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Sortir
          </a>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="admin-main flex-grow-1 p-4 p-md-5 overflow-auto position-relative">
      
      <!-- Top Title Area -->
      <div class="mb-5">
        <h1 class="text-white fw-bold mb-1 fs-3">Esdeveniments Actius</h1>
        <p class="text-muted-custom m-0" style="font-size: 0.95rem;">Gestió integral de la cartellera de partits i preus.</p>
      </div>

      <!-- KPI Cards -->
      <div class="row g-4 mb-5">
        <!-- KPI 1 -->
        <div class="col-md-4">
           <div class="card card-dark border-0 rounded-4 p-4 shadow-sm h-100">
             <div class="text-muted-custom fw-bold mb-2" style="font-size: 0.65rem; letter-spacing: 1px;">TOTAL PARTITS</div>
             <div class="d-flex align-items-baseline gap-2">
               <div class="text-white fw-bold fs-2 lh-1">{{ kpi.total_events }}</div>
               <div class="text-neon fw-bold" style="font-size: 0.75rem;">+{{ kpi.new_this_month }} aquest mes</div>
             </div>
           </div>
        </div>
        <!-- KPI 2 -->
        <div class="col-md-4">
           <div class="card card-dark border-0 rounded-4 p-4 shadow-sm h-100">
             <div class="text-muted-custom fw-bold mb-2" style="font-size: 0.65rem; letter-spacing: 1px;">VENDES AVUI</div>
             <div class="d-flex align-items-baseline gap-2">
               <div class="text-white fw-bold fs-2 lh-1">{{ kpi.sales_today }}</div>
               <div class="text-neon fw-bold" style="font-size: 0.75rem;">€{{ kpi.sales_value_today }}</div>
             </div>
           </div>
        </div>
        <!-- KPI 3 -->
        <div class="col-md-4">
           <div class="card card-dark border-0 rounded-4 p-4 shadow-sm h-100">
             <div class="text-muted-custom fw-bold mb-2" style="font-size: 0.65rem; letter-spacing: 1px;">AFORAMENT MITJÀ</div>
             <div class="d-flex align-items-baseline gap-2">
               <div class="text-white fw-bold fs-2 lh-1">{{ kpi.avg_attendance }}%</div>
             </div>
           </div>
        </div>
      </div>

      <!-- Main Data Table -->
      <div class="card card-dark border-0 rounded-4 p-4 shadow-lg">
        <h3 class="text-white fw-bold mb-4 fs-6 pt-1 text-uppercase" style="letter-spacing: 1px;">Llista de partits</h3>
        
        <div class="table-responsive">
          <table class="table table-borderless text-white mb-0 admin-table align-middle">
            <thead>
              <tr class="text-muted-custom" style="font-size: 0.7rem; letter-spacing: 1px;">
                <th class="fw-bold pb-4 ps-2">NOM DEL PARTIT</th>
                <th class="fw-bold pb-4">DATA I HORA</th>
                <th class="fw-bold pb-4">AFORAMENT</th>
              </tr>
            </thead>
            <tbody>
              <!-- Lista Vacía Intencional (o genérica por petición) -->
              <tr v-if="events.length === 0">
                <td colspan="3" class="text-center text-muted-custom py-5">
                  <svg class="mb-3 opacity-50" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  <br>
                  No hi ha esdeveniments registrats.
                </td>
              </tr>

              <tr v-for="(event, index) in events" :key="index" class="border-bottom border-secondary border-opacity-10 align-middle">
                <td class="py-3 ps-2">
                  <div class="d-flex align-items-center gap-3">
                    <div class="flex-shrink-0 d-flex align-items-center justify-content-center bg-dark text-white fw-bold rounded-2 border border-secondary" style="width: 40px; height: 40px; font-size: 0.8rem; background-color: rgba(255,255,255,0.05) !important;">
                      {{ event.shortCode }}
                    </div>
                    <div>
                      <div class="fw-bold text-white mb-1" style="font-size: 0.95rem;">{{ event.name }}</div>
                      <div class="text-muted-custom" style="font-size: 0.8rem;">{{ event.subtitle }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 text-muted-custom" style="font-size: 0.85rem;">
                   <div class="text-white mb-1">{{ event.date }}</div>
                   <div>{{ event.time }}</div>
                </td>
                <td class="py-3">
                  <div class="text-white mb-1 fw-bold fs-6">{{ event.attendance }}</div>
                  <!-- Tag Dinámico -->
                  <div :class="['status-badge fw-bold', event.status === 'SENSE ENTRADES' ? 'badge-danger' : 'badge-success']">
                    {{ event.status }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Table Footer -->
        <div class="mt-4 pt-2 text-muted-custom" style="font-size: 0.8rem;">
          Mostrant <strong class="text-white">{{ events.length }}</strong> de {{ kpi.total_events }} esdeveniments
        </div>
      </div>
    </main>

    <!-- Overlay Backdrop -->
    <div v-if="isPanelOpen" class="slide-backdrop" @click="isPanelOpen = false"></div>

    <!-- Right Slide Panel: Nou Esdeveniment -->
    <aside class="slide-panel d-flex flex-column" :class="{ 'is-open': isPanelOpen }">
      <!-- Panel Header -->
      <div class="p-4 d-flex justify-content-between align-items-center">
        <h2 class="text-white fw-bold fs-4 mb-0">Nou Esdeveniment</h2>
        <button class="btn btn-link text-muted-custom p-0" @click="isPanelOpen = false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Panel Content / Form -->
      <div class="p-4 pt-1 flex-grow-1 overflow-auto">
        <div class="text-neon fw-bold mb-4" style="font-size: 0.75rem; letter-spacing: 1px;">INFORMACIÓ BÀSICA</div>
        
        <!-- Form Basics -->
        <div class="mb-4">
          <label class="form-label text-muted-custom" style="font-size: 0.8rem;">Nom del Partit</label>
          <input type="text" class="form-control form-control-dark custom-input" placeholder="Ex: Equip A vs Equip B" v-model="formData.name">
        </div>

        <div class="row g-3 mb-4">
          <div class="col-6">
            <label class="form-label text-muted-custom" style="font-size: 0.8rem;">Data</label>
            <input type="date" class="form-control form-control-dark custom-input" v-model="formData.date">
          </div>
          <div class="col-6">
            <label class="form-label text-muted-custom" style="font-size: 0.8rem;">Hora</label>
            <input type="time" class="form-control form-control-dark custom-input" v-model="formData.time">
          </div>
        </div>

        <div class="mb-5">
           <label class="form-label text-muted-custom" style="font-size: 0.8rem;">Aforament Total</label>
           <input type="number" class="form-control form-control-dark custom-input" v-model="formData.capacity" placeholder="0">
        </div>

        <div class="text-neon fw-bold mb-4" style="font-size: 0.75rem; letter-spacing: 1px;">TARIFICACIÓ PER ZONA</div>
        
        <!-- Tarification block -->
        <div class="card card-dark border-0 rounded-4 p-3 d-flex flex-column gap-3">
          <!-- Zone Row Options -->
          <div class="d-flex justify-content-between align-items-center">
             <div class="d-flex align-items-center gap-2 text-white" style="font-size: 0.9rem;">
                <svg width="18" height="18" class="text-muted-custom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                Tribuna Principal
             </div>
             <div class="input-group input-group-sm flex-nowrap" style="width: 100px;">
                <input type="text" class="form-control form-control-dark custom-input text-end fs-6 fw-bold border-end-0" value="0.00" placeholder="0.00">
                <span class="input-group-text bg-dark border-start-0 text-white custom-add-on">€</span>
             </div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
             <div class="d-flex align-items-center gap-2 text-white" style="font-size: 0.9rem;">
                <svg width="18" height="18" class="text-muted-custom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                Lateral
             </div>
             <div class="input-group input-group-sm flex-nowrap" style="width: 100px;">
                <input type="text" class="form-control form-control-dark custom-input text-end fs-6 fw-bold border-end-0" value="0.00" placeholder="0.00">
                <span class="input-group-text bg-dark border-start-0 text-white custom-add-on">€</span>
             </div>
          </div>

          <div class="d-flex justify-content-between align-items-center">
             <div class="d-flex align-items-center gap-2 text-warning" style="font-size: 0.9rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                Zona VIP / Llotja
             </div>
             <div class="input-group input-group-sm flex-nowrap" style="width: 100px;">
                <input type="text" class="form-control form-control-dark custom-input text-end fs-6 fw-bold border-end-0 text-warning" value="0.00" placeholder="0.00">
                <span class="input-group-text bg-dark border-start-0 text-warning custom-add-on">€</span>
             </div>
          </div>
        </div>

      </div>

      <!-- Panel Footer Actions -->
      <div class="p-4 border-top border-secondary border-opacity-25 d-flex gap-3 mt-auto">
        <button class="btn bg-dark text-white fw-bold py-2 px-4 shadow-sm" style="border: 1px solid rgba(255,255,255,0.1);" @click="isPanelOpen = false">Cancel·lar</button>
        <button class="btn btn-primary fw-bold py-2 px-4 flex-grow-1 text-dark shadow-sm">Guardar Event</button>
      </div>
    </aside>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado para abrir/cerrar el slide panel derecho
const isPanelOpen = ref(false);

// Objeto para simular datos del formulario al usuario
const formData = ref({
  name: '',
  date: '',
  time: '',
  capacity: null
});

// KPIs Estáticos para estructura visual
const kpi = ref({
  total_events: 0,
  new_this_month: 0,
  sales_today: "0",
  sales_value_today: "0.0k",
  avg_attendance: 0
});

// Lista vacía por defecto
const events = ref([]);

/* 
 * NOTA: Si prefieres ver datos provisionales similares a los de la foto para ver la estructura 
 * completada sin ser "reales", basta con descomentar esto:
 */
/*
events.value = [
  { shortCode: 'EQA', name: 'Equip A vs Equip B', subtitle: 'La Lliga - Estadi Principal', date: '28 Oct, 2024', time: '21:00h', attendance: '99,354 / 99,354', status: 'SENSE ENTRADES' },
  { shortCode: 'EQB', name: 'Equip C vs Equip D', subtitle: 'La Lliga - Estadi Secundari', date: '04 Nov, 2024', time: '18:30h', attendance: '14,620 / 14,800', status: 'DISPONIBLE' },
];
kpi.value = {
  total_events: 2,
  new_this_month: 2,
  sales_today: "1,240",
  sales_value_today: "12.4k",
  avg_attendance: 82
};
*/
</script>

<style scoped>
.admin-layout {
  background-color: var(--bg-color); /* #0b1121 */
  font-family: var(--font-family);
}

/* Sidebar styling */
.admin-sidebar {
  width: 260px;
  background-color: rgba(0,0,0,0.2); 
  border-right: 1px solid rgba(255,255,255,0.03);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-muted);
  text-decoration: none;
  padding: 12px 16px;
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
  background-color: rgba(44, 235, 112, 0.05); /* Soft neon tint */
  color: var(--text-main);
  border-left: 3px solid var(--primary-neon);
  font-weight: 600;
}

.nav-item.active svg {
  color: var(--primary-neon);
}

/* Cards & Content */
.card-dark {
  background-color: var(--card-bg); /* #1e293b */
}

/* Table specifics */
.admin-table tbody tr:last-child {
  border-bottom: none !important;
}

.status-badge {
  display: inline-block;
  font-size: 0.65rem;
  letter-spacing: 1px;
  padding: 2px 0;
}
.badge-danger { color: #f87171; }
.badge-success { color: var(--primary-neon); }


/* Right Panel (Slide Over Drawer) */
.slide-panel {
  position: fixed;
  top: 0;
  right: -450px;
  width: 450px;
  height: 100vh;
  background-color: #0d1424; /* Un tono oscuro sólido para el drawer */
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
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
  z-index: 1040;
}

/* Custom inputs overriden */
.custom-input {
  background-color: #030712 !important; /* Más oscuro para los inputs */
  border: 1px solid rgba(255,255,255,0.05) !important;
  color: white !important;
  padding: 10px 14px;
}
.custom-input:focus {
  border-color: var(--primary-neon) !important;
}

.custom-add-on {
  background-color: #030712 !important;
  border: 1px solid rgba(255,255,255,0.05) !important;
}
</style>
