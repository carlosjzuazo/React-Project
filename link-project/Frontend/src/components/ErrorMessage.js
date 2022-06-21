import { Link } from 'react-router-dom'

export const ErrorMessage = ({ message }) => {
  return (
    <>
      <p>{message}</p>
      <Link to={'/'}>Return to Home page</Link>
    </>
  )
}

export default ErrorMessage
