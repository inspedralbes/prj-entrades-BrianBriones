<script setup>
const { token, loginWithGoogle } = useAuth()

onMounted(() => {
  if (token.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <div class="row align-items-center justify-content-center min-vh-100 text-center pb-5 position-relative flex-column overflow-hidden">
    
    <!-- Animación de fondo decorativa -->
    <div class="position-absolute top-50 start-50 translate-middle opacity-10" style="pointer-events: none; z-index: 0;">
       <div class="spinning-ball-bg">⚽</div>
    </div>

    <div class="col-md-5 col-lg-4 mx-auto" style="z-index: 1;">
      <div class="text-center mb-5">
        <h2 class="fw-bold text-neon display-5 mb-2" style="letter-spacing: -2px;">FastGoal Tickets</h2>
        <p class="text-muted-custom fw-semibold">L'entrada a la passió</p>
      </div>

      <div class="card card-dark rounded-4 shadow-lg p-4 p-md-5 text-start border-0">
        <button @click="loginWithGoogle" class="btn btn-light w-100 py-3 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-3" style="font-size: 1.1rem; border: 2px solid rgba(0,0,0,0.05); color: #000 !important; background-color: #fff !important;">
           <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="24">
           Inicia sessió amb Google
        </button>
      </div>
      
      <div class="text-center mt-5">
         <span class="text-muted-custom small opacity-50" style="font-size: 0.7rem; letter-spacing: 1px;">🔒 CONEXIÓ XIFRADA I SEGURA</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.spinning-ball-bg {
  font-size: 40rem;
  display: inline-block;
  animation: spin 30s linear infinite;
  filter: grayscale(100%);
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
