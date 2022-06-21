import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext, useState } from 'react'
import { deletePostRequest } from '../requests'

export const Post = ({ post, erasePost }) => {
  const { user, token } = useContext(AuthContext)
  const [error, setError] = useState('')
  const goPath = useNavigate()
  const deletePost = async (id) => {
    try {
      await deletePostRequest({ id, token })

      if (erasePost) {
        erasePost(id)
      } else {
        goPath(`user/${id}`)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>{post.url ? <a href={post.url}>{post.url}</a> : null}</p>
      <p>
        Posted by {user.name} on{' '}
        <Link to={`/post/${post.user_id}`}>
          {new Date(post.created_at).toLocaleString()}
        </Link>
      </p>
      {user && user.id === post.user_id
        ? (
        <p>
          <button
            onClick={() => {
              if (window.confirm('Do you really want to delete this post?')) { deletePost(post.id) }
            }}
          >
            Delete Post
          </button>
          {error ? <p>{error}</p> : null}
        </p>
          )
        : null}
    </article>
  )
}
