import NextAuth from 'next-auth/next'

import { options } from './auth-options'

const handlers = NextAuth(options)

export { handlers as GET, handlers as POST }
