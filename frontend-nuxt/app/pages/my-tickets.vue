<template>
  <div class="row justify-content-center">
    <div class="col-md-10">
      <h2 class="mb-4 fw-bold border-bottom pb-2 text-main">Les meves entrades</h2>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2 text-muted">Carregant el teu historial...</p>
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else-if="orders.length === 0" class="text-center py-5">
        <svg class="opacity-50 mb-3 text-muted-custom" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <h4 class="text-main">Aún no has comprado ninguna entrada.</h4>
        <p class="text-muted-custom">Explora los próximos partidos y vive la pasión en directo.</p>
        <NuxtLink to="/matches" class="btn btn-outline-neon mt-3 rounded-pill px-4">Veure Partits</NuxtLink>
      </div>

      <div v-else class="d-flex flex-column gap-3">
        <div v-for="order in orders" :key="order.id" class="card card-dark border-0 rounded-4 shadow-sm overflow-hidden">
          <div class="card-header border-secondary border-opacity-10 py-3" style="background-color: rgba(128,128,128,0.1);">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="badge bg-success mb-2">Completada</span>
                <h5 class="mb-0 text-main fw-bold">{{ order.match?.home_team || 'Partit' }} vs {{ order.match?.away_team || 'Equip' }}</h5>
              </div>
              <div class="text-end">
                <div class="text-neon fw-bold fs-4">{{ order.total_price }} €</div>
                <small class="text-muted-custom">Data de compra: {{ formatDate(order.created_at) }}</small>
              </div>
            </div>
          </div>
          
          <div class="card-body">
            <div class="row g-4 align-items-center">
              <div class="col-md-6 border-end-sm border-secondary border-opacity-25">
                 <div class="d-flex align-items-center gap-2 mb-2 text-muted-custom">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    <span>{{ formatMatchDate(order.match?.date) }}</span>
                 </div>
                 <div class="d-flex align-items-center gap-2 mb-3 text-muted-custom">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{{ order.match?.stadium || 'Estadi' }}</span>
                 </div>
              </div>
              
              <div class="col-md-6">
                <h6 class="text-main mb-2">Les teves localitats:</h6>
                <div class="d-flex flex-wrap gap-2">
                  <div v-for="(seat, idx) in order.seats" :key="idx" class="badge" style="background-color: rgba(128,128,128,0.2); border: 1px solid rgba(128,128,128,0.3); color: var(--text-main); padding: 0.5rem;">
                    <span class="text-primary-neon me-1">{{ order.ticket_type?.zone || 'General' }}</span> | {{ seat }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '~/services/api';

definePageMeta({
  middleware: 'auth'
});

const orders = ref([]);
const loading = ref(true);
const error = ref(null);
const token = useCookie('auth_token');

onMounted(async () => {
  try {
    const data = await api.getOrders(token.value);
    orders.value = data;
  } catch (err) {
    error.value = 'No se ha podido cargar tu historial de entradas.';
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
};

const formatMatchDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};
</script>

<style scoped>
.text-primary-neon {
  color: var(--primary-neon);
}
@media (min-width: 768px) {
  .border-end-sm {
    border-right: 1px solid rgba(255,255,255,0.1);
  }
}
</style>
