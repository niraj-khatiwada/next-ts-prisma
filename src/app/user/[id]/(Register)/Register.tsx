'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

interface FormFields {
  email: string
  password: string
}

function Register() {
  const router = useRouter()

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    const formData = new FormData(evt.currentTarget)
    const data = {
      email: '',
      password: '',
    }
    for (let [key, value] of formData.entries()) {
      if (key in data) {
        data[key as keyof FormFields] = value as string
      }
    }

    // await fetch('http://localhost:3000/api/users', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: data.email, name: data.password }),
    // })

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/',
    })

    // router.refresh()
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          className="border block my-2"
          name="email"
          type="email"
          required
        />
        <input
          className="border block my-2"
          name="password"
          type="password"
          required
        />
        <button className="btn border p-3">Create</button>
      </div>
    </form>
  )
}

export default Register
