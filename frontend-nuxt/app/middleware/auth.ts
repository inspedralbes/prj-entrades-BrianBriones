export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = useAuth()
  if (!token.value && to.path !== '/login') {
      return navigateTo('/login')
  }
})
