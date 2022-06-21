import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import { UserPosts } from '../components/UserPosts';
import { HookUser } from '../hooks/HookUser';
import React from 'react';

export const UserPage = () => {
  const { id } = useParams();
  const { user, loading, error } = HookUser(id);

  if (loading) return <p>Loading user...</p>;
  if (error) return <ErrorMessage message={error} />;
  return (
    <section>
      <h1>User: {user.name}</h1>
      <p>Bio: {user.bio}</p>
      <p>Registered on: {new Date(user.created_at).toLocaleString()}</p>
      <UserPosts id={user.id} />
    </section>
  );
};
