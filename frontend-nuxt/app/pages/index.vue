<script setup>
definePageMeta({ middleware: 'auth' })
</script>
<template>
  <!-- Banner Principal Premium: bg-premium-dark asegura que siempre sea oscuro -->
  <div class="row align-items-center min-vh-100 text-center pb-5 bg-premium-dark m-0">
    <div class="col-md-6 mx-auto pt-5">
      <h1 class="display-4 fw-bold mb-3">Bienvenido a FastGoal Tickets</h1>
      <p class="lead text-muted-custom mb-5">El mejor lugar para reservar entradas de los mejores partidos de fútbol.</p>
      
      <NuxtLink to="/matches" class="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow">
        Ver partidos
      </NuxtLink>
    </div>
  </div>
</template>
