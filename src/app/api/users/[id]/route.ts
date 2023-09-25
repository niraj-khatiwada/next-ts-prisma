import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { client } from '../../../../services/DatabaseClient'

interface Props {
  params: { id: number }
}

const userIdSchema = z.object({
  id: z
    .number()
    .or(z.string())
    .transform((value) => (isNaN(+value) ? value : +value))
    .pipe(z.number()),
})

export async function GET(_: NextRequest, { params }: Props) {
  const validation = userIdSchema.safeParse(params)
  if (!validation.success) {
    return NextResponse.json({ success: false }, { status: 500 })
  }

  try {
    const response = await client.user.findFirst({
      where: { id: validation.data.id },
    })
    if (response == null) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ id: response?.id, name: response?.name })
  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({ success: false }, { status: 500 })
}

const nameSchema = z.object({
  name: z.string().min(3).max(30),
})

export async function PUT(req: NextRequest, { params }: Props) {
  const parameters = userIdSchema.safeParse(params)
  if (!parameters.success) {
    return NextResponse.json({ success: false }, { status: 500 })
  }

  const body: z.infer<typeof nameSchema> = await req.json()
  const bodySchema = nameSchema.safeParse(body)

  if (!bodySchema.success) {
    return NextResponse.json({ success: false }, { status: 500 })
  }

  try {
    const response = await client.user.update({
      data: { name: bodySchema.data.name },
      where: { id: parameters.data.id },
    })
    if (response == null) {
      return NextResponse.json({ success: false }, { status: 404 })
    }
    return NextResponse.json({ id: response?.id, name: response?.name })
  } catch (error) {
    console.log(error)
  }

  return NextResponse.json({ success: false }, { status: 500 })
}
