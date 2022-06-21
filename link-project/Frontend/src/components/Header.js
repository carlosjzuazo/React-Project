import { Authorizer } from './Authorizer'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
      <Link to="/">
        <h1>Link Project</h1>
      </Link>
      <nav>
        <Authorizer />
      </nav>
    </header>
  )
}
