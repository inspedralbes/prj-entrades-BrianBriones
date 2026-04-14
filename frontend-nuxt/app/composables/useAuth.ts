export const useAuth = () => {
  const user  = useState<any>('user', () => null)
  const token = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 })

  const loginWithGoogle = async () => {
    const { data } = await useFetch<{url: string}>('http://localhost:8000/api/auth/google')
    if (data.value?.url) window.location.href = data.value.url
  }

  const logout = async () => {
    await $fetch('http://localhost:8000/api/auth/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
    })
    token.value = null
    user.value  = null
    navigateTo('/login')
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
        user.value = await $fetch('http://localhost:8000/api/me', {
            headers: { Authorization: `Bearer ${token.value}` },
        })
    } catch(e) {
        token.value = null
        user.value = null
    }
  }

  return { user, token, loginWithGoogle, logout, fetchUser }
}
