<template>
  <div class="row min-vh-50 align-items-center justify-content-center text-center mt-5">
    <div class="col-md-6">
      <div class="card border-0 shadow-lg p-5 bg-light">
        <div class="mb-4">
          <span class="display-1">✅</span>
        </div>
        <h2 class="fw-bold text-success mb-3">¡Reserva realizada correctamente!</h2>
        <p class="text-muted fs-5 mb-5">
          Tus entradas han sido guardadas. Recibirás un correo con las instrucciones en breve.
        </p>
        
        <NuxtLink to="/matches" class="btn btn-primary btn-lg fw-bold px-5 rounded-pill shadow-sm">
          Volver a partidos
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Página estática de confirmación de reserva
</script>
