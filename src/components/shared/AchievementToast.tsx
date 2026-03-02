"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Zap } from "lucide-react";
import type { EarnedBadge } from "@/lib/gamification";

interface AchievementToastProps {
  achievement: EarnedBadge | null;
  xpGained?: number;
  onClose: () => void;
}

export function AchievementToast({ achievement, xpGained, onClose }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-20 left-1/2 z-[100] w-80 bg-white rounded-xl border border-accent/30 shadow-lg overflow-hidden"
        >
          <div className="h-1 bg-gradient-to-r from-accent to-primary" />
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-medium text-accent uppercase tracking-wide mb-0.5">
                  Achievement Unlocked!
                </div>
                <div className="text-sm font-bold font-heading">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
                {xpGained && (
                  <div className="flex items-center gap-1 mt-1.5 text-xs font-medium text-primary">
                    <Zap className="w-3 h-3" />
                    +{xpGained} XP
                  </div>
                )}
              </div>
              <button onClick={() => { setIsVisible(false); onClose(); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
