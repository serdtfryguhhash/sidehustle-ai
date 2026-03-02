"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, DollarSign, Flame, Star, TrendingUp, Rocket, Crown } from "lucide-react";
import { getGamification, BADGE_DEFINITIONS } from "@/lib/gamification";
import type { EarnedBadge } from "@/lib/gamification";

const badgeIcons: Record<string, React.ElementType> = {
  DollarSign,
  Banknote: DollarSign,
  TrendingUp,
  Rocket,
  Crown,
  Flame,
  Fire: Flame,
};

export function MilestoneTracker() {
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);

  useEffect(() => {
    const data = getGamification();
    setEarnedBadges(data.badges);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent" />
          Milestones & Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {BADGE_DEFINITIONS.map((badge, i) => {
            const earned = earnedBadges.find((b) => b.id === badge.id);
            const IconComponent = badgeIcons[badge.icon] || Star;

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`text-center p-3 rounded-xl border ${
                  earned
                    ? "bg-accent-50 border-accent/20"
                    : "bg-gray-50 border-border opacity-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    earned ? "bg-accent text-white" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium">{badge.name}</div>
                <div className="text-[10px] text-muted-foreground">{badge.criteria}</div>
                {earned && (
                  <div className="text-[10px] text-accent mt-1 font-medium">Earned!</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
