"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, X, Zap, Star, Shield, ArrowRight,
  ChevronDown, ChevronUp,
} from "lucide-react";
import { PRICING_PLANS } from "@/lib/stripe";

const faqs = [
  { q: "Can I switch plans later?", a: "Yes! You can upgrade, downgrade, or cancel your plan at any time. When you upgrade, you will be prorated for the remaining billing period." },
  { q: "Is there a free trial for Pro?", a: "Yes, Pro comes with a 7-day free trial. You will not be charged until the trial ends, and you can cancel anytime during the trial." },
  { q: "What happens if I cancel my Pro subscription?", a: "You will continue to have Pro access until the end of your billing period. After that, your account will revert to the free plan. You will not lose any data." },
  { q: "What is included in the Lifetime plan?", a: "The Lifetime plan includes everything in Pro, forever. One payment, no recurring charges. You also get all future features and updates included." },
  { q: "Do you offer refunds?", a: "Yes, we offer a 30-day money-back guarantee for both Pro and Lifetime plans. If you are not satisfied, contact us for a full refund." },
  { q: "How does the affiliate program work?", a: "Lifetime members get a 30% recurring commission for every user they refer who subscribes to Pro. You get paid monthly via PayPal or Stripe." },
];

const comparisonFeatures = [
  { feature: "AI Side Hustle Quiz", free: true, pro: true, lifetime: true },
  { feature: "Browse 100+ Side Hustles", free: true, pro: true, lifetime: true },
  { feature: "Basic Hustle Profiles", free: true, pro: true, lifetime: true },
  { feature: "Community Forum Access", free: true, pro: true, lifetime: true },
  { feature: "Weekly Newsletter", free: true, pro: true, lifetime: true },
  { feature: "Income Log Entries", free: "3/month", pro: "Unlimited", lifetime: "Unlimited" },
  { feature: "AI Playbooks", free: "1 preview", pro: "Unlimited", lifetime: "Unlimited" },
  { feature: "Income Analytics & Charts", free: false, pro: true, lifetime: true },
  { feature: "Priority Support", free: false, pro: true, lifetime: true },
  { feature: "Exclusive Challenges", free: false, pro: true, lifetime: true },
  { feature: "Tool Recommendations", free: false, pro: true, lifetime: true },
  { feature: "Monthly Expert Webinars", free: false, pro: true, lifetime: true },
  { feature: "Export Data & Reports", free: false, pro: true, lifetime: true },
  { feature: "Custom AI Coaching", free: false, pro: false, lifetime: true },
  { feature: "Early Access Features", free: false, pro: false, lifetime: true },
  { feature: "30% Affiliate Commission", free: false, pro: false, lifetime: true },
  { feature: "Lifetime Badge", free: false, pro: false, lifetime: true },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4">Simple Pricing</Badge>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Start Free, <span className="text-primary">Scale When Ready</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to discover, launch, and grow your side hustle. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="grid md:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={plan.highlighted ? "md:-mt-4" : ""}
            >
              <Card className={`h-full relative ${plan.highlighted ? "border-primary shadow-xl" : "shadow-lg"}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white shadow-md px-4 py-1">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-heading text-5xl font-extrabold">${plan.price}</span>
                    {plan.billing_period && <span className="text-muted-foreground text-lg">/{plan.billing_period}</span>}
                    {plan.tier === "lifetime" && <span className="text-muted-foreground text-sm">one-time</span>}
                  </div>
                  {plan.tier === "free" && <p className="text-sm text-muted-foreground mb-6">Free forever, no credit card</p>}
                  {plan.tier === "pro" && <p className="text-sm text-muted-foreground mb-6">7-day free trial included</p>}
                  {plan.tier === "lifetime" && <p className="text-sm text-muted-foreground mb-6">Pay once, own forever</p>}

                  <Button className="w-full mb-6 h-12 text-base" variant={plan.highlighted ? "default" : "outline"}>
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="font-heading text-2xl font-bold text-center mb-8">Compare Plans</h2>
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-medium text-sm">Feature</th>
                  <th className="text-center p-4 font-medium text-sm">Free</th>
                  <th className="text-center p-4 font-medium text-sm bg-primary-50">Pro</th>
                  <th className="text-center p-4 font-medium text-sm">Lifetime</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-0">
                    <td className="p-4 text-sm">{row.feature}</td>
                    {[row.free, row.pro, row.lifetime].map((val, i) => (
                      <td key={i} className={`p-4 text-center ${i === 1 ? "bg-primary-50/50" : ""}`}>
                        {val === true ? (
                          <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                        ) : val === false ? (
                          <X className="w-4 h-4 text-gray-300 mx-auto" />
                        ) : (
                          <span className="text-sm font-medium">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="font-heading text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} className="overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between"
              >
                <span className="font-medium text-sm">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              {openFaq === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5">
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <Shield className="w-12 h-12 mx-auto mb-4 text-white/80" />
          <h2 className="font-heading text-3xl font-bold mb-3">30-Day Money-Back Guarantee</h2>
          <p className="text-white/80 mb-6">Try Pro or Lifetime risk-free. If you are not 100% satisfied, we will refund your payment. No questions asked.</p>
          <Button size="xl" variant="white" className="text-primary font-bold gap-1.5">
            <Zap className="w-5 h-5" />
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
