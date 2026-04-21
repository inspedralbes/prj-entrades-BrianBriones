<template>
  <div class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 dark:bg-black/80 backdrop-blur-sm">
    <div class="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 border border-gray-200 dark:border-gray-800 transform transition-all">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Acceso Administrador</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm">Introduce la contraseña para continuar</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-5">
          <label for="password" class="block text-sm font-medium text-slate-900 dark:text-white mb-1">Contraseña</label>
          <input 
            type="password" 
            id="password"
            v-model="password" 
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#00ff88] focus:border-[#00ff88] outline-none transition-colors"
            required
            autofocus
          />
          <p v-if="error" class="text-red-500 text-sm mt-3 flex items-center gap-1 bg-red-50 dark:bg-red-900/30 dark:text-red-400 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ error }}
          </p>
        </div>

        <div class="flex gap-3 mt-6">
          <button 
            type="button" 
            @click="handleCancel"
            class="flex-1 py-2.5 px-4 bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 outline-none"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            class="flex-1 py-2.5 px-4 bg-[#00ff88] hover:bg-[#00e67a] text-slate-900 font-bold rounded-lg shadow-lg transition-colors focus:ring-2 focus:ring-[#00ff88] outline-none border border-transparent"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

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
