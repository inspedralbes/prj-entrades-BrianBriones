<template>
  <button @click="toggleTheme" class="btn btn-outline-neon rounded-circle p-2 d-flex align-items-center justify-content-center mx-2 theme-toggle" title="Alternar modo claro/oscuro" aria-label="Cambiar tema">
    <!-- Sol: Muestra el sol si está en modo oscuro (para cambiar a claro) -->
    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="feather feather-sun" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
    <!-- Luna: Muestra la luna si está en modo claro (para cambiar a oscuro) -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="feather feather-moon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

onMounted(() => {
  // Inicializamos el estado reactivo basándonos en si el documento tiene la clase 'dark' o no
  isDark.value = document.documentElement.classList.contains('dark')
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.theme-toggle svg {
  transition: transform 0.3s ease;
}
.theme-toggle:hover svg {
  transform: rotate(15deg);
}
</style>
