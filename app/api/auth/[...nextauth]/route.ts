import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    accessToken?: string
    userId?: string
    isNewUser?: boolean
  }
  
  interface User {
    isNewUser?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    userId?: string
    isNewUser?: boolean
  }
}

// Simple in-memory storage for demo purposes
// In production, use a proper database
const users = new Map()

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
        isSignUp: { label: "Is Sign Up", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const email = credentials.email
        const password = credentials.password
        const username = credentials.username
        const isSignUp = credentials.isSignUp === "true"

        if (isSignUp) {
          // Handle sign up
          if (users.has(email)) {
            throw new Error("User already exists")
          }

          // Create new user (in production, hash the password)
          const newUser = {
            id: Date.now().toString(),
            email,
            name: username || email.split('@')[0],
            password, // In production, hash this
            isNewUser: true
          }

          users.set(email, newUser)
          return newUser
        } else {
          // Handle sign in
          const user = users.get(email)
          if (!user || user.password !== password) {
            throw new Error("Invalid credentials")
          }

          // Mark as returning user
          user.isNewUser = false
          return user
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.userId = user.id
        token.isNewUser = user.isNewUser
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      session.userId = token.userId
      session.isNewUser = token.isNewUser
      return session
    },
    async signIn({ user, account, profile }) {
      // Mark OAuth users as new users (they'll need onboarding)
      if (account?.provider !== "credentials") {
        user.isNewUser = true
      }
      return true
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST } 