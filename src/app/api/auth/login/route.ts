import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // In production: Sign in with Supabase Auth
    // const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    // if (error) throw error;

    return NextResponse.json({
      success: true,
      data: {
        message: "Logged in successfully",
        // user: data.user,
        // session: data.session,
      },
    });
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
}
