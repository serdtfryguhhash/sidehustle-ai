"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign, TrendingUp, Target, Zap,
  BookOpen, Trophy, Flame, Plus, CheckCircle2,
  Star, Award, ChevronRight,
} from "lucide-react";
import { sideHustles } from "@/data/side-hustles";
import { formatCurrency } from "@/lib/utils";

const mockUserHustles = [
  { hustle: sideHustles[0], status: "active" as const, progress: 65, totalEarned: 1250, currentStep: 3 },
  { hustle: sideHustles[6], status: "starting" as const, progress: 20, totalEarned: 0, currentStep: 1 },
];

const mockBadges = [
  { name: "First Dollar", icon: "DollarSign", earned: true, description: "Earned your first dollar" },
  { name: "Week Streak", icon: "Flame", earned: true, description: "7-day logging streak" },
  { name: "Century Club", icon: "Trophy", earned: false, description: "Earn $100 in a month" },
  { name: "Hustler", icon: "Zap", earned: false, description: "Start your first side hustle" },
];

const mockRecentActivity = [
  { type: "income", text: "Logged $150 from freelance writing", time: "2 hours ago" },
  { type: "task", text: "Completed: Set up social media profiles", time: "5 hours ago" },
  { type: "milestone", text: "Reached $1,000 total earnings!", time: "1 day ago" },
  { type: "income", text: "Logged $200 from client project", time: "2 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-1">
                Welcome back, Hustler! <span className="inline-block animate-float">&#128170;</span>
              </h1>
              <p className="text-muted-foreground">Here is your side hustle overview</p>
            </div>
            <div className="flex gap-3">
              <Link href="/income">
                <Button variant="outline" className="gap-1.5">
                  <Plus className="w-4 h-4" />
                  Log Income
                </Button>
              </Link>
              <Link href="/quiz">
                <Button className="gap-1.5">
                  <Zap className="w-4 h-4" />
                  Find New Hustle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earned", value: "$1,250", icon: DollarSign, change: "+$350 this month", color: "text-primary", bg: "bg-primary-100" },
            { label: "This Month", value: "$350", icon: TrendingUp, change: "+23% vs last month", color: "text-green-600", bg: "bg-green-100" },
            { label: "Active Hustles", value: "2", icon: Target, change: "1 starting, 1 active", color: "text-secondary", bg: "bg-secondary-100" },
            { label: "Day Streak", value: "7", icon: Flame, change: "Keep it going!", color: "text-accent-600", bg: "bg-accent-100" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="font-heading text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                  <div className="text-xs text-primary mt-1">{stat.change}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Hustles */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Side Hustles</CardTitle>
                  <Link href="/hustles">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      Add New <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUserHustles.map((uh) => (
                    <div key={uh.hustle.id} className="border border-border rounded-xl p-4 hover:border-primary/20 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-heading font-bold">{uh.hustle.name}</h3>
                            <Badge variant={uh.status === "active" ? "success" : "warning"} className="text-xs capitalize">
                              {uh.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{uh.hustle.tagline}</p>
                        </div>
                        <Link href={`/playbook/${uh.hustle.slug}`}>
                          <Button variant="outline" size="sm" className="gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            Playbook
                          </Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{uh.progress}%</span>
                      </div>
                      <Progress value={uh.progress} className="h-2 mb-3" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total earned</span>
                        <span className="font-bold text-primary">{formatCurrency(uh.totalEarned)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        activity.type === "income" ? "bg-green-100" :
                        activity.type === "task" ? "bg-blue-100" : "bg-accent-100"
                      }`}>
                        {activity.type === "income" && <DollarSign className="w-4 h-4 text-green-600" />}
                        {activity.type === "task" && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                        {activity.type === "milestone" && <Trophy className="w-4 h-4 text-accent" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {mockBadges.map((badge) => (
                    <div
                      key={badge.name}
                      className={`text-center p-3 rounded-xl border ${
                        badge.earned ? "bg-accent-50 border-accent/20" : "bg-gray-50 border-border opacity-50"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        badge.earned ? "bg-accent text-white" : "bg-gray-200 text-gray-400"
                      }`}>
                        {badge.earned ? <Star className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                      </div>
                      <div className="text-xs font-medium">{badge.name}</div>
                      <div className="text-[10px] text-muted-foreground">{badge.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Log Income", href: "/income", icon: DollarSign },
                  { label: "Take Quiz", href: "/quiz", icon: Zap },
                  { label: "Browse Tools", href: "/tools", icon: Target },
                  { label: "Community", href: "/community", icon: Star },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <action.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium flex-1">{action.label}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Upgrade CTA */}
            <Card className="bg-gradient-to-br from-primary to-secondary text-white">
              <CardContent className="p-5 text-center">
                <Zap className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <h3 className="font-heading font-bold mb-1">Upgrade to Pro</h3>
                <p className="text-xs text-white/70 mb-4">
                  Unlimited AI playbooks, advanced income tracking, and more.
                </p>
                <Link href="/pricing">
                  <Button variant="white" size="sm" className="w-full text-primary font-semibold">
                    View Plans
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
