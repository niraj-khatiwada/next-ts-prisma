import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getToken } from 'next-auth/jwt'

import { client } from '../../../services/DatabaseClient'

const User = z.object({
  name: z.string(),
  email: z.string().email(),
})

export async function GET(req: NextRequest) {
  const users = await client.user.findMany()

  const token = await getToken({ req })
  console.log('--JWT--', token)

  return NextResponse.json(users)
}

export async function POST(req: NextRequest) {
  const body: Awaited<Promise<z.infer<typeof User>>> = await req.json()

  const { success: isValid } = User.safeParse(body)

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid body' })
  }

  try {
    const response = await client.user.create({
      data: { name: body.name, email: body.email },
    })
    return NextResponse.json({ response })
  } catch (error: any) {
    console.log(error)
  }
  return NextResponse.json({ success: false })
}
