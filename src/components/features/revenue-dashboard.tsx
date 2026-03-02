"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3, TrendingUp, PieChart, DollarSign, Sparkles,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart as RechartsPie, Pie, Cell,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

const monthlyData = [
  { month: "Sep", amount: 450 },
  { month: "Oct", amount: 780 },
  { month: "Nov", amount: 1100 },
  { month: "Dec", amount: 950 },
  { month: "Jan", amount: 1400 },
  { month: "Feb", amount: 1850 },
];

const weeklyData = [
  { week: "W1", amount: 320 },
  { week: "W2", amount: 480 },
  { week: "W3", amount: 550 },
  { week: "W4", amount: 500 },
];

const hustleBreakdown = [
  { name: "Freelance Writing", value: 3200, color: "#059669" },
  { name: "Social Media Mgmt", value: 2100, color: "#0D9488" },
  { name: "Consulting", value: 1230, color: "#7C3AED" },
];

const projectionData = [
  { month: "Feb", actual: 1850, projected: 1850 },
  { month: "Mar", actual: null, projected: 2100 },
  { month: "Apr", actual: null, projected: 2400 },
  { month: "May", actual: null, projected: 2750 },
  { month: "Jun", actual: null, projected: 3100 },
  { month: "Jul", actual: null, projected: 3500 },
  { month: "Aug", actual: null, projected: 4000 },
  { month: "Sep", actual: null, projected: 4500 },
  { month: "Oct", actual: null, projected: 5000 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tooltipFormatter = (value: any) => [`$${value}`, "Income"];

export function RevenueDashboard() {
  const [activeTab, setActiveTab] = useState<"monthly" | "weekly" | "hustle" | "projection">("monthly");
  const totalEarned = monthlyData.reduce((acc, m) => acc + m.amount, 0);
  const bestMonth = Math.max(...monthlyData.map((m) => m.amount));
  const currentMonth = monthlyData[monthlyData.length - 1].amount;

  const tabs = [
    { id: "monthly" as const, label: "Monthly", icon: BarChart3 },
    { id: "weekly" as const, label: "Weekly", icon: TrendingUp },
    { id: "hustle" as const, label: "By Hustle", icon: PieChart },
    { id: "projection" as const, label: "Projection", icon: Sparkles },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Revenue Dashboard
          </CardTitle>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          <div className="bg-primary-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-primary">{formatCurrency(totalEarned)}</div>
            <div className="text-[10px] text-muted-foreground">All-Time</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-600">{formatCurrency(currentMonth)}</div>
            <div className="text-[10px] text-muted-foreground">This Month</div>
          </div>
          <div className="bg-accent-50 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-accent-600">{formatCurrency(bestMonth)}</div>
            <div className="text-[10px] text-muted-foreground">Best Month</div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1 mt-3 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="h-64"
        >
          {activeTab === "monthly" && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={tooltipFormatter} />
                <Bar dataKey="amount" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeTab === "weekly" && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={tooltipFormatter} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#059669"
                  strokeWidth={2}
                  dot={{ fill: "#059669", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}

          {activeTab === "hustle" && (
            <div className="flex items-center gap-4 h-full">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={hustleBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${(name ?? "").split(" ")[0]} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {hustleBreakdown.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={tooltipFormatter} />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-3">
                {hustleBreakdown.map((hustle) => (
                  <div key={hustle.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hustle.color }} />
                    <div className="flex-1">
                      <div className="text-xs font-medium">{hustle.name}</div>
                      <div className="text-xs text-muted-foreground">{formatCurrency(hustle.value)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "projection" && (
            <div>
              <div className="flex items-center gap-2 mb-3 p-2 bg-primary-50 rounded-lg">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-medium">
                  At this rate, you will hit $5K/mo by October
                </span>
              </div>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
                    <Tooltip formatter={tooltipFormatter} />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#059669"
                      strokeWidth={2}
                      dot={{ fill: "#059669", r: 4 }}
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="projected"
                      stroke="#059669"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "#059669", r: 3, strokeDasharray: "0" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 mt-2 justify-center">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 bg-primary" />
                  <span className="text-[10px] text-muted-foreground">Actual</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-0.5 bg-primary border-dashed" style={{ borderTop: "2px dashed #059669", height: 0 }} />
                  <span className="text-[10px] text-muted-foreground">Projected</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
