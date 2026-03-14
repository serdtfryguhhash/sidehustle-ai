"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  CheckCircle2,
  Sparkles,
  Clock,
  DollarSign,
  Code,
  PenTool,
  Palette,
  TrendingUp,
  BookOpen,
  Video,
  GraduationCap,
  ShoppingBag,
  Target,
  RotateCcw,
  Star,
  BarChart3,
  Rocket,
  Cpu,
  Megaphone,
  Lightbulb,
  MapPin,
  Moon,
} from "lucide-react";

// ── Quiz questions (5 steps) ────────────────────────────────────────
interface QuizOption {
  id: string;
  label: string;
  value: string;
  icon: React.ElementType;
  description?: string;
}

interface QuizStep {
  id: number;
  question: string;
  subtitle: string;
  type: "single" | "multiple";
  options: QuizOption[];
}

const quizSteps: QuizStep[] = [
  {
    id: 1,
    question: "How many hours per week can you dedicate?",
    subtitle: "Be honest - consistency matters more than volume",
    type: "single",
    options: [
      { id: "h1", label: "1-5 hours", value: "1-5", icon: Clock, description: "A few hours on weekends" },
      { id: "h2", label: "5-10 hours", value: "5-10", icon: Clock, description: "About an hour a day" },
      { id: "h3", label: "10-20 hours", value: "10-20", icon: Clock, description: "Serious commitment" },
      { id: "h4", label: "20+ hours", value: "20+", icon: Clock, description: "Practically part-time" },
    ],
  },
  {
    id: 2,
    question: "What's your budget to start?",
    subtitle: "Some hustles need zero dollars, others need seed capital",
    type: "single",
    options: [
      { id: "b1", label: "$0 (Free)", value: "free", icon: DollarSign, description: "Zero investment needed" },
      { id: "b2", label: "Under $100", value: "under100", icon: DollarSign, description: "Coffee money" },
      { id: "b3", label: "$100 - $500", value: "100-500", icon: DollarSign, description: "Moderate investment" },
      { id: "b4", label: "$500+", value: "500+", icon: DollarSign, description: "Ready to invest seriously" },
    ],
  },
  {
    id: 3,
    question: "What are your top skills?",
    subtitle: "Select all that apply - we'll match hustles to your strengths",
    type: "multiple",
    options: [
      { id: "s1", label: "Writing", value: "writing", icon: PenTool },
      { id: "s2", label: "Design", value: "design", icon: Palette },
      { id: "s3", label: "Coding", value: "coding", icon: Code },
      { id: "s4", label: "Marketing", value: "marketing", icon: Megaphone },
      { id: "s5", label: "Video", value: "video", icon: Video },
      { id: "s6", label: "Teaching", value: "teaching", icon: GraduationCap },
      { id: "s7", label: "Sales", value: "sales", icon: ShoppingBag },
      { id: "s8", label: "Other", value: "other", icon: Lightbulb },
    ],
  },
  {
    id: 4,
    question: "How quickly do you need income?",
    subtitle: "Some hustles pay fast, others build slow but pay big",
    type: "single",
    options: [
      { id: "t1", label: "This week", value: "this-week", icon: Zap, description: "I need income ASAP" },
      { id: "t2", label: "This month", value: "this-month", icon: Target, description: "Can wait a bit" },
      { id: "t3", label: "In 3 months", value: "3-months", icon: TrendingUp, description: "Willing to build" },
      { id: "t4", label: "No rush", value: "no-rush", icon: Moon, description: "Playing the long game" },
    ],
  },
  {
    id: 5,
    question: "What interests you most?",
    subtitle: "Pick the category that excites you",
    type: "single",
    options: [
      { id: "i1", label: "Creative Work", value: "creative", icon: Palette, description: "Writing, design, video, content" },
      { id: "i2", label: "Tech / Digital", value: "tech", icon: Cpu, description: "Coding, SaaS, AI, automation" },
      { id: "i3", label: "Physical / Local", value: "physical", icon: MapPin, description: "Services, tutoring, flipping" },
      { id: "i4", label: "Passive Income", value: "passive", icon: Moon, description: "Courses, templates, affiliates" },
    ],
  },
];

// ── Hustle database for matching ────────────────────────────────────
interface HustleResult {
  name: string;
  incomeRange: string;
  timeToIncome: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  icon: React.ElementType;
  tags: string[];
  slug: string;
}

const hustleDatabase: HustleResult[] = [
  { name: "Freelance Writing", incomeRange: "$500 - $5,000/mo", timeToIncome: "1-2 weeks", difficulty: "Beginner", icon: PenTool, tags: ["writing", "creative", "free", "under100", "this-week", "this-month", "1-5", "5-10"], slug: "freelance-writing" },
  { name: "Web Development", incomeRange: "$2,000 - $15,000/mo", timeToIncome: "2-4 weeks", difficulty: "Intermediate", icon: Code, tags: ["coding", "tech", "free", "under100", "this-month", "3-months", "10-20", "20+"], slug: "web-development" },
  { name: "Print on Demand", incomeRange: "$200 - $5,000/mo", timeToIncome: "2-6 weeks", difficulty: "Beginner", icon: Palette, tags: ["design", "creative", "passive", "under100", "100-500", "this-month", "3-months", "1-5", "5-10"], slug: "print-on-demand" },
  { name: "YouTube Channel", incomeRange: "$500 - $20,000/mo", timeToIncome: "3-6 months", difficulty: "Intermediate", icon: Video, tags: ["video", "creative", "100-500", "500+", "3-months", "no-rush", "10-20", "20+"], slug: "youtube-channel" },
  { name: "AI Automation Services", incomeRange: "$3,000 - $20,000/mo", timeToIncome: "2-4 weeks", difficulty: "Advanced", icon: Cpu, tags: ["coding", "tech", "free", "under100", "this-month", "3-months", "10-20", "20+"], slug: "ai-automation-services" },
  { name: "Online Course Creation", incomeRange: "$1,000 - $10,000/mo", timeToIncome: "1-3 months", difficulty: "Intermediate", icon: GraduationCap, tags: ["teaching", "passive", "creative", "under100", "100-500", "3-months", "no-rush", "5-10", "10-20"], slug: "online-course-creation" },
  { name: "Dropshipping", incomeRange: "$500 - $10,000/mo", timeToIncome: "2-4 weeks", difficulty: "Intermediate", icon: ShoppingBag, tags: ["sales", "marketing", "tech", "100-500", "500+", "this-month", "3-months", "10-20", "20+"], slug: "dropshipping" },
  { name: "Social Media Management", incomeRange: "$1,000 - $5,000/mo", timeToIncome: "1-2 weeks", difficulty: "Beginner", icon: Megaphone, tags: ["marketing", "creative", "free", "under100", "this-week", "this-month", "5-10", "10-20"], slug: "social-media-management" },
  { name: "SaaS Micro-Product", incomeRange: "$1,000 - $25,000/mo", timeToIncome: "2-6 months", difficulty: "Advanced", icon: Rocket, tags: ["coding", "tech", "100-500", "500+", "3-months", "no-rush", "20+"], slug: "saas-micro-product" },
  { name: "Tutoring / Coaching", incomeRange: "$500 - $5,000/mo", timeToIncome: "< 1 week", difficulty: "Beginner", icon: BookOpen, tags: ["teaching", "physical", "free", "under100", "this-week", "this-month", "1-5", "5-10", "10-20"], slug: "tutoring" },
  { name: "Affiliate Marketing", incomeRange: "$300 - $10,000/mo", timeToIncome: "1-3 months", difficulty: "Intermediate", icon: TrendingUp, tags: ["marketing", "writing", "passive", "free", "under100", "3-months", "no-rush", "1-5", "5-10"], slug: "affiliate-marketing" },
  { name: "Graphic Design", incomeRange: "$1,000 - $8,000/mo", timeToIncome: "1-2 weeks", difficulty: "Intermediate", icon: Palette, tags: ["design", "creative", "free", "under100", "this-week", "this-month", "5-10", "10-20"], slug: "graphic-design" },
  { name: "Virtual Assistant", incomeRange: "$500 - $3,000/mo", timeToIncome: "< 1 week", difficulty: "Beginner", icon: BookOpen, tags: ["other", "physical", "free", "this-week", "this-month", "1-5", "5-10", "10-20"], slug: "virtual-assistant" },
  { name: "Flipping & Reselling", incomeRange: "$500 - $5,000/mo", timeToIncome: "< 1 week", difficulty: "Beginner", icon: ShoppingBag, tags: ["sales", "physical", "under100", "100-500", "this-week", "this-month", "5-10", "10-20"], slug: "flipping-reselling" },
  { name: "Digital Templates", incomeRange: "$300 - $5,000/mo", timeToIncome: "2-4 weeks", difficulty: "Beginner", icon: Lightbulb, tags: ["design", "coding", "passive", "free", "under100", "this-month", "3-months", "1-5", "5-10"], slug: "digital-templates" },
];

// ── Matching logic ──────────────────────────────────────────────────
interface MatchedHustle extends HustleResult {
  matchScore: number;
}

function matchHustles(answers: Record<number, string | string[]>): MatchedHustle[] {
  const allValues: string[] = [];
  Object.values(answers).forEach((val) => {
    if (Array.isArray(val)) {
      allValues.push(...val);
    } else {
      allValues.push(val);
    }
  });

  const scored: MatchedHustle[] = hustleDatabase.map((hustle) => {
    let score = 0;
    allValues.forEach((val) => {
      if (hustle.tags.includes(val)) score += 1;
    });
    // Scale to 85-98%
    const maxPossible = allValues.length;
    const rawPercent = maxPossible > 0 ? score / maxPossible : 0;
    const matchScore = Math.round(85 + rawPercent * 13);
    return { ...hustle, matchScore };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, 3);
}

// ── Confetti particles ──────────────────────────────────────────────
function ConfettiParticle({ delay, x }: { delay: number; x: number }) {
  const colors = ["#059669", "#0D9488", "#F59E0B", "#3B82F6", "#EC4899", "#8B5CF6"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 6 + Math.random() * 6;

  return (
    <motion.div
      className="absolute rounded-sm"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        left: `${x}%`,
        top: -10,
      }}
      initial={{ y: -20, opacity: 1, rotate: 0 }}
      animate={{
        y: [0, 300 + Math.random() * 200],
        opacity: [1, 1, 0],
        rotate: [0, 360 + Math.random() * 360],
        x: [0, (Math.random() - 0.5) * 120],
      }}
      transition={{
        duration: 2 + Math.random() * 1.5,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

// ── Slide variants ──────────────────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// ── Main component ──────────────────────────────────────────────────
export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const question = quizSteps[step];
  const progressValue = showResults ? 100 : ((step + 1) / quizSteps.length) * 100;
  const isAnswered = question
    ? question.type === "multiple"
      ? ((answers[question.id] as string[]) || []).length > 0
      : answers[question.id] !== undefined
    : false;

  const handleSingleSelect = useCallback(
    (value: string) => {
      setAnswers((prev) => ({ ...prev, [question.id]: value }));
    },
    [question?.id]
  );

  const handleMultipleSelect = useCallback(
    (value: string) => {
      setAnswers((prev) => {
        const current = (prev[question.id] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [question.id]: updated };
      });
    },
    [question?.id]
  );

  const handleNext = () => {
    if (step === quizSteps.length - 1) {
      setIsAnalyzing(true);
      setDirection(1);
      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResults(true);
      }, 2200);
    } else {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((prev) => prev - 1);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setStep(0);
    setShowResults(false);
    setDirection(-1);
    setIsAnalyzing(false);
  };

  const results = useMemo(() => {
    if (!showResults) return [];
    return matchHustles(answers);
  }, [showResults, answers]);

  // Confetti pieces
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        delay: Math.random() * 0.8,
        x: Math.random() * 100,
      })),
    []
  );

  const getDifficultyColor = (d: string) => {
    if (d === "Beginner") return "bg-green-100 text-green-700";
    if (d === "Intermediate") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  // ── Results view ──────────────────────────────────────────────────
  if (showResults) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        {/* Progress Header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-heading font-bold text-sm">AI Discovery Quiz</span>
              </div>
              <span className="text-sm text-muted-foreground">Complete!</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Confetti container */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none">
              {confettiPieces.map((p) => (
                <ConfettiParticle key={p.id} delay={p.delay} x={p.x} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10 relative z-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
              <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                Your Top 3 Side Hustle Matches
              </h1>
              <p className="text-gray-600 max-w-lg mx-auto">
                Based on your skills, schedule, and goals, here are the hustles our AI recommends for you.
              </p>
            </motion.div>

            {/* Result cards */}
            <div className="space-y-6 relative z-10">
              {results.map((hustle, i) => {
                const Icon = hustle.icon;
                return (
                  <motion.div
                    key={hustle.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          {/* Icon & rank */}
                          <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-2">
                            <div className="relative">
                              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center">
                                <Icon className="w-7 h-7 text-primary" />
                              </div>
                              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                                #{i + 1}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                              <h3 className="font-heading text-xl font-bold text-foreground">
                                {hustle.name}
                              </h3>
                              <Badge className="bg-primary-100 text-primary border-primary-200 w-fit">
                                <Star className="w-3 h-3 mr-1" />
                                {hustle.matchScore}% Match
                              </Badge>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                                <DollarSign className="w-4 h-4 text-primary mx-auto mb-1" />
                                <div className="text-xs text-muted-foreground">Income</div>
                                <div className="text-sm font-semibold text-foreground">{hustle.incomeRange}</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                                <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
                                <div className="text-xs text-muted-foreground">First Income</div>
                                <div className="text-sm font-semibold text-foreground">{hustle.timeToIncome}</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                                <BarChart3 className="w-4 h-4 text-primary mx-auto mb-1" />
                                <div className="text-xs text-muted-foreground">Difficulty</div>
                                <div className="text-sm font-semibold text-foreground">{hustle.difficulty}</div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-2.5 text-center">
                                <Target className="w-4 h-4 text-primary mx-auto mb-1" />
                                <div className="text-xs text-muted-foreground">Match</div>
                                <div className="text-sm font-semibold text-primary">{hustle.matchScore}%</div>
                              </div>
                            </div>

                            {/* Match bar */}
                            <div className="mb-4">
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${hustle.matchScore}%` }}
                                  transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <Badge className={getDifficultyColor(hustle.difficulty) + " border-0"}>
                                {hustle.difficulty}
                              </Badge>
                              <Link href={`/hustles/${hustle.slug}`} className="sm:ml-auto">
                                <Button size="sm" className="gap-1.5">
                                  <Rocket className="w-4 h-4" />
                                  Get Started
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Retake button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-10 relative z-10"
            >
              <Button variant="outline" onClick={handleRetake} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // ── Analyzing screen ──────────────────────────────────────────────
  if (isAnalyzing) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="font-heading font-bold text-sm">AI Discovery Quiz</span>
              </div>
              <span className="text-sm text-muted-foreground">Analyzing...</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-8 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-primary" />
            </motion.div>
            <h2 className="font-heading text-2xl font-bold mb-3">Analyzing Your Answers...</h2>
            <p className="text-muted-foreground mb-8">
              Our AI is matching you with the perfect side hustles based on your unique profile.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Quiz question view ────────────────────────────────────────────
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex flex-col">
      {/* Progress Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-heading font-bold text-sm">AI Discovery Quiz</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Question {step + 1} of {quizSteps.length}
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="text-center mb-8">
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  {question.question}
                </h1>
                <p className="text-muted-foreground">{question.subtitle}</p>
                {question.type === "multiple" && (
                  <Badge variant="outline" className="mt-2">Select all that apply</Badge>
                )}
              </div>

              <div className={`grid gap-3 ${question.options.length > 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                {question.options.map((option) => {
                  const Icon = option.icon;
                  const isSelected =
                    question.type === "multiple"
                      ? ((answers[question.id] as string[]) || []).includes(option.value)
                      : answers[question.id] === option.value;

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() =>
                        question.type === "multiple"
                          ? handleMultipleSelect(option.value)
                          : handleSingleSelect(option.value)
                      }
                      className={`relative flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md ${
                        isSelected
                          ? "border-primary bg-primary-50 shadow-sm"
                          : "border-border bg-white hover:border-primary/30"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-xs text-muted-foreground mt-0.5">{option.description}</div>
                        )}
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack} disabled={step === 0} className="gap-1.5">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button onClick={handleNext} disabled={!isAnswered} className="gap-1.5">
            {step === quizSteps.length - 1 ? (
              <>
                <Sparkles className="w-4 h-4" />
                Get My Results
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
