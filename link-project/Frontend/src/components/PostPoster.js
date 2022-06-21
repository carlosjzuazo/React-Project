import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { sendPostRequest } from '../requests'
import { ErrorMessage } from './ErrorMessage'

export const PostPost = ({ addPost }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [posting, setPosting] = useState(false)
  const { token } = useContext(AuthContext)

  const handleForm = async (e) => {
    e.preventDefault()

    try {
      console.log(title, description, url)
      setPosting(true)

      const data = new FormData(e.target)
      const post = await sendPostRequest({ data, token })

      addPost(post)
      console.log(post)
    } catch (error) {
      setError(error.message)
    } finally {
      setPosting(false)
    }
  }

  return (
    <section>
      <h1>Publicar nuevo enlace:</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            type="title"
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input
            type="description"
            id="description"
            name="description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="url">Url</label>
          <input
            type="url"
            id="url"
            name="url"
            required
            onChange={(e) => setUrl(e.target.value)}
          />
        </fieldset>
        <button>Publish</button>
        {posting ? <p>Publishing post...</p> : null}
        {error ? <ErrorMessage message={error} /> : null}
      </form>
    </section>
  )
}

export default PostPost
