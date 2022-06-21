import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.js'

export const Authorizer = () => {
  const { user, logout } = useContext(AuthContext)

  return user
    ? (
    <p>
      Usuario conectado como: <Link to={`user/${user.id}`}>{user.name} </Link>
      <button onClick={logout()}>Log Out</button>
    </p>
      )
    : (
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/registration">Register</Link>
      </li>
      <li>
        <Link to="/">Main page</Link>
      </li>
    </ul>
      )
}

export default Authorizer
