import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { customerId } = await request.json();

    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const origin = request.headers.get("origin") || "https://sidehustle.ai";

    // In production: Create Stripe billing portal session
    // const session = await stripe.billingPortal.sessions.create({
    //   customer: customerId,
    //   return_url: `${origin}/settings`,
    // });

    return NextResponse.json({
      success: true,
      data: {
        url: `${origin}/settings`,
        message: "Portal session created. In production, this redirects to Stripe billing portal.",
      },
    });
  } catch (error) {
    console.error("Stripe portal error:", error);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
