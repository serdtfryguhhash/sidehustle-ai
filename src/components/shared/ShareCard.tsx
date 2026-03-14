"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Zap, Flame, Star, Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ShareCardProps {
  monthlyIncome?: number;
  hustleName?: string;
  streakCount?: number;
  level?: string;
  monthlyData?: { month: string; amount: number }[];
}

export function ShareCard({
  monthlyIncome = 1850,
  hustleName = "Freelance Writing",
  streakCount = 12,
  level = "Hustler",
  monthlyData = [
    { month: "Sep", amount: 450 },
    { month: "Oct", amount: 780 },
    { month: "Nov", amount: 1100 },
    { month: "Dec", amount: 950 },
    { month: "Jan", amount: 1400 },
    { month: "Feb", amount: 1850 },
  ],
}: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const maxAmount = Math.max(...monthlyData.map((m) => m.amount));

  const handleCopy = useCallback(async () => {
    const text = `I made ${formatCurrency(monthlyIncome)} this month from ${hustleName} on SideHustle AI! ${streakCount}-day streak and ${level} level. Start your hustle at sidehustle.ai`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [monthlyIncome, hustleName, streakCount, level]);

  return (
    <div className="space-y-4">
      {/* The Card */}
      <Card className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-0 overflow-hidden">
        <CardContent className="p-6 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-hero-pattern" />

          {/* Header */}
          <div className="flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-sm">
                SideHustle<span className="text-primary">.ai</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs">
                <Flame className="w-3 h-3" />
                {streakCount}
              </div>
              <Badge className="bg-primary/20 text-primary border-0 text-xs">
                <Star className="w-3 h-3 mr-1" />
                {level}
              </Badge>
            </div>
          </div>

          {/* Main Income */}
          <div className="text-center mb-4 relative">
            <div className="text-xs text-gray-400 mb-1">I made</div>
            <motion.div
              className="font-heading text-4xl font-bold text-primary"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {formatCurrency(monthlyIncome)}
            </motion.div>
            <div className="text-xs text-gray-400 mt-1">
              this month from <span className="text-white font-medium">{hustleName}</span>
            </div>
          </div>

          {/* Mini Bar Chart */}
          <div className="flex items-end gap-1.5 h-16 mb-3 px-4 relative">
            {monthlyData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full bg-gradient-to-t from-primary/60 to-primary rounded-t"
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.amount / maxAmount) * 100}%` }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
                <span className="text-[9px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-center text-[10px] text-gray-500 relative">
            sidehustle.ai - Discover your perfect side hustle
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 gap-1.5" onClick={handleCopy}>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy to Clipboard"}
        </Button>
      </div>
    </div>
  );
}
