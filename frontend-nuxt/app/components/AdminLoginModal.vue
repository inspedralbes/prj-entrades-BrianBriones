<template>
  <div class="card border-0 p-4 shadow-lg text-center mx-auto" style="max-width: 400px; width: 100%; border-radius: 16px; background-color: var(--card-bg, #1e293b); font-family: var(--font-family, inherit);">
    <div class="mb-4">
      <h2 class="fw-bold mb-2" style="color: var(--text-main, #fff); font-size: 1.5rem;">Acceso Administrador</h2>
      <p style="color: var(--text-muted, #94a3b8); font-size: 0.9rem; margin-bottom: 0;">Introduce la contraseña para continuar</p>
    </div>

    <form @submit.prevent="handleSubmit" class="text-start">
      <div class="mb-4">
        <label for="password" class="form-label fw-bold" style="color: var(--text-main, #fff); font-size: 0.9rem;">Contraseña</label>
        <input 
          type="password" 
          id="password"
          v-model="password" 
          placeholder="••••••••"
          class="form-control"
          style="background-color: var(--card-bg-light, #334155) !important; border: 1px solid rgba(128,128,128,0.3) !important; color: var(--text-main, #fff) !important; padding: 12px 16px; border-radius: 8px;"
          required
          autofocus
        />
        <p v-if="error" class="text-danger small mt-2 fw-medium">
          {{ error }}
        </p>
      </div>

      <div class="d-flex gap-3">
        <button 
          type="button" 
          @click="handleCancel"
          class="btn flex-grow-1"
          style="border: 1px solid rgba(128,128,128,0.5); color: var(--text-main, #fff); border-radius: 8px; font-weight: 500; background-color: transparent;"
        >
          Cancelar
        </button>
        <button 
          type="submit" 
          class="btn flex-grow-1 fw-bold text-dark"
          style="background-color: var(--primary-neon, #00ff88); border-radius: 8px; box-shadow: 0 0 10px rgba(44, 235, 112, 0.2);"
        >
          Entrar
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-control:focus {
  border-color: var(--primary-neon, #00ff88) !important;
  box-shadow: 0 0 0 0.2rem rgba(44, 235, 112, 0.25) !important;
}
.btn:hover {
  opacity: 0.85;
}
</style>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAdminStore } from '../stores/adminStore'

const password = ref('')
const error = ref('')
const router = useRouter()
const route = useRoute()
const adminStore = useAdminStore()

const handleSubmit = () => {
  error.value = ''
  const success = adminStore.login(password.value)
  
  if (success) {
    const redirect = route.query.redirect || '/admin'
    router.push(redirect)
  } else {
    error.value = 'Contraseña incorrecta. Redirigiendo...'
    password.value = ''
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
}

const handleCancel = () => {
  router.push('/')
}
</script>
