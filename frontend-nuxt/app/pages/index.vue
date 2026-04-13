<script setup>
definePageMeta({ middleware: 'auth' })
</script>
<template>
  <div class="row align-items-center min-vh-100 text-center pb-5 bg-premium-dark m-0 position-relative overflow-hidden">
    <!-- Balón girando en el fondo -->
    <div class="position-absolute top-50 start-100 translate-middle opacity-25" style="pointer-events: none; mix-blend-mode: overlay;">
       <div class="spinning-ball-hero">⚽</div>
    </div>
    
    <div class="col-md-6 mx-auto pt-5" style="z-index: 1;">
      <h1 class="display-4 fw-bold mb-3 text-white">Benvingut a FastGoal Tickets</h1>
      <p class="lead text-white-50 mb-5">El millor lloc per reservar entrades dels millors partits de futbol.</p>
      
      <NuxtLink to="/matches" class="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow">
        Veure partits
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.spinning-ball-hero {
  font-size: 45vw; /* Escala con la pantalla */
  display: inline-block;
  animation: spin-hero 40s linear infinite;
}

@keyframes spin-hero {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}
</style>
