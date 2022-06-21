export const getAllPostsRequest = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}`)

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

export const getThisPostRequest = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/${id}`)

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

export const registerUserRequest = async (email, password) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

export const loginUserRequest = async (email, password) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

export const getMyDataRequest = async ({ token, id }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`, {
    headers: {
      Authorization: token
    }
  })
  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

export const sendPostRequest = async ({ data, token, id }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: token
    }
  })
  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

export const deletePostRequest = async ({ id, token }) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token
    }
  })
  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

export const getUserDataRequest = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/${id}`)

  const json = await response.json()

  if (!response.ok) {
    throw new Error(json.message)
  }
  return json.data
}

/* export const getAllUserPostsRequest = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/${id}/posts`);

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }
    return json.data;
  }; */
