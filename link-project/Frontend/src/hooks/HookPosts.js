import { useState, useEffect } from 'react'
import { getAllPostsRequest } from '../requests'

export const HookPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)

        const data = await getAllPostsRequest()

        setPosts(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  const addPost = (post) => {
    setPosts([post, ...posts])
  }

  const erasePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return { posts, loading, error, addPost, erasePost }
}

export default HookPosts
