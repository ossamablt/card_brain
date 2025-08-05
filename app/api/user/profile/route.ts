import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server"

// This is a protected API route that requires authentication
export async function GET(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this resource." },
      { status: 401 }
    )
  }

  // Return user profile data
  return NextResponse.json({
    user: {
      id: session.user?.id,
      email: session.user?.email,
      name: session.user?.name,
      image: session.user?.image,
    },
    message: "This is protected content. You can access this because you are signed in.",
  })
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json(
      { error: "You must be signed in to access this resource." },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    
    // Here you would typically update the user profile in your database
    // For now, we'll just return the updated data
    
    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: session.user?.id,
        email: session.user?.email,
        name: body.name || session.user?.name,
        image: body.image || session.user?.image,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
} 