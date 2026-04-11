<template>
  <div class="row g-4">
    <div v-for="match in matches" :key="match.id" class="col-md-6 col-xl-4">
      <div class="card card-dark h-100 shadow-sm border-0 bg-transparent rounded-4 overflow-hidden d-flex flex-column" style="background-color: var(--card-bg) !important;">
        
        <!-- Top bar (Liga info + Availability) -->
        <div class="d-flex justify-content-between align-items-center px-4 pt-4 pb-2">
           <span class="text-muted-custom fw-bold" style="font-size: 0.65rem; letter-spacing: 1px;">LA LIGA • JORNADA 24</span>
           <span class="text-neon fw-bold d-flex align-items-center" style="font-size: 0.75rem;">
             <span class="me-1" style="font-size: 1.2rem; line-height: 0;">•</span> Entrades disponibles
           </span>
        </div>

        <!-- Teams Section -->
        <div class="px-4 py-3 pb-2 d-flex justify-content-between align-items-center flex-grow-1">
           <div class="d-flex align-items-center gap-2" style="width: 40%;">
              <div class="bg-dark rounded-circle border border-secondary d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <h4 class="card-title fw-bold mb-0 text-white" style="line-height: 1.1;">{{ match.home_team }}</h4>
           </div>
           
           <span class="text-muted-custom small fw-bold mx-2">VS</span>
           
           <div class="d-flex align-items-center justify-content-end gap-2 text-end" style="width: 40%;">
              <h4 class="card-title fw-bold mb-0 text-white" style="line-height: 1.1;">{{ match.away_team }}</h4>
              <div class="bg-dark rounded-circle border border-secondary d-flex align-items-center justify-content-center flex-shrink-0" style="width: 40px; height: 40px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
           </div>
        </div>

        <div class="px-4 py-2 mb-3">
           <div class="d-flex align-items-center mb-1 text-muted-custom small">
             <span class="me-2 text-neon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></span> {{ formatDate(match.date) }}
           </div>
           <div class="d-flex align-items-center text-muted-custom small">
             <span class="me-2 text-neon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></span> {{ match.stadium }}
           </div>
        </div>
        
        <hr class="border-secondary mx-4 my-0 opacity-25">

        <!-- Bottom Price & CTA Action -->
        <div class="px-4 py-4 d-flex justify-content-between align-items-end mt-auto">
           <div>
             <span class="text-muted-custom" style="font-size: 0.75rem;">Des de</span>
             <h2 class="fw-bold text-neon mb-0 d-flex align-items-start" style="line-height: 1;">
               {{ Math.floor(Math.random() * 50) + 30 }}<span class="fs-5">€</span>
             </h2>
           </div>
           
           <NuxtLink :to="`/match/${match.id}`" class="btn btn-primary fw-bold shadow-sm rounded-pill px-4 text-dark" style="letter-spacing: 0.5px;">
              Veure entrades
           </NuxtLink>
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
  const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' };
  const d = new Date(dateString);
  let str = d.toLocaleDateString('ca-ES', options);
  // Example output formatting adjustment to match design: "Dissabte, 12 de Maig • 21:00"
  // Just use basic formatting since full locale parsing goes out of scope slightly
  return str.replace(',', ' •').replace(' a les ', ' • ');
};
</script>

<style scoped>
.card-dark {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-dark:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.4) !important;
}
</style>
