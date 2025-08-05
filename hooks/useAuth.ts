import { useSession, signIn, signOut } from "next-auth/react"
import { useCallback } from "react"

export function useAuth() {
  const { data: session, status } = useSession()

  const login = useCallback(async (provider: string, credentials?: { email: string; password: string }) => {
    if (provider === "credentials" && credentials) {
      return await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })
    }
    return await signIn(provider, { callbackUrl: "/" })
  }, [])

  const logout = useCallback(async () => {
    return await signOut({ callbackUrl: "/" })
  }, [])

  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  return {
    session,
    status,
    isAuthenticated,
    isLoading,
    login,
    logout,
    user: session?.user,
  }
} 