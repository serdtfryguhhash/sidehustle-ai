"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users, DollarSign, Link2, Copy, CheckCircle2, Share2,
  TrendingUp, Gift, Twitter, Mail,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const mockReferrals = [
  { email: "sarah@example.com", status: "subscribed" as const, commission: 4.50, date: "2026-02-20" },
  { email: "mike@example.com", status: "signed_up" as const, commission: 0, date: "2026-02-18" },
  { email: "lisa@example.com", status: "subscribed" as const, commission: 4.50, date: "2026-02-10" },
  { email: "john@example.com", status: "pending" as const, commission: 0, date: "2026-02-05" },
];

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "SH-ABC123";
  const referralLink = `https://sidehustle.ai/ref/${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-12 h-12 mx-auto mb-4 text-white/80" />
          <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-3">Affiliate Program</h1>
          <p className="text-white/80 text-lg mb-6">Earn 30% recurring commission for every Pro subscriber you refer.</p>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-lg mx-auto">
            <div className="text-6xl font-extrabold text-accent mb-2">30%</div>
            <div className="text-white/60 text-sm">Recurring Commission</div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Referral Link */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="font-heading font-bold text-lg mb-4">Your Referral Link</h2>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input value={referralLink} readOnly className="pl-10 pr-4 font-mono text-sm" />
              </div>
              <Button onClick={copyToClipboard} variant={copied ? "default" : "outline"} className="gap-1.5 shrink-0">
                {copied ? <><CheckCircle2 className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
              </Button>
            </div>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm" className="gap-1.5"><Twitter className="w-3.5 h-3.5" />Share on Twitter</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><Mail className="w-3.5 h-3.5" />Share via Email</Button>
              <Button variant="outline" size="sm" className="gap-1.5"><Share2 className="w-3.5 h-3.5" />More Options</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Referrals", value: "4", icon: Users },
            { label: "Active Subscribers", value: "2", icon: CheckCircle2 },
            { label: "Total Earned", value: "$9.00", icon: DollarSign },
            { label: "Conversion Rate", value: "50%", icon: TrendingUp },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5 text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-heading text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Referrals Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockReferrals.map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{ref.email}</div>
                      <div className="text-xs text-muted-foreground">{ref.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={ref.status === "subscribed" ? "success" : ref.status === "signed_up" ? "info" : "outline"} className="text-xs capitalize">
                      {ref.status.replace("_", " ")}
                    </Badge>
                    {ref.commission > 0 && (
                      <span className="text-sm font-bold text-primary">{formatCurrency(ref.commission)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Share Your Link", description: "Share your unique referral link with friends, followers, and anyone who could benefit from SideHustle.ai." },
                { step: "2", title: "They Subscribe", description: "When someone clicks your link and subscribes to Pro ($14.99/month), you earn a 30% commission." },
                { step: "3", title: "Get Paid Monthly", description: "You earn $4.50/month for every active Pro subscriber you referred. Payments are made monthly via PayPal." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                  <h3 className="font-heading font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
