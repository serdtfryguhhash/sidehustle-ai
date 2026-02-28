import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
  typescript: true,
});

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    tier: "free" as const,
    price: 0,
    billing_period: undefined,
    stripe_price_id: "",
    highlighted: false,
    cta: "Get Started Free",
    features: [
      "AI Side Hustle Quiz",
      "Browse 100+ Side Hustles",
      "Basic Hustle Profiles",
      "Community Forum Access",
      "Weekly Newsletter",
      "3 Income Log Entries/Month",
      "1 AI Playbook Preview",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tier: "pro" as const,
    price: 14.99,
    billing_period: "month",
    stripe_price_id: process.env.STRIPE_PRO_PRICE_ID || "price_pro_monthly",
    highlighted: true,
    cta: "Start Pro Trial",
    features: [
      "Everything in Free",
      "Unlimited AI Playbooks",
      "Personalized 30-Day Action Plans",
      "Advanced Income Tracking",
      "Income Analytics & Charts",
      "Priority Community Support",
      "Exclusive Pro Challenges",
      "Affiliate Tool Recommendations",
      "Monthly Expert Webinars",
      "Export Data & Reports",
    ],
  },
  {
    id: "lifetime",
    name: "Lifetime",
    tier: "lifetime" as const,
    price: 99,
    billing_period: undefined,
    stripe_price_id: process.env.STRIPE_LIFETIME_PRICE_ID || "price_lifetime",
    highlighted: false,
    cta: "Get Lifetime Access",
    features: [
      "Everything in Pro, Forever",
      "One-Time Payment",
      "All Future Features Included",
      "Lifetime Community Access",
      "Early Access to New Hustles",
      "Direct Chat Support",
      "Custom AI Coaching Sessions",
      "Exclusive Lifetime Badge",
      "Founding Member Perks",
      "30% Affiliate Commission",
    ],
  },
];

export async function createCheckoutSession(
  priceId: string,
  customerId: string,
  mode: "subscription" | "payment",
  successUrl: string,
  cancelUrl: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  });
  return session;
}

export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  return session;
}
