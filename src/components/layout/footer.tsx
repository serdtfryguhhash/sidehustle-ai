"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Twitter, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  product: [
    { label: "Side Hustles", href: "/hustles" },
    { label: "Take the Quiz", href: "/quiz" },
    { label: "AI Playbooks", href: "/dashboard" },
    { label: "Income Tracker", href: "/income" },
    { label: "Tool Marketplace", href: "/tools" },
    { label: "Pricing", href: "/pricing" },
  ],
  community: [
    { label: "Forums", href: "/community" },
    { label: "Success Stories", href: "/community?tab=success-stories" },
    { label: "Challenges", href: "/community?tab=challenges" },
    { label: "Blog", href: "/blog" },
    { label: "Newsletter", href: "#newsletter" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Affiliate Program", href: "/referrals" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center" id="newsletter">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free Weekly Newsletter</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">
              Get Side Hustle Ideas Every Week
            </h3>
            <p className="text-gray-400 mb-6">
              Join 25,000+ hustlers getting actionable ideas, strategies, and inspiration delivered to their inbox every Tuesday.
            </p>
            {subscribed ? (
              <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-primary">
                You are in! Check your inbox to confirm your subscription.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 h-12"
                  required
                />
                <Button type="submit" size="lg" className="whitespace-nowrap">
                  Subscribe Free
                </Button>
              </form>
            )}
            <p className="text-xs text-gray-500 mt-3">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-white">
                SideHustle<span className="text-primary">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered platform helping you discover, launch, and grow your perfect side hustle.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2.5">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SideHustle.ai. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with passion for hustlers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
