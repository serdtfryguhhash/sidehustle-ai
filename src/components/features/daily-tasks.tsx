"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Zap, Clock, Sparkles, Trophy } from "lucide-react";
import { awardXP } from "@/lib/gamification";

interface DailyTask {
  title: string;
  description: string;
  hustle: string;
  estimatedMinutes: number;
  xpReward: number;
  completed: boolean;
}

const DAILY_TASKS_KEY = "daily_tasks";
const DAILY_TASKS_DATE_KEY = "daily_tasks_date";

export function DailyTasks() {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [allCompleted, setAllCompleted] = useState(false);

  const loadTasks = useCallback(() => {
    if (typeof window === "undefined") return;
    const today = new Date().toISOString().split("T")[0];
    const savedDate = localStorage.getItem(DAILY_TASKS_DATE_KEY);

    if (savedDate === today) {
      const saved = localStorage.getItem(DAILY_TASKS_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as DailyTask[];
          setTasks(parsed);
          setAllCompleted(parsed.every((t) => t.completed));
        } catch {
          /* empty */
        }
      }
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const generateTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/daily-tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hustles: ["Freelance Writing", "Social Media Management"],
          userContext: "I am working on growing my freelance business.",
        }),
      });
      const data = await res.json();
      if (data.success && data.tasks) {
        const newTasks: DailyTask[] = data.tasks.map((t: DailyTask) => ({
          ...t,
          completed: false,
        }));
        setTasks(newTasks);
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem(DAILY_TASKS_KEY, JSON.stringify(newTasks));
        localStorage.setItem(DAILY_TASKS_DATE_KEY, today);
      }
    } catch {
      // Fallback tasks
      const fallbackTasks: DailyTask[] = [
        { title: "Research trending topics in your niche", description: "Spend 15 minutes browsing industry news and note 3 content ideas.", hustle: "Freelance Writing", estimatedMinutes: 15, xpReward: 15, completed: false },
        { title: "Send 2 outreach messages", description: "Reach out to potential clients with personalized pitches.", hustle: "Freelance Writing", estimatedMinutes: 20, xpReward: 15, completed: false },
        { title: "Schedule social media posts", description: "Create and schedule 3 posts for tomorrow across your platforms.", hustle: "Social Media Management", estimatedMinutes: 25, xpReward: 15, completed: false },
      ];
      setTasks(fallbackTasks);
      const today = new Date().toISOString().split("T")[0];
      localStorage.setItem(DAILY_TASKS_KEY, JSON.stringify(fallbackTasks));
      localStorage.setItem(DAILY_TASKS_DATE_KEY, today);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index] = { ...updated[index], completed: !updated[index].completed };
    setTasks(updated);
    localStorage.setItem(DAILY_TASKS_KEY, JSON.stringify(updated));

    if (!tasks[index].completed) {
      awardXP("complete_task");
    }

    const nowAllComplete = updated.every((t) => t.completed);
    setAllCompleted(nowAllComplete);

    if (nowAllComplete) {
      awardXP("complete_task");
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Card className={allCompleted ? "border-primary/30 bg-primary-50/30" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Daily Hustle Tasks
          </CardTitle>
          {tasks.length > 0 && (
            <Badge variant={allCompleted ? "default" : "outline"}>
              {completedCount}/{tasks.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <div className="text-center py-6">
            <Sparkles className="w-10 h-10 text-primary/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              Get personalized daily tasks to keep your hustle moving forward
            </p>
            <Button onClick={generateTasks} disabled={loading} className="gap-1.5">
              <Zap className="w-4 h-4" />
              {loading ? "Generating..." : "Generate Today's Tasks"}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                  task.completed ? "bg-primary-50" : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => toggleTask(i)}
              >
                <div className="mt-0.5">
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                    {task.title}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {task.estimatedMinutes}m
                    </div>
                    <div className="flex items-center gap-1 text-xs text-primary font-medium">
                      <Zap className="w-3 h-3" />
                      +{task.xpReward} XP
                    </div>
                    <Badge variant="outline" className="text-[10px] h-4 px-1.5">{task.hustle}</Badge>
                  </div>
                </div>
              </motion.div>
            ))}

            {allCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-3 bg-accent-50 rounded-lg border border-accent/20"
              >
                <Trophy className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-sm font-bold text-accent-800">All tasks complete!</div>
                  <div className="text-xs text-accent-700">+15 bonus XP for completing all 3</div>
                </div>
              </motion.div>
            )}

            <div className="pt-2">
              <Button variant="ghost" size="sm" onClick={generateTasks} disabled={loading} className="w-full text-xs">
                {loading ? "Generating..." : "Refresh Tasks"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
