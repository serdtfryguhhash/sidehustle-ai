"use client";

// ============================================================
// SideHustle.ai — Gamification & XP System
// ============================================================

const GAMIFICATION_KEY = "app_gamification";

export interface GamificationData {
  xp: number;
  level: string;
  levelNumber: number;
  badges: EarnedBadge[];
  pendingAchievements: Achievement[];
  totalIncomeLogged: number;
  tasksCompleted: number;
  playbookStepsCompleted: number;
  storiesShared: number;
  dailyVisitDates: string[];
}

export interface EarnedBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
}

export interface XPAction {
  type: "log_income" | "complete_task" | "finish_playbook_step" | "daily_visit" | "share_story";
  xp: number;
  label: string;
}

export const XP_ACTIONS: Record<string, XPAction> = {
  log_income: { type: "log_income", xp: 20, label: "Log Income" },
  complete_task: { type: "complete_task", xp: 15, label: "Complete Task" },
  finish_playbook_step: { type: "finish_playbook_step", xp: 30, label: "Finish Playbook Step" },
  daily_visit: { type: "daily_visit", xp: 10, label: "Daily Visit" },
  share_story: { type: "share_story", xp: 50, label: "Share Story" },
};

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  check: (data: GamificationData, extra?: { dailyIncome?: number; monthlyIncome?: number; streak?: number }) => boolean;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: "first_dollar",
    name: "First Dollar",
    description: "Logged your first income entry",
    icon: "DollarSign",
    criteria: "Log your first income",
    check: (data) => data.totalIncomeLogged > 0,
  },
  {
    id: "hundred_day",
    name: "$100 Day",
    description: "Earned $100 or more in a single day",
    icon: "Banknote",
    criteria: "Earn $100+ in one day",
    check: (_data, extra) => (extra?.dailyIncome ?? 0) >= 100,
  },
  {
    id: "1k_month",
    name: "$1K Month",
    description: "Earned $1,000 or more in a single month",
    icon: "TrendingUp",
    criteria: "Earn $1,000+ in one month",
    check: (_data, extra) => (extra?.monthlyIncome ?? 0) >= 1000,
  },
  {
    id: "5k_month",
    name: "$5K Month",
    description: "Earned $5,000 or more in a single month",
    icon: "Rocket",
    criteria: "Earn $5,000+ in one month",
    check: (_data, extra) => (extra?.monthlyIncome ?? 0) >= 5000,
  },
  {
    id: "10k_month",
    name: "$10K Month",
    description: "Earned $10,000 or more in a single month",
    icon: "Crown",
    criteria: "Earn $10,000+ in one month",
    check: (_data, extra) => (extra?.monthlyIncome ?? 0) >= 10000,
  },
  {
    id: "7_day_streak",
    name: "7-Day Streak",
    description: "Maintained a 7-day hustle streak",
    icon: "Flame",
    criteria: "7-day hustle streak",
    check: (_data, extra) => (extra?.streak ?? 0) >= 7,
  },
  {
    id: "30_day_streak",
    name: "30-Day Streak",
    description: "Maintained a 30-day hustle streak",
    icon: "Fire",
    criteria: "30-day hustle streak",
    check: (_data, extra) => (extra?.streak ?? 0) >= 30,
  },
];

export interface LevelDefinition {
  name: string;
  minXP: number;
  maxXP: number;
  number: number;
}

export const LEVELS: LevelDefinition[] = [
  { name: "Dreamer", minXP: 0, maxXP: 199, number: 1 },
  { name: "Hustler", minXP: 200, maxXP: 599, number: 2 },
  { name: "Earner", minXP: 600, maxXP: 1499, number: 3 },
  { name: "Mogul", minXP: 1500, maxXP: 3999, number: 4 },
  { name: "Tycoon", minXP: 4000, maxXP: Infinity, number: 5 },
];

function getDefault(): GamificationData {
  return {
    xp: 0,
    level: "Dreamer",
    levelNumber: 1,
    badges: [],
    pendingAchievements: [],
    totalIncomeLogged: 0,
    tasksCompleted: 0,
    playbookStepsCompleted: 0,
    storiesShared: 0,
    dailyVisitDates: [],
  };
}

export function getGamification(): GamificationData {
  if (typeof window === "undefined") return getDefault();
  const stored = localStorage.getItem(GAMIFICATION_KEY);
  if (!stored) return getDefault();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefault();
  }
}

function saveGamification(data: GamificationData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(data));
}

export function getLevelForXP(xp: number): LevelDefinition {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) return LEVELS[i];
  }
  return LEVELS[0];
}

export function getXPProgress(xp: number): { current: number; needed: number; percentage: number } {
  const level = getLevelForXP(xp);
  if (level.maxXP === Infinity) {
    return { current: xp - level.minXP, needed: 1000, percentage: 100 };
  }
  const current = xp - level.minXP;
  const needed = level.maxXP - level.minXP + 1;
  const percentage = Math.min(Math.round((current / needed) * 100), 100);
  return { current, needed, percentage };
}

export function awardXP(actionType: string, extra?: { dailyIncome?: number; monthlyIncome?: number; streak?: number }): {
  newXP: number;
  xpGained: number;
  leveledUp: boolean;
  newLevel: string;
  newBadges: EarnedBadge[];
} {
  const data = getGamification();
  const action = XP_ACTIONS[actionType];
  if (!action) return { newXP: data.xp, xpGained: 0, leveledUp: false, newLevel: data.level, newBadges: [] };

  const oldLevel = getLevelForXP(data.xp);
  data.xp += action.xp;
  const newLevel = getLevelForXP(data.xp);
  data.level = newLevel.name;
  data.levelNumber = newLevel.number;

  // Update counters
  if (actionType === "log_income") data.totalIncomeLogged += 1;
  if (actionType === "complete_task") data.tasksCompleted += 1;
  if (actionType === "finish_playbook_step") data.playbookStepsCompleted += 1;
  if (actionType === "share_story") data.storiesShared += 1;
  if (actionType === "daily_visit") {
    const today = new Date().toISOString().split("T")[0];
    if (!data.dailyVisitDates.includes(today)) {
      data.dailyVisitDates.push(today);
    }
  }

  // Check for new badges
  const newBadges: EarnedBadge[] = [];
  BADGE_DEFINITIONS.forEach((badge) => {
    const alreadyEarned = data.badges.some((b) => b.id === badge.id);
    if (!alreadyEarned && badge.check(data, extra)) {
      const earned: EarnedBadge = {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        earnedAt: new Date().toISOString(),
      };
      data.badges.push(earned);
      newBadges.push(earned);
    }
  });

  saveGamification(data);

  return {
    newXP: data.xp,
    xpGained: action.xp,
    leveledUp: newLevel.number > oldLevel.number,
    newLevel: newLevel.name,
    newBadges,
  };
}

export function checkBadges(extra?: { dailyIncome?: number; monthlyIncome?: number; streak?: number }): EarnedBadge[] {
  const data = getGamification();
  const newBadges: EarnedBadge[] = [];

  BADGE_DEFINITIONS.forEach((badge) => {
    const alreadyEarned = data.badges.some((b) => b.id === badge.id);
    if (!alreadyEarned && badge.check(data, extra)) {
      const earned: EarnedBadge = {
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        earnedAt: new Date().toISOString(),
      };
      data.badges.push(earned);
      newBadges.push(earned);
    }
  });

  if (newBadges.length > 0) saveGamification(data);
  return newBadges;
}
