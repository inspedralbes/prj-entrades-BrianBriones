import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    initAuth() {
      // Sync from sessionStorage (client-side only)
      if (process.client) {
        const authStat = sessionStorage.getItem('admin_authenticated')
        this.isAuthenticated = authStat === 'true'
      }
    },
    login(password: string) {
      const CORRECT_PASSWORD = 'Bryan123'
      if (password === CORRECT_PASSWORD) {
        this.isAuthenticated = true
        if (process.client) {
          sessionStorage.setItem('admin_authenticated', 'true')
        }
        return true
      }
      return false
    },
    logout() {
      this.isAuthenticated = false
      if (process.client) {
        sessionStorage.removeItem('admin_authenticated')
      }
    }
  }
})
