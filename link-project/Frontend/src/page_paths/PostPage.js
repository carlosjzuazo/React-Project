import { useParams } from 'react-router-dom'
import { ErrorMessage } from '../components/ErrorMessage'
import { Post } from '../components/Post'
import { HookPost } from '../hooks/HookPost'

export const PostPage = () => {
  const { id } = useParams()

  const { post, loading, error } = HookPost(id)

  if (loading) return <p>Cargando publicación...</p>
  if (error) return <ErrorMessage message={error} />

  return (
    <section>
      <h1>Publicación</h1>
      <Post post={post}></Post>
    </section>
  )
}
