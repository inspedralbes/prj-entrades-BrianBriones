<script setup>
const { token, user, logout, fetchUser } = useAuth()

onMounted(async () => {
    if (token.value && !user.value) {
        await fetchUser()
    }
})
</script>

<template>
  <div>
    <!-- Navbar (Bootstrap modern classes) -->
    <nav class="navbar navbar-dark bg-dark shadow-sm mb-4">
      <div class="container d-flex justify-content-between align-items-center">
        <NuxtLink to="/" class="navbar-brand fw-bold">🎫 TicketShop</NuxtLink>
        <div v-if="token" class="d-flex align-items-center">
          <span v-if="user" class="text-white me-3">{{ user.name }}</span>
            <button @click="logout" class="btn btn-sm btn-outline-light">
              Salir
            </button>
        </div>
      </div>
    </nav>
    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>
