import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, register as apiRegister } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,  setUser]  = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) setUser(JSON.parse(stored))
    setReady(true)
  }, [])

  const login = async (data) => { const res = await apiLogin(data); _persist(res.data) }
  const register = async (data) => { const res = await apiRegister(data); _persist(res.data) }
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }
  const _persist = ({ token, username, email, expiresAt }) => {
    localStorage.setItem('token', token)
    const u = { username, email, expiresAt }
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, ready }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
