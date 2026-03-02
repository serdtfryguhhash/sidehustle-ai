"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2, Circle, Clock, Zap, BookOpen,
  ChevronDown, ChevronUp, Lightbulb, Sparkles,
} from "lucide-react";
import { awardXP } from "@/lib/gamification";
import { sideHustles } from "@/data/side-hustles";

interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  week: number;
  tasks: string[];
  tip?: string;
  completed: boolean;
}

interface Playbook {
  title: string;
  summary: string;
  estimatedWeeks: number;
  steps: PlaybookStep[];
  hustleName: string;
  createdAt: string;
}

const PLAYBOOK_KEY = "custom_playbook";

export function PlaybookBuilder() {
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedHustle, setSelectedHustle] = useState("");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const loadPlaybook = useCallback(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(PLAYBOOK_KEY);
    if (saved) {
      try {
        setPlaybook(JSON.parse(saved));
      } catch {
        /* empty */
      }
    }
  }, []);

  useEffect(() => {
    loadPlaybook();
  }, [loadPlaybook]);

  const generatePlaybook = async () => {
    if (!selectedHustle) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/playbook-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hustleName: selectedHustle,
          skills: ["Writing", "Marketing"],
          availableHours: 10,
          capital: 100,
          goals: "Start earning consistent income",
        }),
      });
      const data = await res.json();
      if (data.success && data.playbook) {
        const newPlaybook: Playbook = {
          ...data.playbook,
          steps: data.playbook.steps.map((s: PlaybookStep) => ({ ...s, completed: false })),
          hustleName: selectedHustle,
          createdAt: new Date().toISOString(),
        };
        setPlaybook(newPlaybook);
        localStorage.setItem(PLAYBOOK_KEY, JSON.stringify(newPlaybook));
      }
    } catch {
      /* empty */
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (stepId: string) => {
    if (!playbook) return;
    const updated = {
      ...playbook,
      steps: playbook.steps.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      ),
    };
    setPlaybook(updated);
    localStorage.setItem(PLAYBOOK_KEY, JSON.stringify(updated));

    const step = playbook.steps.find((s) => s.id === stepId);
    if (step && !step.completed) {
      awardXP("finish_playbook_step");
    }
  };

  if (!playbook) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Playbook Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Generate a personalized step-by-step business plan for any side hustle
          </p>
          <div className="space-y-3">
            <select
              className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm"
              value={selectedHustle}
              onChange={(e) => setSelectedHustle(e.target.value)}
            >
              <option value="">Select a side hustle...</option>
              {sideHustles.slice(0, 20).map((h) => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
            <Button
              onClick={generatePlaybook}
              disabled={!selectedHustle || loading}
              className="w-full gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              {loading ? "Generating Playbook..." : "Generate Playbook"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalSteps = playbook.steps.length;
  const completedSteps = playbook.steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedSteps / totalSteps) * 100);
  const weeks = Array.from(new Set(playbook.steps.map((s) => s.week))).sort((a, b) => a - b);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            {playbook.title}
          </CardTitle>
          <Badge variant="outline">{completedSteps}/{totalSteps} steps</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{playbook.summary}</p>
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {weeks.map((week) => {
            const weekSteps = playbook.steps.filter((s) => s.week === week);
            const weekCompleted = weekSteps.filter((s) => s.completed).length;
            const isExpanded = expandedWeek === week;

            return (
              <div key={week} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedWeek(isExpanded ? null : week)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">W{week}</span>
                    </div>
                    <span className="text-sm font-medium">Week {week}</span>
                    <span className="text-xs text-muted-foreground">
                      {weekCompleted}/{weekSteps.length} done
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-3 pb-3 space-y-2">
                    {weekSteps.map((step) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`p-3 rounded-lg ${
                          step.completed ? "bg-primary-50" : "bg-gray-50"
                        }`}
                      >
                        <div
                          className="flex items-start gap-2 cursor-pointer"
                          onClick={() => toggleStep(step.id)}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className={`text-sm font-medium ${step.completed ? "line-through text-muted-foreground" : ""}`}>
                              {step.title}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                            <div className="flex items-center gap-3 mt-1.5">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {step.estimatedHours}h
                              </div>
                              <div className="flex items-center gap-1 text-xs text-primary font-medium">
                                <Zap className="w-3 h-3" />
                                +30 XP
                              </div>
                            </div>
                            {step.tasks.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {step.tasks.map((task, j) => (
                                  <div key={j} className="text-xs text-muted-foreground flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                                    {task}
                                  </div>
                                ))}
                              </div>
                            )}
                            {step.tip && (
                              <div className="flex items-start gap-1.5 mt-2 p-2 bg-accent-50 rounded">
                                <Lightbulb className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                                <span className="text-[10px] text-accent-800">{step.tip}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setPlaybook(null);
              localStorage.removeItem(PLAYBOOK_KEY);
            }}
            className="w-full text-xs"
          >
            Generate New Playbook
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
