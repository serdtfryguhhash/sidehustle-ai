"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign, TrendingUp, Plus,
  BarChart3, PieChart, ArrowUpRight, Target, Flame, X,
} from "lucide-react";
import { formatCurrencyDetailed } from "@/lib/utils";

const mockMonthlyData = [
  { month: "Sep", amount: 450 },
  { month: "Oct", amount: 780 },
  { month: "Nov", amount: 1100 },
  { month: "Dec", amount: 950 },
  { month: "Jan", amount: 1400 },
  { month: "Feb", amount: 1850 },
];

const mockIncomeLogs = [
  { id: "1", hustle_name: "Freelance Writing", amount: 350, source: "Blog post for TechCo", date: "2026-02-25", notes: "Monthly retainer payment" },
  { id: "2", hustle_name: "Freelance Writing", amount: 200, source: "Copywriting project", date: "2026-02-20", notes: "Landing page copy" },
  { id: "3", hustle_name: "Social Media Management", amount: 500, source: "Monthly retainer - ABC Corp", date: "2026-02-15", notes: "" },
  { id: "4", hustle_name: "Freelance Writing", amount: 150, source: "Article for StartupBlog", date: "2026-02-10", notes: "Guest post" },
  { id: "5", hustle_name: "Social Media Management", amount: 250, source: "Ad campaign bonus", date: "2026-02-05", notes: "Performance bonus" },
  { id: "6", hustle_name: "Freelance Writing", amount: 400, source: "eBook ghostwriting", date: "2026-01-28", notes: "First half payment" },
];

export default function IncomePage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    hustle_name: "",
    amount: "",
    source: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const thisMonth = 1850;
  const lastMonth = 1400;
  const totalEarned = mockMonthlyData.reduce((acc, m) => acc + m.amount, 0);
  const monthlyChange = ((thisMonth - lastMonth) / lastMonth * 100).toFixed(0);
  const maxAmount = Math.max(...mockMonthlyData.map((m) => m.amount));

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Income Tracker</h1>
              <p className="text-muted-foreground">Track your side hustle earnings and watch your wealth grow</p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="gap-1.5">
              <Plus className="w-4 h-4" />
              Log Income
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Earned", value: formatCurrencyDetailed(totalEarned), icon: DollarSign, color: "text-primary", bg: "bg-primary-100" },
            { label: "This Month", value: formatCurrencyDetailed(thisMonth), icon: TrendingUp, color: "text-green-600", bg: "bg-green-100", sub: `+${monthlyChange}% vs last month` },
            { label: "Best Month", value: formatCurrencyDetailed(thisMonth), icon: Target, color: "text-accent-600", bg: "bg-accent-100", sub: "February 2026" },
            { label: "Day Streak", value: "12", icon: Flame, color: "text-orange-600", bg: "bg-orange-100", sub: "Keep it going!" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card>
                <CardContent className="p-5">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="font-heading text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                  {stat.sub && <div className="text-xs text-primary mt-1">{stat.sub}</div>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Monthly Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-3 h-48">
                  {mockMonthlyData.map((month) => (
                    <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-medium text-foreground">${month.amount}</span>
                      <motion.div
                        className="w-full bg-gradient-to-t from-primary to-primary-400 rounded-t-lg"
                        initial={{ height: 0 }}
                        animate={{ height: `${(month.amount / maxAmount) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                      <span className="text-xs text-muted-foreground">{month.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Income Log */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Income History</CardTitle>
                  <Badge variant="outline">{mockIncomeLogs.length} entries</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockIncomeLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">{log.source}</div>
                          <div className="text-xs text-muted-foreground">{log.hustle_name} &middot; {log.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">+{formatCurrencyDetailed(log.amount)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* By Hustle Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  By Side Hustle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Freelance Writing", amount: 1100, pct: 59, color: "bg-primary" },
                    { name: "Social Media Mgmt", amount: 750, pct: 41, color: "bg-secondary" },
                  ].map((hustle) => (
                    <div key={hustle.name}>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="font-medium">{hustle.name}</span>
                        <span className="text-muted-foreground">{hustle.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${hustle.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${hustle.pct}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{formatCurrencyDetailed(hustle.amount)} this month</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card>
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { label: "First Dollar", achieved: true },
                    { label: "$100 Earned", achieved: true },
                    { label: "$500 Earned", achieved: true },
                    { label: "$1,000 Earned", achieved: true },
                    { label: "$5,000 Earned", achieved: false },
                    { label: "$10,000 Earned", achieved: false },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        m.achieved ? "bg-primary text-white" : "bg-gray-200"
                      }`}>
                        {m.achieved && <ArrowUpRight className="w-3 h-3" />}
                      </div>
                      <span className={`text-sm ${m.achieved ? "font-medium" : "text-muted-foreground"}`}>{m.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Income Modal */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold">Log Income</h2>
                <button onClick={() => setShowAddForm(false)}>
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowAddForm(false); }}>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Side Hustle</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm" value={newEntry.hustle_name} onChange={(e) => setNewEntry({ ...newEntry, hustle_name: e.target.value })}>
                    <option value="">Select a hustle...</option>
                    <option value="Freelance Writing">Freelance Writing</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Amount ($)</label>
                  <Input type="number" placeholder="0.00" step="0.01" min="0" value={newEntry.amount} onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Source</label>
                  <Input placeholder="e.g., Client project, sale, etc." value={newEntry.source} onChange={(e) => setNewEntry({ ...newEntry, source: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Date</label>
                  <Input type="date" value={newEntry.date} onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Notes (optional)</label>
                  <Textarea placeholder="Any additional details..." value={newEntry.notes} onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })} />
                </div>
                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1 gap-1.5">
                    <Plus className="w-4 h-4" />
                    Log Income
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </section>
    </div>
  );
}
