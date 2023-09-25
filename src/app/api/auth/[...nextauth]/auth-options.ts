import { RequestInternal, User, AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

import { client } from '@/services/DatabaseClient'

const validationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        _: Record<'email' | 'password', string> | undefined,
        req: Pick<RequestInternal, 'body' | 'query' | 'headers' | 'method'>
      ): Promise<User | null> {
        const body = req.body as z.infer<typeof validationSchema>
        const validation = validationSchema.safeParse(body)
        if (!validation.success) {
          return null
        }
        const user = await client.user.findFirst({
          where: { email: validation.data.email },
        })
        if (user == null) return null
        return { ...user, id: user.id?.toString() }
      },
    }),
  ],
  pages: {
    signIn: '/user/1',
  },
}
