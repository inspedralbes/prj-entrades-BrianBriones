<template>
  <div class="resum-compra-container p-4 pb-5">
    
    <!-- Breadcrumb -->
    <div class="d-flex align-items-center gap-2 mb-4 text-muted-custom" style="font-size: 0.85rem;">
      <span class="hover-neon cursor-pointer">Cistella</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"></path></svg>
      <span class="text-neon fw-bold">Resum</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"></path></svg>
      <span class="hover-neon cursor-pointer">Pagament</span>
    </div>

    <!-- Header -->
    <div class="mb-5 d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div>
        <h1 class="text-main fw-bold mb-2" style="font-size: 2.5rem; letter-spacing: -1px;">Resum de la teva compra</h1>
        <p class="text-muted-custom fs-5 mb-0">Revisa els detalls abans de finalitzar la transacció.</p>
      </div>
    </div>

    <div class="row g-4 mb-5">
      <!-- Left Column: Match Details & Security -->
      <div class="col-xl-7 d-flex flex-column gap-3">
        
        <!-- Main Match Detail Card -->
        <div class="card card-dark border-0 rounded-4 p-4 shadow-lg position-relative overflow-hidden">
          <!-- Light border gradient effect on top -->
          <div class="position-absolute top-0 start-0 w-100" style="height: 2px; background: linear-gradient(90deg, rgba(44,235,112,0.1) 0%, rgba(44,235,112,0.5) 50%, rgba(44,235,112,0.1) 100%);"></div>
          
          <div class="d-flex justify-content-between align-items-start mb-4">
            <div>
              <div class="text-neon fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 2px;">PROPER PARTIT</div>
              <h2 class="text-main fw-bold mb-1" style="letter-spacing: -0.5px;">{{ match?.home_team || 'Equip Local' }} vs {{ match?.away_team || 'Equip Visitant' }}</h2>
              <div class="text-muted-custom" style="font-size: 0.9rem;">Lliga EA Sports</div>
            </div>
            <div class="text-neon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
          </div>

          <!-- Info Grid -->
          <div class="row g-4 mb-5 pb-3"> <!-- Added pb-3 to give more space before the footer line -->
            <div class="col-sm-6 col-md-4">
              <div class="text-muted-custom fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 1px;">ESTADI</div>
              <div class="text-main fw-medium lh-sm px-1">{{ match?.stadium || 'Estadi Olímpic' }}</div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="text-muted-custom fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 1px;">DATA I HORA</div>
              <div class="text-main fw-medium lh-sm px-1">{{ formatDate(match?.date) }}</div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="text-muted-custom fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 1px;">ZONA</div>
              <div class="text-neon fw-medium lh-sm px-1">Seients Seleccionats</div>
            </div>
            <div class="col-sm-6 col-md-4">
              <div class="text-muted-custom fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 1px;">QUANTITAT</div>
              <div class="text-main fw-medium px-1">{{ seats?.length || 2 }} Entrades</div>
            </div>
            <div class="col-sm-6 col-md-8">
              <div class="text-muted-custom fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 1px;">CADIRA</div>
              <div class="text-main fw-medium px-1">Fila 12, Seients 44-45</div>
            </div>
          </div>

          <!-- Bottom block of the card (Price & Official mark) -->
          <div class="d-flex justify-content-between align-items-end mt-auto pt-4 border-top border-secondary border-opacity-25 relative-bottom">
            <div class="d-flex align-items-center gap-2">
              <div class="bg-dark rounded-2 overflow-hidden d-flex align-items-center justify-content-center border border-secondary" style="width: 36px; height: 36px; background: linear-gradient(135deg, #1e3a8a, #991b1b, #fbbf24);">
                <!-- Abstract official logo representation (blaugrana + yellow) -->
              </div>
              <div class="text-muted-custom lh-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">
                ENTRADA<br>OFICIAL
              </div>
            </div>
            <div class="text-end">
              <div class="text-muted-custom fw-bold mb-1" style="font-size: 0.65rem; letter-spacing: 1px;">PREU TOTAL ENTRADES</div>
              <div class="text-main fw-bold fs-3 lh-1">{{ subtotal }} €</div>
            </div>
          </div>
        </div>

        <!-- Security Guarantee Card -->
        <div class="card card-dark border-0 rounded-4 p-4 d-flex flex-row align-items-start gap-3 shadow-sm" style="background-color: var(--card-bg-light) !important;">
           <div class="flex-shrink-0 d-flex align-items-center justify-content-center text-neon mt-1" style="width: 24px;">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(44, 235, 112, 0.2)"/>
               <path d="M9 12l2 2 4-4"/>
             </svg>
           </div>
           <div>
             <h4 class="text-main fw-bold mb-1" style="font-size: 1rem;">Garantia de seguretat</h4>
             <div class="text-muted-custom" style="font-size: 0.85rem; line-height: 1.4;">
               Les teves entrades són 100% autèntiques i estan protegides pel sistema de xifrat de FastGoal Tickets.
             </div>
           </div>
        </div>

      </div>

      <!-- Right Column: Payment Details -->
      <div class="col-xl-5">
        <div class="card card-dark border-0 rounded-4 p-4 p-md-5 shadow-lg h-100 d-flex flex-column" style="background-color: var(--card-bg);">
          <h3 class="text-main fw-bold mb-4" style="font-size: 1.3rem;">Detall del pagament</h3>
          
          <form @submit.prevent="emitPay" class="flex-grow-1 d-flex flex-column">
            <!-- Totals Breakdowns -->
            <div class="d-flex flex-column gap-3 mb-4">
              <div class="d-flex justify-content-between align-items-center text-muted-custom fs-6">
                <span>{{ seats?.length || 2 }}× Entrades</span>
                <span class="text-main">{{ subtotal }} €</span>
              </div>
              <div class="d-flex justify-content-between align-items-center text-muted-custom fs-6">
                <span>Despeses de gestió</span>
                <span class="text-main">12,50 €</span>
              </div>
              <div class="d-flex justify-content-between align-items-center text-muted-custom fs-6">
                <span>IVA (21%)</span>
                <span class="text-main">63,52 €</span>
              </div>
            </div>

            <!-- Total Callout -->
            <div class="rounded-3 p-4 mb-4 d-flex justify-content-between align-items-center" style="background-color: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
              <div class="text-main fw-bold fs-5">Total a pagar</div>
              <div class="text-neon fw-bold" style="font-size: 2rem; line-height: 1; letter-spacing: -1px;">{{ grandTotal }} €</div>
            </div>

            <!-- Fake Credit Card Form -->
            <div class="mb-4">
              <h5 class="text-main fw-bold mb-3 fs-6">Dades de pagament</h5>
              
              <div class="mb-3">
                <label class="text-muted-custom small fw-bold mb-1">Nom del titular</label>
                <input type="text" class="form-control bg-transparent text-main" style="border-color: rgba(128,128,128,0.3);" placeholder="Ex: Joan Garcia" required minlength="3">
              </div>
              
              <div class="mb-3 position-relative">
                <label class="text-muted-custom small fw-bold mb-1">Número de targeta</label>
                <input type="text" class="form-control bg-transparent text-main ps-5" style="border-color: rgba(128,128,128,0.3);" placeholder="16 dígits seguits (ex: 4500123456789012)" required pattern="\d{16}" maxlength="16" title="16 números seguits sense espais">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="position-absolute text-muted-custom" style="top: 35px; left: 12px;"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              </div>
              
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label class="text-muted-custom small fw-bold mb-1">Data d'expiració</label>
                  <input type="text" class="form-control bg-transparent text-main" style="border-color: rgba(128,128,128,0.3);" placeholder="MM/AA (ex: 12/28)" required pattern="(0[1-9]|1[0-2])\/\d{2}" maxlength="5">
                </div>
                <div class="col-6">
                  <label class="text-muted-custom small fw-bold mb-1">Codi CVV</label>
                  <input type="text" class="form-control bg-transparent text-main" style="border-color: rgba(128,128,128,0.3);" placeholder="Ex: 123" required pattern="\d{3,4}" maxlength="4">
                </div>
              </div>
            </div>

            <!-- Proceed Button -->
            <button type="submit" class="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow-none text-dark d-flex justify-content-center align-items-center gap-2 mb-4" style="font-size: 1.05rem; letter-spacing: 0.5px;">
               Finalitzar i Pagar
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>
          
          <!-- Payment Icons & Security string -->
          <div class="text-center mt-auto">
            <div class="d-flex justify-content-center gap-3 mb-3 text-muted-custom opacity-75">
              <!-- Credit Card -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              <!-- Bank -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 21h18"></path><path d="M3 10h18"></path><path d="M5 6l7-3 7 3"></path><path d="M4 10v11"></path><path d="M20 10v11"></path><path d="M8 14v3"></path><path d="M12 14v3"></path><path d="M16 14v3"></path></svg>
              <!-- Wallet/Money -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
            </div>
            <div class="text-muted-custom" style="font-size: 0.6rem; letter-spacing: 1px; opacity: 0.6;">
              TRANSACCIÓ SEGURA XIFRADA AMB SSL DE 256 BITS
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upsell Section -->
    

  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  match: {
    type: Object,
    default: null
  },
  seats: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['pay', 'timeout']);

const emitPay = () => {
  emit('pay');
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('ca-ES', options);
};

const subtotal = computed(() => {
  if (!props.seats || props.seats.length === 0) return '290.00';
  const sum = props.seats.reduce((acc, seat) => acc + (seat.price || 145), 0);
  return sum.toFixed(2);
});

const grandTotal = computed(() => {
  const sub = parseFloat(subtotal.value);
  const total = sub + 12.50 + 63.52; // adding fake taxes inside as requested
  return total.toFixed(2);
});
</script>

<style scoped>
.resum-compra-container {
  background-color: var(--bg-color);
  font-family: var(--font-family);
  max-width: 1200px;
  margin: 0 auto;
}

.cursor-pointer {
  cursor: pointer;
}

.hover-neon:hover {
  color: var(--primary-neon) !important;
  text-decoration: underline;
}

.card-dark {
  background-color: var(--card-bg);
}

.upgrade-card {
  min-height: 200px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.upgrade-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.5);
}

/* Add custom grid gap override if needed */
.gap-3 {
  gap: 1rem !important;
}
</style>
