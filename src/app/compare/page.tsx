"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  Code,
  PenTool,
  Palette,
  Video,
  Cpu,
  GraduationCap,
  ShoppingBag,
  Megaphone,
  Lightbulb,
} from "lucide-react";

// ── Hustle comparison data ──────────────────────────────────────────
interface CompareHustle {
  id: string;
  name: string;
  icon: React.ElementType;
  incomeRange: string;
  incomeScore: number; // 1-10
  startupCost: string;
  startupCostScore: number; // 1-10 (10 = cheapest / best)
  timeToFirstIncome: string;
  timeScore: number; // 1-10 (10 = fastest)
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  difficultyScore: number; // 1-10 (10 = easiest)
  flexibility: "High" | "Medium" | "Low";
  flexibilityScore: number;
  scalability: "High" | "Medium" | "Low";
  scalabilityScore: number;
  requiredSkills: string[];
}

const hustles: CompareHustle[] = [
  {
    id: "freelance-writing",
    name: "Freelance Writing",
    icon: PenTool,
    incomeRange: "$500 - $5,000/mo",
    incomeScore: 6,
    startupCost: "$0 - $100",
    startupCostScore: 10,
    timeToFirstIncome: "1-2 weeks",
    timeScore: 9,
    difficulty: "Beginner",
    difficultyScore: 9,
    flexibility: "High",
    flexibilityScore: 9,
    scalability: "Medium",
    scalabilityScore: 5,
    requiredSkills: ["Writing", "Research", "SEO", "Grammar"],
  },
  {
    id: "web-development",
    name: "Web Development",
    icon: Code,
    incomeRange: "$2,000 - $15,000/mo",
    incomeScore: 9,
    startupCost: "$0 - $200",
    startupCostScore: 9,
    timeToFirstIncome: "2-4 weeks",
    timeScore: 7,
    difficulty: "Intermediate",
    difficultyScore: 5,
    flexibility: "High",
    flexibilityScore: 8,
    scalability: "High",
    scalabilityScore: 8,
    requiredSkills: ["JavaScript", "React/Next.js", "CSS", "Git"],
  },
  {
    id: "print-on-demand",
    name: "Print on Demand",
    icon: Palette,
    incomeRange: "$200 - $5,000/mo",
    incomeScore: 5,
    startupCost: "$0 - $100",
    startupCostScore: 10,
    timeToFirstIncome: "2-6 weeks",
    timeScore: 6,
    difficulty: "Beginner",
    difficultyScore: 8,
    flexibility: "High",
    flexibilityScore: 9,
    scalability: "High",
    scalabilityScore: 8,
    requiredSkills: ["Design", "Niche research", "Marketing"],
  },
  {
    id: "youtube",
    name: "YouTube Channel",
    icon: Video,
    incomeRange: "$500 - $20,000/mo",
    incomeScore: 8,
    startupCost: "$200 - $2,000",
    startupCostScore: 5,
    timeToFirstIncome: "3-6 months",
    timeScore: 3,
    difficulty: "Intermediate",
    difficultyScore: 4,
    flexibility: "Medium",
    flexibilityScore: 6,
    scalability: "High",
    scalabilityScore: 10,
    requiredSkills: ["Video editing", "Public speaking", "SEO", "Consistency"],
  },
  {
    id: "ai-automation",
    name: "AI Automation Services",
    icon: Cpu,
    incomeRange: "$3,000 - $20,000/mo",
    incomeScore: 10,
    startupCost: "$0 - $200",
    startupCostScore: 9,
    timeToFirstIncome: "2-4 weeks",
    timeScore: 7,
    difficulty: "Advanced",
    difficultyScore: 3,
    flexibility: "High",
    flexibilityScore: 8,
    scalability: "High",
    scalabilityScore: 9,
    requiredSkills: ["AI/ML basics", "Python", "API integration", "Problem-solving"],
  },
  {
    id: "online-courses",
    name: "Online Courses",
    icon: GraduationCap,
    incomeRange: "$1,000 - $10,000/mo",
    incomeScore: 7,
    startupCost: "$100 - $500",
    startupCostScore: 7,
    timeToFirstIncome: "1-3 months",
    timeScore: 4,
    difficulty: "Intermediate",
    difficultyScore: 5,
    flexibility: "High",
    flexibilityScore: 9,
    scalability: "High",
    scalabilityScore: 10,
    requiredSkills: ["Subject expertise", "Teaching", "Video production", "Marketing"],
  },
  {
    id: "dropshipping",
    name: "Dropshipping",
    icon: ShoppingBag,
    incomeRange: "$500 - $10,000/mo",
    incomeScore: 7,
    startupCost: "$200 - $2,000",
    startupCostScore: 5,
    timeToFirstIncome: "2-4 weeks",
    timeScore: 6,
    difficulty: "Intermediate",
    difficultyScore: 4,
    flexibility: "Medium",
    flexibilityScore: 6,
    scalability: "High",
    scalabilityScore: 8,
    requiredSkills: ["Marketing", "Ad management", "Product research", "Customer service"],
  },
  {
    id: "social-media",
    name: "Social Media Management",
    icon: Megaphone,
    incomeRange: "$1,000 - $5,000/mo",
    incomeScore: 6,
    startupCost: "$0 - $50",
    startupCostScore: 10,
    timeToFirstIncome: "1-2 weeks",
    timeScore: 9,
    difficulty: "Beginner",
    difficultyScore: 8,
    flexibility: "Medium",
    flexibilityScore: 7,
    scalability: "Medium",
    scalabilityScore: 5,
    requiredSkills: ["Content creation", "Analytics", "Copywriting", "Scheduling"],
  },
  {
    id: "affiliate-marketing",
    name: "Affiliate Marketing",
    icon: TrendingUp,
    incomeRange: "$300 - $10,000/mo",
    incomeScore: 7,
    startupCost: "$0 - $200",
    startupCostScore: 9,
    timeToFirstIncome: "1-3 months",
    timeScore: 4,
    difficulty: "Intermediate",
    difficultyScore: 5,
    flexibility: "High",
    flexibilityScore: 9,
    scalability: "High",
    scalabilityScore: 9,
    requiredSkills: ["Content creation", "SEO", "Marketing", "Analytics"],
  },
  {
    id: "digital-templates",
    name: "Digital Templates",
    icon: Lightbulb,
    incomeRange: "$300 - $5,000/mo",
    incomeScore: 5,
    startupCost: "$0 - $50",
    startupCostScore: 10,
    timeToFirstIncome: "2-4 weeks",
    timeScore: 6,
    difficulty: "Beginner",
    difficultyScore: 8,
    flexibility: "High",
    flexibilityScore: 10,
    scalability: "High",
    scalabilityScore: 9,
    requiredSkills: ["Design", "Notion/Canva/Figma", "Marketing"],
  },
];

// ── Helpers ─────────────────────────────────────────────────────────
type MetricKey = "incomeScore" | "startupCostScore" | "timeScore" | "difficultyScore" | "flexibilityScore" | "scalabilityScore";

const metricLabels: { key: MetricKey; label: string; displayKey: string }[] = [
  { key: "incomeScore", label: "Income Range", displayKey: "incomeRange" },
  { key: "startupCostScore", label: "Startup Cost", displayKey: "startupCost" },
  { key: "timeScore", label: "Time to First Income", displayKey: "timeToFirstIncome" },
  { key: "difficultyScore", label: "Difficulty", displayKey: "difficulty" },
  { key: "flexibilityScore", label: "Flexibility", displayKey: "flexibility" },
  { key: "scalabilityScore", label: "Scalability", displayKey: "scalability" },
];

function getDisplayValue(hustle: CompareHustle, key: string): string {
  switch (key) {
    case "incomeRange": return hustle.incomeRange;
    case "startupCost": return hustle.startupCost;
    case "timeToFirstIncome": return hustle.timeToFirstIncome;
    case "difficulty": return hustle.difficulty;
    case "flexibility": return hustle.flexibility;
    case "scalability": return hustle.scalability;
    default: return "";
  }
}

function getScoreColor(score: number): string {
  if (score >= 8) return "bg-green-500";
  if (score >= 5) return "bg-yellow-500";
  return "bg-red-400";
}

// ── Main component ──────────────────────────────────────────────────
export default function ComparePage() {
  const [hustle1Id, setHustle1Id] = useState("");
  const [hustle2Id, setHustle2Id] = useState("");

  const hustle1 = hustles.find((h) => h.id === hustle1Id);
  const hustle2 = hustles.find((h) => h.id === hustle2Id);

  const bothSelected = hustle1 && hustle2;

  // Determine winner
  const winner = useMemo(() => {
    if (!hustle1 || !hustle2) return null;
    const score1 = metricLabels.reduce((sum, m) => sum + hustle1[m.key], 0);
    const score2 = metricLabels.reduce((sum, m) => sum + hustle2[m.key], 0);
    if (score1 > score2) return hustle1.id;
    if (score2 > score1) return hustle2.id;
    return null;
  }, [hustle1, hustle2]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Badge variant="outline" className="mb-4">
            <BarChart3 className="w-3 h-3 mr-1.5" />
            Comparison Tool
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            Compare <span className="text-gradient">Side Hustles</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Pick any two side hustles and see how they stack up across income, cost, difficulty, and more.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Selectors */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Hustle 1 */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Select Hustle 1</label>
            <select
              value={hustle1Id}
              onChange={(e) => setHustle1Id(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="">-- Choose a side hustle --</option>
              {hustles.map((h) => (
                <option key={h.id} value={h.id} disabled={h.id === hustle2Id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          {/* VS badge */}
          <div className="hidden md:flex items-end justify-start">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Select Hustle 2</label>
              <select
                value={hustle2Id}
                onChange={(e) => setHustle2Id(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">-- Choose a side hustle --</option>
                {hustles.map((h) => (
                  <option key={h.id} value={h.id} disabled={h.id === hustle1Id}>
                    {h.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile hustle 2 */}
          <div className="md:hidden">
            <label className="block text-sm font-semibold text-foreground mb-2">Select Hustle 2</label>
            <select
              value={hustle2Id}
              onChange={(e) => setHustle2Id(e.target.value)}
              className="w-full h-12 px-4 rounded-xl border-2 border-border bg-white text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="">-- Choose a side hustle --</option>
              {hustles.map((h) => (
                <option key={h.id} value={h.id} disabled={h.id === hustle1Id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison display */}
        <AnimatePresence mode="wait">
          {bothSelected ? (
            <motion.div
              key={`${hustle1.id}-${hustle2.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Winner badge + hustle headers */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-8">
                {/* Hustle 1 header */}
                <Card className={`text-center p-6 ${winner === hustle1.id ? "border-primary border-2 shadow-lg" : ""}`}>
                  <div className="relative inline-block">
                    {winner === hustle1.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3"
                      >
                        <Badge className="bg-primary text-white shadow-sm text-xs px-1.5 py-0.5">
                          <Award className="w-3 h-3 mr-0.5" /> Winner
                        </Badge>
                      </motion.div>
                    )}
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <hustle1.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold">{hustle1.name}</h3>
                </Card>

                {/* VS */}
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-heading font-extrabold text-sm text-gray-500">VS</span>
                  </div>
                </div>

                {/* Hustle 2 header */}
                <Card className={`text-center p-6 ${winner === hustle2.id ? "border-primary border-2 shadow-lg" : ""}`}>
                  <div className="relative inline-block">
                    {winner === hustle2.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-3 -right-3"
                      >
                        <Badge className="bg-primary text-white shadow-sm text-xs px-1.5 py-0.5">
                          <Award className="w-3 h-3 mr-0.5" /> Winner
                        </Badge>
                      </motion.div>
                    )}
                    <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <hustle2.icon className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <h3 className="font-heading text-lg font-bold">{hustle2.name}</h3>
                </Card>
              </div>

              {/* Comparison table */}
              <Card className="overflow-hidden mb-8">
                <CardContent className="p-0">
                  {metricLabels.map((metric, i) => {
                    const score1 = hustle1[metric.key];
                    const score2 = hustle2[metric.key];
                    const val1 = getDisplayValue(hustle1, metric.displayKey);
                    const val2 = getDisplayValue(hustle2, metric.displayKey);
                    const better = score1 > score2 ? 1 : score2 > score1 ? 2 : 0;

                    return (
                      <motion.div
                        key={metric.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 py-4 ${
                          i % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } ${i < metricLabels.length - 1 ? "border-b border-border" : ""}`}
                      >
                        {/* Hustle 1 value */}
                        <div className="text-right">
                          <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${better === 1 ? "text-primary" : "text-foreground"}`}>
                            {better === 1 && <CheckCircle2 className="w-4 h-4 text-primary" />}
                            {val1}
                          </span>
                          <div className="flex justify-end mt-1.5">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${getScoreColor(score1)}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${score1 * 10}%` }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Metric label */}
                        <div className="text-center min-w-[100px]">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {metric.label}
                          </span>
                        </div>

                        {/* Hustle 2 value */}
                        <div className="text-left">
                          <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${better === 2 ? "text-primary" : "text-foreground"}`}>
                            {val2}
                            {better === 2 && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          </span>
                          <div className="mt-1.5">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${getScoreColor(score2)}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${score2 * 10}%` }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Required skills comparison */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-heading text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">
                      Required Skills - {hustle1.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hustle1.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-heading text-sm font-bold mb-3 text-muted-foreground uppercase tracking-wider">
                      Required Skills - {hustle2.name}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hustle2.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Visual bar chart */}
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-heading text-lg font-bold mb-6 text-center">Score Breakdown</h4>
                  <div className="space-y-4">
                    {metricLabels.map((metric, i) => {
                      const score1 = hustle1[metric.key];
                      const score2 = hustle2[metric.key];
                      return (
                        <div key={metric.key}>
                          <div className="text-xs font-semibold text-muted-foreground mb-2 text-center uppercase tracking-wider">
                            {metric.label}
                          </div>
                          <div className="flex items-center gap-3">
                            {/* Hustle 1 bar (right-aligned) */}
                            <div className="flex-1 flex justify-end">
                              <div className="w-full max-w-[200px] h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                                <motion.div
                                  className="absolute right-0 h-full bg-primary rounded-lg"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${score1 * 10}%` }}
                                  transition={{ duration: 0.6, delay: i * 0.05 }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                                  {score1}/10
                                </span>
                              </div>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-6 bg-border" />

                            {/* Hustle 2 bar (left-aligned) */}
                            <div className="flex-1">
                              <div className="w-full max-w-[200px] h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                                <motion.div
                                  className="absolute left-0 h-full bg-secondary rounded-lg"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${score2 * 10}%` }}
                                  transition={{ duration: 0.6, delay: i * 0.05 }}
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white mix-blend-difference">
                                  {score2}/10
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 pt-4 border-t border-border mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-sm" />
                        <span className="text-xs font-medium text-muted-foreground">{hustle1.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-secondary rounded-sm" />
                        <span className="text-xs font-medium text-muted-foreground">{hustle2.name}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-gray-400 mb-2">
                Select Two Side Hustles to Compare
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Use the dropdowns above to pick two side hustles and see a detailed side-by-side comparison.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
