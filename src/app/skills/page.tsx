"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2, Circle, Lock, Zap, Star,
  Megaphone, FileText, Code, Handshake,
  ArrowRight,
} from "lucide-react";
import { skillTrees, type SkillCategory, type SkillNode } from "@/data/skill-trees";
import { getGamification } from "@/lib/gamification";

const COMPLETED_SKILLS_KEY = "completed_skills";

const categoryIcons: Record<string, React.ElementType> = {
  Megaphone,
  FileText,
  Code,
  Handshake,
};

function getCompletedSkills(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(COMPLETED_SKILLS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveCompletedSkills(skills: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COMPLETED_SKILLS_KEY, JSON.stringify(skills));
}

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("marketing");
  const [completedSkills, setCompletedSkills] = useState<string[]>([]);
  const [userXP, setUserXP] = useState(0);

  const loadData = useCallback(() => {
    setCompletedSkills(getCompletedSkills());
    const gamification = getGamification();
    setUserXP(gamification.xp);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const activeTree = skillTrees.find((t) => t.id === activeCategory)!;

  const isNodeUnlockable = (node: SkillNode): boolean => {
    if (node.prerequisites.length === 0) return true;
    return node.prerequisites.every((prereq) => completedSkills.includes(prereq));
  };

  const isNodeCompleted = (nodeId: string): boolean => {
    return completedSkills.includes(nodeId);
  };

  const toggleSkill = (nodeId: string) => {
    const updated = completedSkills.includes(nodeId)
      ? completedSkills.filter((s) => s !== nodeId)
      : [...completedSkills, nodeId];
    setCompletedSkills(updated);
    saveCompletedSkills(updated);
  };

  const totalNodes = skillTrees.reduce((acc, tree) => acc + tree.nodes.length, 0);
  const totalCompleted = completedSkills.length;
  const overallProgress = Math.round((totalCompleted / totalNodes) * 100);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-1">Skill Tree</h1>
              <p className="text-muted-foreground">
                Master essential skills to grow your side hustle empire
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Star className="w-3 h-3 text-accent" />
                {totalCompleted}/{totalNodes} Skills
              </Badge>
              <Badge className="gap-1">
                <Zap className="w-3 h-3" />
                {userXP} XP
              </Badge>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-muted-foreground">Overall Skill Progress</span>
              <span className="text-xs font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {skillTrees.map((tree) => {
            const Icon = categoryIcons[tree.icon] || Star;
            const treeCompleted = tree.nodes.filter((n) => completedSkills.includes(n.id)).length;
            const isActive = activeCategory === tree.id;

            return (
              <motion.button
                key={tree.id}
                onClick={() => setActiveCategory(tree.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isActive
                    ? "border-2 shadow-md"
                    : "border-border hover:border-gray-300 bg-white"
                }`}
                style={isActive ? { borderColor: tree.color, backgroundColor: `${tree.color}08` } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${tree.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: tree.color }} />
                  </div>
                  <span className="text-sm font-bold font-heading">{tree.name}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-2">{tree.description}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">
                    {treeCompleted}/{tree.nodes.length} completed
                  </span>
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: tree.color,
                        width: `${(treeCompleted / tree.nodes.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Skill Tree Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2" style={{ color: activeTree.color }}>
              {(() => {
                const Icon = categoryIcons[activeTree.icon] || Star;
                return <Icon className="w-5 h-5" />;
              })()}
              {activeTree.name} Skill Tree
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeTree.nodes.map((node, index) => {
                const completed = isNodeCompleted(node.id);
                const unlockable = isNodeUnlockable(node);
                const locked = !unlockable && !completed;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                  >
                    {/* Connector Line */}
                    {index > 0 && (
                      <div className="flex justify-center -mt-3 mb-0">
                        <div
                          className="w-0.5 h-6"
                          style={{
                            backgroundColor: completed ? activeTree.color : "#E5E7EB",
                          }}
                        />
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-xl border-2 transition-all ${
                        completed
                          ? "border-opacity-50 bg-opacity-5"
                          : locked
                          ? "border-gray-200 bg-gray-50 opacity-50"
                          : "border-border bg-white hover:shadow-md"
                      }`}
                      style={
                        completed
                          ? {
                              borderColor: activeTree.color,
                              backgroundColor: `${activeTree.color}08`,
                            }
                          : {}
                      }
                    >
                      <div className="flex items-start gap-3">
                        {/* Status Icon */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            completed
                              ? "text-white"
                              : locked
                              ? "bg-gray-200 text-gray-400"
                              : "text-white"
                          }`}
                          style={
                            completed || !locked
                              ? { backgroundColor: completed ? activeTree.color : `${activeTree.color}30`, color: completed ? "white" : activeTree.color }
                              : {}
                          }
                        >
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : locked ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm font-bold font-heading">{node.name}</h3>
                            {completed && (
                              <Badge
                                className="text-[10px] border-0"
                                style={{ backgroundColor: `${activeTree.color}20`, color: activeTree.color }}
                              >
                                Completed
                              </Badge>
                            )}
                            {locked && (
                              <Badge variant="outline" className="text-[10px]">Locked</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{node.description}</p>

                          {/* Resources */}
                          {!locked && (
                            <div className="space-y-1 mb-2">
                              {node.resources.map((resource, j) => (
                                <div key={j} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <ArrowRight className="w-3 h-3 shrink-0" style={{ color: activeTree.color }} />
                                  {resource}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* XP Requirement & Action */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-muted-foreground">
                              {node.xpRequired > 0 ? `Requires ${node.xpRequired} XP` : "No XP required"}
                            </span>
                            {!locked && !completed && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs gap-1"
                                onClick={() => toggleSkill(node.id)}
                                style={{ borderColor: activeTree.color, color: activeTree.color }}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Mark Complete
                              </Button>
                            )}
                            {completed && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs"
                                onClick={() => toggleSkill(node.id)}
                              >
                                Undo
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
