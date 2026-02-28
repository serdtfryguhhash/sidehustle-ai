"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, ArrowRight, Zap, CheckCircle2, Sparkles,
  Clock, DollarSign, PenTool, Palette, Code, TrendingUp,
  BookOpen, Camera, Calculator, Clipboard, Target,
  Edit, Hammer, Users, ShoppingBag, Video, EyeOff,
  Shield, Rocket, Moon, Sun, Briefcase, GraduationCap,
  Home, Search, Star,
} from "lucide-react";
import { quizQuestions } from "@/data/quiz";
import { scoreQuizResults } from "@/data/quiz";

const iconMap: Record<string, React.ElementType> = {
  Clock, DollarSign, PenTool, Palette, Code, TrendingUp,
  BookOpen, Camera, Calculator, Clipboard, Target, Zap,
  Edit, Hammer, Users, ShoppingBag, Video, EyeOff,
  Shield, Rocket, Moon, Sun, Briefcase, GraduationCap,
  Home, Search, Star,
};

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [isCompleting, setIsCompleting] = useState(false);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isAnswered = answers[question.id] !== undefined;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleSingleSelect = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  }, [question.id]);

  const handleMultipleSelect = useCallback((value: string) => {
    setAnswers((prev) => {
      const current = (prev[question.id] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [question.id]: updated };
    });
  }, [question.id]);

  const handleNext = () => {
    if (isLastQuestion) {
      handleComplete();
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    const results = scoreQuizResults(answers);
    const topHustles = results.slice(0, 5).map((r) => r.hustleSlug);

    // Store results in sessionStorage for the results page
    sessionStorage.setItem(
      "quizResults",
      JSON.stringify({ answers, topHustles, scores: results.slice(0, 10) })
    );

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/results");
  };

  const isMultipleValid =
    question.type === "multiple"
      ? ((answers[question.id] as string[]) || []).length > 0
      : true;

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
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {!isCompleting ? (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {question.question}
                  </h1>
                  {question.subtitle && (
                    <p className="text-muted-foreground">{question.subtitle}</p>
                  )}
                  {question.type === "multiple" && (
                    <Badge variant="outline" className="mt-2">Select all that apply</Badge>
                  )}
                </div>

                <div className={`grid gap-3 ${question.options.length > 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                  {question.options.map((option) => {
                    const Icon = option.icon ? iconMap[option.icon] : null;
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
                        {Icon && (
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                            {option.label}
                          </div>
                          {option.description && (
                            <div className="text-xs text-muted-foreground mt-0.5">{option.description}</div>
                          )}
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-3">Analyzing Your Answers...</h2>
                <p className="text-muted-foreground mb-8">
                  Our AI is matching you with the perfect side hustles based on your unique profile.
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      {!isCompleting && (
        <div className="bg-white border-t border-border">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isAnswered || !isMultipleValid}
              className="gap-1.5"
            >
              {isLastQuestion ? (
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
      )}
    </div>
  );
}
