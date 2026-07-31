import { useContext } from 'react'
import { AuthContext } from '../auth.context.jsx'
import { register, login, logout, getMe } from '../../services/auth.api.js'

export const useAuth = () => {
  const { user, loading, setLoading, setUser } = useContext(AuthContext)

  const handleLogin = async (email, password) => {
    setLoading(true)
    try {
      const response = await login({ email, password })
    {
        //   data: { user: {...}, token: "..." },   // ← what YOUR backend actually sent
        //   status: 200,
        //   statusText: "OK",
        //   headers: {...},
        //   config: {...}
    }
      setUser(response.data.user)
      return response.data.user
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (username, email, password) => {
    setLoading(true)
    try {
      const response = await register({ username, email, password })
      setUser(response.data.user)
      return response.data.user
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

 
  return { user, loading, handleLogin, handleRegister, handleLogout}
}