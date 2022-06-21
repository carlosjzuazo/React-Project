import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <section>
      <h1>Page not found.</h1>
      <Link to="/"> Return to Home Page </Link>
    </section>
  )
}
