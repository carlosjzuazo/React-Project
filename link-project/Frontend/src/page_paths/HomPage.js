import { HookPosts } from '../hooks/HookPosts'
// import { Link } from "react-router-dom";
import { PostsList } from '../components/PostsList'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { PostPost } from '../components/PostPoster'
import { ErrorMessage } from '../components/ErrorMessage'

export const HomePage = () => {
  const { posts, loading, error, addPost } = HookPosts()
  const { user } = useContext(AuthContext)
  console.log(posts)

  if (loading) return <p>Cargando últimas publicaciones...</p>
  if (error) return <ErrorMessage message={error} />

  return (
    <section>
      {user ? <PostPost addPost={addPost()} /> : null}
      <h1>Ùltimas publicaciones</h1>
      <PostsList posts={posts}></PostsList>
    </section>
  )
}
