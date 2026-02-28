import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // In production: fetch from Supabase
    // const { data } = await supabase.from('referrals').select('*').eq('referrer_id', userId);

    return NextResponse.json({
      success: true,
      data: {
        referrals: [],
        stats: {
          total_referrals: 0,
          active_subscribers: 0,
          total_earned: 0,
          conversion_rate: 0,
        },
      },
    });
  } catch (error) {
    console.error("Referral GET API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { referrerId, referredEmail } = await request.json();

    if (!referrerId || !referredEmail) {
      return NextResponse.json(
        { error: "Referrer ID and referred email are required" },
        { status: 400 }
      );
    }

    // In production: create referral record
    // await supabase.from('referrals').insert({ referrer_id: referrerId, referred_email: referredEmail, status: 'pending' });

    return NextResponse.json({
      success: true,
      data: {
        message: "Referral invitation sent",
      },
    });
  } catch (error) {
    console.error("Referral POST API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
