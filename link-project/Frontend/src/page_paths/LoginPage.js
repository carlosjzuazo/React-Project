import { loginUserRequest } from '../requests'
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ErrorMessage } from '../components/ErrorMessage'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const { login } = useContext(AuthContext)

  const handleForm = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const data = loginUserRequest({ email, password })

      login(data)
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <section>
      <h1>Login yourself</h1>
      <form onSubmit={handleForm()}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pass1">Password</label>
          <input
            type="pass1"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <button>Login</button>
        {error ? <ErrorMessage message={error} /> : null}
      </form>
    </section>
  )
}
