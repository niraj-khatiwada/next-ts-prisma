'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
// import { Metadata } from 'next'

import UserList from './(Register)/UserList'
import ErrorBoundary from '@/components/ErrorBoundary'

interface UserProps {
  params: { id: string }
}

// only for server components
// Return a list of `params` to populate the [id] dynamic segment
// Usually you want to do this to your blog posts whose slug(id) never(rarely) changes
// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     id: post.id,
//   }))
// }

function User({ params: { id } }: UserProps) {
  const router = useRouter()

  return (
    <SessionProvider>
      <ErrorBoundary>
        <UserList />
      </ErrorBoundary>
      -------------
      <div>User {id}</div>
      <button
        className="btn"
        onClick={function () {
          router.push('/')
        }}
      >
        Go back
      </button>
    </SessionProvider>
  )
}

// export const metadata: Metadata = {
//   title: 'Code For Real',
//   description: 'Follow',

//   openGraph: {
//     // images,
//   },
// }

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: 'Code For Real',
//   }
// }

export default User
