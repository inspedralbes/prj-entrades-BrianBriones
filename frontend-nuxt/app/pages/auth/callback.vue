<script setup>
const route = useRoute()
const { token, fetchUser } = useAuth()

onMounted(async () => {
  const t = route.query.token
  if (t) {
    token.value = t
    await fetchUser()
    navigateTo('/')
  } else {
    navigateTo('/login')
  }
})
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="text-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Iniciando sesión...</span>
        </div>
        <h2 class="mt-3">Iniciando sesión con Google...</h2>
    </div>
  </div>
</template>
