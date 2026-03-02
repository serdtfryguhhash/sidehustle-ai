"use client";

// ============================================================
// SideHustle.ai — AI Coach Memory System
// Accumulates user context for personalized AI coaching
// ============================================================

const MEMORY_KEY = "ai_coach_memory";

export interface AIMemoryContext {
  selectedHustles: string[];
  incomeHistory: { month: string; amount: number; hustle: string }[];
  skills: string[];
  goals: string[];
  completedPlaybookSteps: { hustleId: string; stepId: string; completedAt: string }[];
  quizResults: { question: string; answer: string }[];
  totalEarned: number;
  bestMonth: number;
  currentStreak: number;
  level: string;
  xp: number;
  lastUpdated: string;
}

function getDefault(): AIMemoryContext {
  return {
    selectedHustles: [],
    incomeHistory: [],
    skills: [],
    goals: [],
    completedPlaybookSteps: [],
    quizResults: [],
    totalEarned: 0,
    bestMonth: 0,
    currentStreak: 0,
    level: "Dreamer",
    xp: 0,
    lastUpdated: new Date().toISOString(),
  };
}

export function getAIMemory(): AIMemoryContext {
  if (typeof window === "undefined") return getDefault();
  const stored = localStorage.getItem(MEMORY_KEY);
  if (!stored) return getDefault();
  try {
    return JSON.parse(stored);
  } catch {
    return getDefault();
  }
}

export function saveAIMemory(data: AIMemoryContext): void {
  if (typeof window === "undefined") return;
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(MEMORY_KEY, JSON.stringify(data));
}

export function addSelectedHustle(hustleName: string): void {
  const memory = getAIMemory();
  if (!memory.selectedHustles.includes(hustleName)) {
    memory.selectedHustles.push(hustleName);
    saveAIMemory(memory);
  }
}

export function addIncomeEntry(month: string, amount: number, hustle: string): void {
  const memory = getAIMemory();
  memory.incomeHistory.push({ month, amount, hustle });
  memory.totalEarned += amount;
  const monthTotal = memory.incomeHistory
    .filter((e) => e.month === month)
    .reduce((sum, e) => sum + e.amount, 0);
  if (monthTotal > memory.bestMonth) {
    memory.bestMonth = monthTotal;
  }
  saveAIMemory(memory);
}

export function addSkills(skills: string[]): void {
  const memory = getAIMemory();
  skills.forEach((skill) => {
    if (!memory.skills.includes(skill)) {
      memory.skills.push(skill);
    }
  });
  saveAIMemory(memory);
}

export function addGoal(goal: string): void {
  const memory = getAIMemory();
  if (!memory.goals.includes(goal)) {
    memory.goals.push(goal);
    saveAIMemory(memory);
  }
}

export function addCompletedPlaybookStep(hustleId: string, stepId: string): void {
  const memory = getAIMemory();
  if (!memory.completedPlaybookSteps.find((s) => s.stepId === stepId)) {
    memory.completedPlaybookSteps.push({
      hustleId,
      stepId,
      completedAt: new Date().toISOString(),
    });
    saveAIMemory(memory);
  }
}

export function addQuizResult(question: string, answer: string): void {
  const memory = getAIMemory();
  memory.quizResults.push({ question, answer });
  saveAIMemory(memory);
}

export function updateMemoryStats(stats: {
  currentStreak?: number;
  level?: string;
  xp?: number;
}): void {
  const memory = getAIMemory();
  if (stats.currentStreak !== undefined) memory.currentStreak = stats.currentStreak;
  if (stats.level !== undefined) memory.level = stats.level;
  if (stats.xp !== undefined) memory.xp = stats.xp;
  saveAIMemory(memory);
}

export function buildAIContextPrompt(): string {
  const memory = getAIMemory();

  const parts: string[] = [];

  if (memory.selectedHustles.length > 0) {
    parts.push(`Active side hustles: ${memory.selectedHustles.join(", ")}`);
  }

  if (memory.totalEarned > 0) {
    parts.push(`Total earned across all hustles: $${memory.totalEarned.toLocaleString()}`);
  }

  if (memory.bestMonth > 0) {
    parts.push(`Best month: $${memory.bestMonth.toLocaleString()}`);
  }

  if (memory.incomeHistory.length > 0) {
    const recent = memory.incomeHistory.slice(-10);
    const incomeStr = recent
      .map((e) => `${e.month}: $${e.amount} (${e.hustle})`)
      .join("; ");
    parts.push(`Recent income entries: ${incomeStr}`);
  }

  if (memory.skills.length > 0) {
    parts.push(`User skills: ${memory.skills.join(", ")}`);
  }

  if (memory.goals.length > 0) {
    parts.push(`User goals: ${memory.goals.join(", ")}`);
  }

  if (memory.completedPlaybookSteps.length > 0) {
    parts.push(`Completed ${memory.completedPlaybookSteps.length} playbook steps`);
  }

  if (memory.currentStreak > 0) {
    parts.push(`Current hustle streak: ${memory.currentStreak} days`);
  }

  if (memory.level) {
    parts.push(`Current level: ${memory.level} (${memory.xp} XP)`);
  }

  if (memory.quizResults.length > 0) {
    const quizStr = memory.quizResults
      .slice(-5)
      .map((r) => `${r.question}: ${r.answer}`)
      .join("; ");
    parts.push(`Quiz insights: ${quizStr}`);
  }

  if (parts.length === 0) {
    return "This is a new user. Help them get started with their first side hustle.";
  }

  return `User profile and history:\n${parts.join("\n")}\n\nUse this context to give personalized advice. Reference their past income, specific hustles, and progress. Give scaling advice based on their current level.`;
}
