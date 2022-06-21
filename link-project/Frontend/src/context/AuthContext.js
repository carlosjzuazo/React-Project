import { createContext, useEffect, useState } from 'react'
import { getMyDataRequest } from '../requests'

export const AuthContext = createContext()

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    const getMyData = async () => {
      try {
        const data = await getMyDataRequest({ token })

        setUser(data)
      } catch (error) {
        logout()
      }
    }

    if (token) getMyData()
  }, [token])

  const login = (token) => {
    setToken(token)
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
