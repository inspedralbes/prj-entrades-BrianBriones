<script setup>
const { token, loginWithGoogle } = useAuth()

onMounted(() => {
  if (token.value) {
    navigateTo('/')
  }
})
</script>

<template>
  <div class="row align-items-center justify-content-center min-vh-100 text-center pb-5">
    <div class="col-md-5 col-lg-4 mx-auto">
      <div class="text-center mb-4">
        <div class="d-inline-flex bg-neon rounded-3 p-2 mb-3 shadow">
          <!-- Icon placeholder -->
          🎫
        </div>
        <h2 class="fw-bold text-neon mb-4">EstadiNocturn</h2>
      </div>

      <div class="card card-dark rounded-4 shadow-lg p-5 text-start">
        <h2 class="fw-bold mb-2 text-center text-white">Benvingut de nou</h2>
        <p class="text-muted-custom text-center mb-4 small">Entra per viure la passió del futbol sota els focus.</p>
        
        <button @click="loginWithGoogle" class="btn btn-light w-100 py-2 fw-semibold rounded-pill shadow-sm mb-4 d-flex align-items-center justify-content-center gap-2">
           <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="20">
           Inicia sessió amb Google
        </button>
        
        <div class="d-flex align-items-center mb-4">
           <hr class="flex-grow-1 border-secondary">
           <span class="mx-3 text-muted-custom small text-uppercase" style="font-size:0.7rem; letter-spacing: 1px;">O amb el teu correu electrònic</span>
           <hr class="flex-grow-1 border-secondary">
        </div>

        <div class="mb-3">
          <label class="form-label text-muted-custom small fw-bold text-uppercase" style="font-size:0.7rem; letter-spacing: 1px;">Correu electrònic</label>
          <input type="email" class="form-control form-control-dark rounded-3" placeholder="✉️ nom@exemple.cat">
        </div>
        
        <div class="mb-4">
          <div class="d-flex justify-content-between align-items-center">
             <label class="form-label text-muted-custom small fw-bold text-uppercase mb-0" style="font-size:0.7rem; letter-spacing: 1px;">Contrasenya</label>
             <a href="#" class="text-neon text-decoration-none small" style="font-size:0.75rem;">Has oblidat la contrasenya?</a>
          </div>
          <input type="password" class="form-control form-control-dark rounded-3 mt-2" placeholder="🔒 ••••••••">
        </div>

        <div class="mb-4 form-check">
          <input type="checkbox" class="form-check-input bg-dark border-secondary" id="rememberMe">
          <label class="form-check-label text-muted-custom small" for="rememberMe">Recorda'm en aquest dispositiu</label>
        </div>

        <button class="btn btn-primary w-100 py-3 rounded-3 text-dark fw-bold fs-5 mb-4 shadow" style="border-radius: 12px; letter-spacing: 0.5px;">
           Inicia sessió
        </button>

        <p class="text-center text-muted-custom small mb-0">
           No tens un compte? <a href="#" class="text-neon text-decoration-none fw-semibold">Registra't ara</a>
        </p>
      </div>
      
      <div class="text-center mt-4">
         <span class="text-muted-custom small opacity-50" style="font-size: 0.7rem; letter-spacing: 1px;">🔒 CONEXIÓ XIFRADA I SEGURA</span>
      </div>
    </div>
  </div>
</template>
