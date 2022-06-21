import { Post } from './Post'

export const PostsList = ({ posts, erasePost }) => {
  return posts.length
    ? (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Post post={post} erasePost={erasePost} />
        </li>
      ))}
    </ul>
      )
    : (
    <p>Unfortunatedly there are not posts yet.</p>
      )
}
