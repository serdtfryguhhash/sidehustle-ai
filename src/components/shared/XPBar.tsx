"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Star } from "lucide-react";
import { getGamification, getXPProgress, getLevelForXP, LEVELS } from "@/lib/gamification";

export function XPBar() {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState("Dreamer");

  useEffect(() => {
    const data = getGamification();
    setXP(data.xp);
    setLevel(data.level);
  }, []);

  const progress = getXPProgress(xp);
  const currentLevel = getLevelForXP(xp);
  const nextLevel = LEVELS.find((l) => l.number === currentLevel.number + 1);

  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-accent" />
          </div>
          <div>
            <div className="text-sm font-bold font-heading">{level}</div>
            <div className="text-xs text-muted-foreground">Level {currentLevel.number}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-primary">
          <Zap className="w-3.5 h-3.5" />
          {xp} XP
        </div>
      </div>

      <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
        />
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px] text-muted-foreground">{progress.current} / {progress.needed} XP</span>
        {nextLevel && (
          <span className="text-[10px] text-muted-foreground">Next: {nextLevel.name}</span>
        )}
      </div>
    </div>
  );
}
