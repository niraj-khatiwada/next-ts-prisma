import React from 'react'
import { useSession } from 'next-auth/react'

import Register from './Register'

interface User {
  id: number
  name: string
  email: string
}

async function getUsers(): Promise<User[]> {
  const response = await fetch('http://localhost:3000/api/users', {
    // cache: 'no-store',
    next: { revalidate: 10 },
  })
  const users: User[] = await response.json()
  return users
}

async function UserList() {
  const { data, status } = useSession()
  console.log('---SESSION CLIENT----', data, status)

  const users = await getUsers()
  return (
    <>
      {Array.isArray(users)
        ? users.map((user) => (
            <div key={user.id}>
              <p>ID: {user.id}</p>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              -------------------------
            </div>
          ))
        : null}
      <Register />
    </>
  )
}

export default UserList
