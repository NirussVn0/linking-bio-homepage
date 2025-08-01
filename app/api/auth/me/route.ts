import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("discord_token")?.value
    const userId = request.cookies.get("user_id")?.value

    if (!token || !userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userData = await userResponse.json()

    return NextResponse.json({
      user: {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        email: userData.email,
      },
    })
  } catch (error) {
    console.error("Auth me error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
