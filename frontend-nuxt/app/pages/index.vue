<script setup>
definePageMeta({ middleware: 'auth' })
</script>
<template>
  <div class="row align-items-center min-vh-100 text-center pb-5">
    <div class="col-md-6 mx-auto">
      <h1 class="display-4 fw-bold mb-3 text-dark">Bienvenido a TicketShop</h1>
      <p class="lead text-muted mb-5">El mejor lugar para reservar entradas de los mejores partidos de fútbol.</p>
      
      <NuxtLink to="/matches" class="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow">
        Ver partidos
      </NuxtLink>
    </div>
  </div>
</template>
