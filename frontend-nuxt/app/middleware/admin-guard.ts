import { useAdminStore } from '~/stores/adminStore'

export default defineNuxtRouteMiddleware((to) => {
    // Solo aplica a rutas que empiecen por /admin y que no sean la ruta de login
    if (!to.path.startsWith('/admin') || to.path === '/admin-login') return

    // SSR: solo ejecutar en el cliente para lidiar con sessionStorage
    if (process.server) return

    const adminStore = useAdminStore()
    // Asegurar que el estado esté sincronizado al entrar
    adminStore.initAuth()

    if (!adminStore.isAuthenticated) {
        // Redirigir al login guardando la ruta original a la que querían entrar
        return navigateTo({
            path: '/admin-login',
            query: { redirect: to.fullPath }
        })
    }
})
