import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // In production: Add to ConvertKit
    // const response = await fetch('https://api.convertkit.com/v3/forms/{FORM_ID}/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     api_key: process.env.CONVERTKIT_API_KEY,
    //     email,
    //     first_name: firstName,
    //     tags: [source || 'website'],
    //   }),
    // });

    // Also save to Supabase
    // await supabase.from('newsletter_subs').insert({ email, first_name: firstName, source: source || 'website' });

    // In production: Send welcome email via Resend
    // await resend.emails.send({
    //   from: 'SideHustle.ai <hello@sidehustle.ai>',
    //   to: email,
    //   subject: 'Welcome to SideHustle.ai!',
    //   html: welcomeEmailTemplate(firstName),
    // });

    return NextResponse.json({
      success: true,
      data: {
        message: "Successfully subscribed to the newsletter!",
      },
    });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
