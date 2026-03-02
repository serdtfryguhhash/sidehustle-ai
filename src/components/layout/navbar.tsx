"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Menu,
  X,
  ChevronDown,
  DollarSign,
  BookOpen,
  Users,
  BarChart3,
  Wrench,
  PenTool,
  Sparkles,
  GitCompareArrows,
} from "lucide-react";
import { StreakBadge } from "@/components/shared/StreakBadge";

const navLinks = [
  {
    label: "Discover",
    href: "/hustles",
    icon: Sparkles,
    children: [
      { label: "Browse Side Hustles", href: "/hustles", icon: BookOpen, description: "Explore 100+ side hustle ideas" },
      { label: "Take the Quiz", href: "/quiz", icon: Zap, description: "Find your perfect match in 2 minutes" },
      { label: "Compare Hustles", href: "/compare", icon: GitCompareArrows, description: "Side-by-side hustle comparison" },
      { label: "Trending Now", href: "/hustles?filter=trending", icon: BarChart3, description: "See what is hot right now" },
    ],
  },
  { label: "Take the Quiz", href: "/quiz", icon: Zap },
  { label: "Compare", href: "/compare", icon: GitCompareArrows },
  { label: "Tools", href: "/tools", icon: Wrench },
  { label: "Community", href: "/community", icon: Users },
  { label: "Blog", href: "/blog", icon: PenTool },
  { label: "Pricing", href: "/pricing", icon: DollarSign },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              SideHustle<span className="text-primary">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-lg border border-border p-2 mt-1"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary-50 transition-colors group"
                          >
                            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors mt-0.5">
                              <child.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground">{child.label}</div>
                              <div className="text-xs text-muted-foreground">{child.description}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <StreakBadge />
            <Link href="/login">
              <Button variant="ghost" size="sm">Log In</Button>
            </Link>
            <Link href="/quiz">
              <Button size="sm" className="gap-1.5">
                <Zap className="w-4 h-4" />
                Find Your Hustle
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <React.Fragment key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                    {link.children?.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="flex items-center gap-2 pl-9 pr-3 py-2 text-sm text-gray-500 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </React.Fragment>
                ))}
                <div className="pt-3 border-t border-border space-y-2 px-3">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link href="/quiz" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full gap-1.5">
                      <Zap className="w-4 h-4" />
                      Find Your Hustle
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
