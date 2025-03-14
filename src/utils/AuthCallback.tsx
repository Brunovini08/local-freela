import { useEffect } from "react"

const AuthCallback = () => {
  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.replace('#', '?'))

    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')
    if (accessToken) {
      console.log('Access Token:', accessToken)
      document.cookie = `sb-access-token=${accessToken}; path=/; SameSite=Lax; `;
    }

    if (refreshToken) {
      console.log('Refresh Token:', refreshToken)
      document.cookie = `sb-refresh-token=${refreshToken}; path=/; SameSite=Lax; `;
    }
    window.location.replace('/home')
  }, [])
  return <p>Autenticando...</p>
}

export default AuthCallback