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
    <!-- Navbar (Custom modern classes) -->
    <nav class="navbar navbar-expand navbar-custom mb-4">
      <div class="container d-flex justify-content-between align-items-center">
        <NuxtLink to="/" class="navbar-brand fw-bold text-neon" style="font-size: 1.5rem;">
          The Nocturnal Pitch
        </NuxtLink>
        <div class="d-flex align-items-center flex-grow-1 ms-5">
           <NuxtLink to="/matches" class="text-white text-decoration-none me-4 pb-1 border-bottom border-success">Partits</NuxtLink>
           <a href="#" class="text-muted-custom text-decoration-none me-4">Les meves entrades</a>
           <a href="#" class="text-muted-custom text-decoration-none me-4">Estadis</a>
           <a href="#" class="text-muted-custom text-decoration-none">Notícies</a>
        </div>
        
        <div class="d-flex align-items-center">
            <div class="input-group me-4" style="max-width: 250px;">
               <input type="text" class="form-control form-control-dark rounded-pill" placeholder="🔍 Cerca partits...">
            </div>
            <a href="#" class="text-white text-decoration-none mx-3 fs-5">🛒</a>
            <div v-if="token" class="d-flex align-items-center mx-2">
               <span v-if="user" class="text-white me-3 fw-bold">{{ user.name }}</span>
               <button @click="logout" class="btn btn-outline-neon btn-sm shadow-sm rounded-pill px-3">
                 Sortir
               </button>
            </div>
            <div v-else>
               <NuxtLink to="/login" class="text-white text-decoration-none mx-2 fs-5">👤</NuxtLink>
            </div>
        </div>
      </div>
    </nav>
    <main class="container-fluid pb-5 px-md-5">
      <NuxtPage />
    </main>
  </div>
</template>
