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
          FastGoal Tickets
        </NuxtLink>
        <div class="d-flex align-items-center flex-grow-1 ms-5">
           <NuxtLink to="/matches" class="text-white text-decoration-none me-4 pb-1 border-bottom border-success">Partits</NuxtLink>
           <NuxtLink v-if="token" to="/my-tickets" class="text-muted-custom text-decoration-none me-4">Les meves entrades</NuxtLink>
           <NuxtLink v-if="token" to="/admin" class="text-muted-custom text-decoration-none me-4">Administració</NuxtLink>
           <a href="#" class="text-muted-custom text-decoration-none">Notícies</a>
        </div>
        
        <div class="d-flex align-items-center">
            <div class="input-group me-4" style="max-width: 250px;">
               <input type="text" class="form-control form-control-dark rounded-pill" placeholder="Cerca partits...">
            </div>
            <a href="#" class="text-white text-decoration-none mx-3 fs-5">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            </a>
            <div v-if="token" class="d-flex align-items-center mx-2">
               <span v-if="user" class="text-white me-3 fw-bold">{{ user.name }}</span>
               <button @click="logout" class="btn btn-outline-neon btn-sm shadow-sm rounded-pill px-3">
                 Sortir
               </button>
            </div>
            <div v-else>
               <NuxtLink to="/login" class="text-white text-decoration-none mx-2 fs-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               </NuxtLink>
            </div>
        </div>
      </div>
    </nav>
    <main class="container-fluid pb-5 px-md-5">
      <NuxtPage />
    </main>
  </div>
</template>
