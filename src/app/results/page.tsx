"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Trophy, ArrowRight, DollarSign, Clock, Target, Zap,
  Star, TrendingUp, Sparkles, BookOpen,

} from "lucide-react";
import { sideHustles } from "@/data/side-hustles";
import { formatCurrency, getDifficultyColor } from "@/lib/utils";
import { SideHustle } from "@/types";

interface QuizResult {
  answers: Record<number, string | string[]>;
  topHustles: string[];
  scores: { hustleSlug: string; score: number }[];
}

export default function ResultsPage() {
  const [results, setResults] = useState<QuizResult | null>(null);
  const [matchedHustles, setMatchedHustles] = useState<(SideHustle & { matchScore: number })[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("quizResults");
    if (stored) {
      const parsed: QuizResult = JSON.parse(stored);
      setResults(parsed);

      const matched = parsed.scores.slice(0, 8).map((score) => {
        const hustle = sideHustles.find((h) => h.slug === score.hustleSlug);
        const maxScore = 30;
        const matchPercent = Math.min(Math.round((score.score / maxScore) * 100), 98);
        return hustle ? { ...hustle, matchScore: Math.max(matchPercent, 40) } : null;
      }).filter(Boolean) as (SideHustle & { matchScore: number })[];

      setMatchedHustles(matched);
    }
  }, []);

  if (!results || matchedHustles.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold mb-2">No Results Found</h1>
          <p className="text-muted-foreground mb-6">Take the quiz first to get your personalized results.</p>
          <Link href="/quiz">
            <Button className="gap-1.5">
              <Zap className="w-4 h-4" />
              Take the Quiz
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const topMatch = matchedHustles[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Result */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-accent" />
            </div>
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Analysis Complete
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">
              Your #1 Match: {topMatch.name}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
              Based on your skills, schedule, and goals, we found {matchedHustles.length} side hustles that are perfect for you. Here are your top matches.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-6 py-3">
              <div className="text-3xl font-extrabold text-accent">{topMatch.matchScore}%</div>
              <div className="text-left text-sm">
                <div className="font-semibold">Match Score</div>
                <div className="text-white/60">Excellent fit</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="space-y-6">
          {matchedHustles.map((hustle, index) => (
            <motion.div
              key={hustle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden ${index === 0 ? "border-primary shadow-lg" : ""}`}>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Rank & Match Score */}
                    <div className={`flex md:flex-col items-center justify-center p-6 md:w-32 ${
                      index === 0 ? "bg-primary text-white" : "bg-gray-50"
                    }`}>
                      <div className="text-center">
                        <div className={`text-sm font-medium mb-1 ${index === 0 ? "text-white/70" : "text-muted-foreground"}`}>
                          #{index + 1}
                        </div>
                        <div className={`text-3xl font-extrabold ${index === 0 ? "text-white" : "text-primary"}`}>
                          {hustle.matchScore}%
                        </div>
                        <div className={`text-xs ${index === 0 ? "text-white/60" : "text-muted-foreground"}`}>
                          Match
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3 gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h2 className="font-heading text-xl font-bold">{hustle.name}</h2>
                            {index === 0 && (
                              <Badge variant="accent" className="text-xs">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Best Match
                              </Badge>
                            )}
                            {hustle.is_trending && (
                              <Badge variant="success" className="text-xs">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm">{hustle.tagline}</p>
                        </div>
                        <Badge className={`${getDifficultyColor(hustle.difficulty).bg} ${getDifficultyColor(hustle.difficulty).text} border-0 whitespace-nowrap`}>
                          {getDifficultyColor(hustle.difficulty).label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                            <DollarSign className="w-3 h-3" /> Income Range
                          </div>
                          <div className="font-semibold text-sm text-primary">
                            {formatCurrency(hustle.income_range_min)} - {formatCurrency(hustle.income_range_max)}/mo
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" /> First Income
                          </div>
                          <div className="font-semibold text-sm">{hustle.time_to_first_income}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                            <Target className="w-3 h-3" /> Startup Cost
                          </div>
                          <div className="font-semibold text-sm">
                            {hustle.startup_cost_min === 0 ? "Free" : formatCurrency(hustle.startup_cost_min)} - {formatCurrency(hustle.startup_cost_max)}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                            <Clock className="w-3 h-3" /> Hours/Week
                          </div>
                          <div className="font-semibold text-sm">
                            {hustle.hours_per_week_min} - {hustle.hours_per_week_max} hrs
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link href={`/hustles/${hustle.slug}`}>
                          <Button size="sm" className="gap-1.5">
                            View Full Profile
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Link href={`/playbook/${hustle.slug}`}>
                          <Button size="sm" variant="outline" className="gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            Get AI Playbook
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-12 mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary/20">
            <CardContent className="p-8">
              <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold mb-2">
                Ready to Launch Your Side Hustle?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Sign up to get unlimited AI-generated playbooks, income tracking, and access to our community of hustlers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/signup">
                  <Button size="lg" className="gap-1.5">
                    <Zap className="w-4 h-4" />
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/hustles">
                  <Button size="lg" variant="outline" className="gap-1.5">
                    Browse All Hustles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
