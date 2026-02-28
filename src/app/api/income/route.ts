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
    // const { data } = await supabase.from('income_logs').select('*').eq('user_id', userId).order('date', { ascending: false });

    return NextResponse.json({
      success: true,
      data: {
        logs: [],
        stats: {
          total_earned: 0,
          this_month: 0,
          last_month: 0,
          best_month: 0,
          current_streak: 0,
        },
      },
    });
  } catch (error) {
    console.error("Income API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, hustleName, amount, source, notes, date } = await request.json();

    if (!userId || !hustleName || !amount || !source || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production: insert into Supabase
    // const { data, error } = await supabase.from('income_logs').insert({ user_id: userId, hustle_id: hustleId, hustle_name: hustleName, amount, source, notes, date });

    return NextResponse.json({
      success: true,
      data: {
        id: crypto.randomUUID(),
        userId,
        hustleName,
        amount,
        source,
        notes,
        date,
      },
    });
  } catch (error) {
    console.error("Income POST API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
