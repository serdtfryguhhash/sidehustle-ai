import { NextRequest, NextResponse } from "next/server";
import { PRICING_PLANS } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId } = await request.json();

    if (!priceId || !userId) {
      return NextResponse.json(
        { error: "Price ID and user ID are required" },
        { status: 400 }
      );
    }

    const plan = PRICING_PLANS.find((p) => p.stripe_price_id === priceId);
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid price ID" },
        { status: 400 }
      );
    }

    
    const origin = request.headers.get("origin") || "https://sidehustle.ai";

    // In production: Create Stripe checkout session
    // const session = await stripe.checkout.sessions.create({
    //   customer: stripeCustomerId,
    //   mode,
    //   payment_method_types: ['card'],
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   success_url: `${origin}/dashboard?payment=success`,
    //   cancel_url: `${origin}/pricing?payment=canceled`,
    //   allow_promotion_codes: true,
    //   metadata: { userId, tier: plan.tier },
    // });

    return NextResponse.json({
      success: true,
      data: {
        // url: session.url,
        url: `${origin}/dashboard?payment=success`,
        message: "Checkout session created. In production, this redirects to Stripe.",
      },
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
