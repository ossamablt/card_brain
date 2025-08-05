"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function AuthStatusPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (session) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Authentication Status</h1>
        <div className="bg-green-100 p-4 rounded-lg mb-4">
          <p className="text-green-800">✅ Signed in as {session.user?.email}</p>
          <p className="text-green-800">Name: {session.user?.name}</p>
        </div>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Status</h1>
      <div className="bg-red-100 p-4 rounded-lg mb-4">
        <p className="text-red-800">❌ Not signed in</p>
      </div>
      <div className="space-y-2">
        <Button onClick={() => signIn("google")} className="w-full">
          Sign in with Google
        </Button>
        <Button onClick={() => signIn("github")} className="w-full">
          Sign in with GitHub
        </Button>
        <Button onClick={() => signIn("credentials")} className="w-full">
          Sign in with Credentials
        </Button>
      </div>
    </div>
  )
} 