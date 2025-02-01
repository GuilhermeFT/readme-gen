import NextAuth, { type DefaultSession } from 'next-auth'

import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  jwt: {
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  callbacks: {
    jwt({ token, account }) {
      if (account?.provider === 'github') {
        return { ...token, accessToken: account.access_token }
      }

      return token
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      return session
    },
  },
})
