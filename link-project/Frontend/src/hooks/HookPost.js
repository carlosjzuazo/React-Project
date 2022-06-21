import { useState, useEffect } from 'react'
import { getThisPostRequest } from '../requests'

export const HookPost = (id) => {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true)

        const data = await getThisPostRequest(id)

        setPost(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [id])

  return { post, loading, error }
}

export default HookPost
