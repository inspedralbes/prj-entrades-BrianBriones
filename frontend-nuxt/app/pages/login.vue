<script setup>
const { token, loginWithGoogle } = useAuth()

onMounted(() => {
  if (token.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <div class="row align-items-center min-vh-100 text-center pb-5">
    <div class="col-md-6 mx-auto">
      <h1 class="display-4 fw-bold mb-3 text-dark">Bienvenido a TicketShop</h1>
      <p class="lead text-muted mb-5">Inicia sesión para reservar entradas a los mejores partidos de fútbol.</p>
      
      <button @click="loginWithGoogle" class="btn btn-outline-dark btn-lg px-5 py-3 fw-bold rounded-pill shadow">
        Iniciar sesión con Google
      </button>
    </div>
  </div>
</template>
