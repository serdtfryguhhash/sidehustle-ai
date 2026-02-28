import { NextRequest, NextResponse } from "next/server";
import { generateReferralCode } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); const { email, password, fullName } = body; void body.referralCode;

    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: "Email, password, and full name are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // In production: Create user with Supabase Auth
    // const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
    // if (authError) throw authError;

    // Create profile
    const newReferralCode = generateReferralCode();
    // const { error: profileError } = await supabase.from('profiles').insert({
    //   id: authData.user.id,
    //   email,
    //   full_name: fullName,
    //   referral_code: newReferralCode,
    //   referred_by: referralCode || null,
    // });

    // If referred, create referral record
    // if (referralCode) {
    //   await supabase.from('referrals').insert({ referrer_code: referralCode, referred_email: email, status: 'signed_up' });
    // }

    return NextResponse.json({
      success: true,
      data: {
        message: "Account created successfully. Please check your email to verify your account.",
        referralCode: newReferralCode,
      },
    });
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
