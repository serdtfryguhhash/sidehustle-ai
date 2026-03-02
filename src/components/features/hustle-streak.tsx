"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Shield, Trophy, Calendar, Snowflake } from "lucide-react";

interface HustleStreakData {
  currentStreak: number;
  longestStreak: number;
  streakDates: string[];
  lastActivityDate: string;
  freezesUsed: number;
  freezeMonth: string;
  badges: { days: number; earned: boolean; earnedAt?: string }[];
}

const HUSTLE_STREAK_KEY = "hustle_streak";
const STREAK_MILESTONES = [7, 30, 100, 365];

function getDefault(): HustleStreakData {
  return {
    currentStreak: 0,
    longestStreak: 0,
    streakDates: [],
    lastActivityDate: "",
    freezesUsed: 0,
    freezeMonth: "",
    badges: STREAK_MILESTONES.map((d) => ({ days: d, earned: false })),
  };
}

function getStreakData(): HustleStreakData {
  if (typeof window === "undefined") return getDefault();
  const stored = localStorage.getItem(HUSTLE_STREAK_KEY);
  if (!stored) return getDefault();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefault();
  }
}

function saveStreakData(data: HustleStreakData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(HUSTLE_STREAK_KEY, JSON.stringify(data));
}

export function HustleStreak() {
  const [data, setData] = useState<HustleStreakData>(getDefault());
  const [canFreeze, setCanFreeze] = useState(false);

  const loadData = useCallback(() => {
    const streak = getStreakData();
    const today = new Date().toISOString().split("T")[0];
    const currentMonth = today.slice(0, 7);

    // Check if freeze is available (1 per month)
    const freezeAvailable = streak.freezeMonth !== currentMonth || streak.freezesUsed < 1;
    setCanFreeze(freezeAvailable);

    // Check streak status
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    if (streak.lastActivityDate === yesterday || streak.lastActivityDate === today) {
      // Streak is alive
    } else if (streak.lastActivityDate && streak.lastActivityDate !== today) {
      // Streak broken
      streak.currentStreak = 0;
      saveStreakData(streak);
    }

    setData(streak);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const recordActivity = () => {
    const today = new Date().toISOString().split("T")[0];
    const streak = getStreakData();

    if (streak.lastActivityDate === today) return; // Already logged today

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (streak.lastActivityDate === yesterday) {
      streak.currentStreak += 1;
    } else {
      streak.currentStreak = 1;
    }

    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
    streak.lastActivityDate = today;
    if (!streak.streakDates.includes(today)) {
      streak.streakDates.push(today);
    }

    // Check milestones
    streak.badges = streak.badges.map((b) => {
      if (!b.earned && streak.currentStreak >= b.days) {
        return { ...b, earned: true, earnedAt: today };
      }
      return b;
    });

    saveStreakData(streak);
    setData(streak);
  };

  const useFreeze = () => {
    const today = new Date().toISOString().split("T")[0];
    const currentMonth = today.slice(0, 7);
    const streak = getStreakData();

    streak.freezesUsed = 1;
    streak.freezeMonth = currentMonth;
    streak.lastActivityDate = today;
    if (!streak.streakDates.includes(today)) {
      streak.streakDates.push(today);
    }

    saveStreakData(streak);
    setData(streak);
    setCanFreeze(false);
  };

  const today = new Date().toISOString().split("T")[0];
  const loggedToday = data.lastActivityDate === today;

  // Build last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(Date.now() - (6 - i) * 86400000).toISOString().split("T")[0];
    return {
      date,
      dayLabel: new Date(date).toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2),
      active: data.streakDates.includes(date),
      isToday: date === today,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          Hustle Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Streak */}
        <div className="text-center mb-4">
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div>
              <div className="text-2xl font-bold">{data.currentStreak}</div>
              <div className="text-[10px] -mt-0.5">days</div>
            </div>
          </motion.div>
          <div className="text-sm text-muted-foreground">
            Longest: {data.longestStreak} days
          </div>
        </div>

        {/* Weekly View */}
        <div className="flex items-center justify-between mb-4 px-2">
          {last7Days.map((day) => (
            <div key={day.date} className="flex flex-col items-center gap-1">
              <div className="text-[10px] text-muted-foreground">{day.dayLabel}</div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  day.active
                    ? "bg-orange-500 text-white"
                    : day.isToday
                    ? "border-2 border-orange-300 text-orange-400"
                    : "bg-gray-100 text-gray-300"
                }`}
              >
                {day.active ? (
                  <Flame className="w-4 h-4" />
                ) : (
                  <Calendar className="w-3 h-3" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2">
          {!loggedToday ? (
            <Button onClick={recordActivity} className="w-full gap-1.5" size="sm">
              <Flame className="w-4 h-4" />
              Log Today&apos;s Hustle
            </Button>
          ) : (
            <div className="text-center text-sm text-primary font-medium py-2">
              Today&apos;s hustle logged!
            </div>
          )}

          {canFreeze && !loggedToday && (
            <Button variant="outline" onClick={useFreeze} className="w-full gap-1.5 text-xs" size="sm">
              <Snowflake className="w-3.5 h-3.5" />
              Use Streak Freeze (1/month)
            </Button>
          )}
        </div>

        {/* Milestone Badges */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs font-medium mb-2 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-accent" />
            Streak Milestones
          </div>
          <div className="flex items-center gap-2">
            {data.badges.map((badge) => (
              <div
                key={badge.days}
                className={`flex-1 text-center p-2 rounded-lg ${
                  badge.earned ? "bg-accent-50 border border-accent/20" : "bg-gray-50"
                }`}
              >
                <div className={`text-xs font-bold ${badge.earned ? "text-accent" : "text-gray-300"}`}>
                  {badge.days}d
                </div>
                <div className="mt-0.5">
                  {badge.earned ? (
                    <Shield className="w-4 h-4 text-accent mx-auto" />
                  ) : (
                    <Shield className="w-4 h-4 text-gray-200 mx-auto" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
