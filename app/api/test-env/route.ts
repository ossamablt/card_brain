import { NextResponse } from "next/server"

export async function GET() {
  const envCheck = {
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasGithubId: !!process.env.GITHUB_ID,
    hasGithubSecret: !!process.env.GITHUB_SECRET,
  }

  return NextResponse.json({
    message: "Environment variables check",
    envCheck,
    nodeEnv: process.env.NODE_ENV,
  })
} 