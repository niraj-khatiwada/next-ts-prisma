import Link from 'next/link'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

import { options } from './api/auth/[...nextauth]/auth-options'
import Me from '../../public/DALL·E-2022-12-12-201621-extend-the-image-GTvNIY2uI-transformed.png'

export default async function Home() {
  const session = await getServerSession(options)

  console.log('---', session)

  return (
    <>
      <div className="bg-emerald-50 grid place-content-center ">
        <Link href="/user/1">Go to user</Link>
        <Link href="/api/auth/signout">Signout</Link>
      </div>
      <Image
        alt="car"
        src={Me}
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
      />
    </>
  )
}

// export const revalidate = 400 // revalidate every 400 seconds
