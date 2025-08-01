import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 })
    }

    const clientId = process.env.DISCORD_CLIENT_ID
    const clientSecret = process.env.DISCORD_CLIENT_SECRET
    const redirectUri = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/discord/callback`

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Discord credentials not configured" }, { status: 500 })
    }

    const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!tokenResponse.ok) {
      return NextResponse.json({ error: "Failed to exchange code for token" }, { status: 400 })
    }

    const tokenData = await tokenResponse.json()

    const userResponse = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 400 })
    }

    const userData = await userResponse.json()

    const response = NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        username: userData.username,
        discriminator: userData.discriminator,
        avatar: userData.avatar,
        email: userData.email,
      },
    })

    response.cookies.set("discord_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in,
    })

    response.cookies.set("user_id", userData.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in,
    })

    return response
  } catch (error) {
    console.error("Discord auth error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
