"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DollarSign, Clock, Target, TrendingUp, CheckCircle2,
  XCircle, ArrowRight, BookOpen, Star, Zap, Share2,
  ChevronRight, Lightbulb, Calendar, BarChart3,
  ArrowLeft,
} from "lucide-react";
import { getHustleBySlug, sideHustles } from "@/data/side-hustles";
import { formatCurrency, getDifficultyColor, getCategoryLabel } from "@/lib/utils";

export default function HustleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const hustle = getHustleBySlug(slug);

  if (!hustle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-2">Side Hustle Not Found</h1>
          <p className="text-muted-foreground mb-6">The side hustle you are looking for does not exist.</p>
          <Link href="/hustles">
            <Button className="gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              Browse All Hustles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedHustles = sideHustles
    .filter((h) => h.category === hustle.category && h.id !== hustle.id)
    .slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/hustles" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Hustles
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gray-100 text-gray-600 border-0">{getCategoryLabel(hustle.category)}</Badge>
                <Badge className={`${getDifficultyColor(hustle.difficulty).bg} ${getDifficultyColor(hustle.difficulty).text} border-0`}>
                  {getDifficultyColor(hustle.difficulty).label}
                </Badge>
                {hustle.is_trending && (
                  <Badge variant="accent">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {hustle.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">{hustle.tagline}</p>

              <div className="flex flex-wrap gap-3">
                <Link href={`/playbook/${hustle.slug}`}>
                  <Button size="lg" className="gap-1.5">
                    <BookOpen className="w-4 h-4" />
                    Get 30-Day Playbook
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-1.5">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:w-80 shrink-0">
              <Card>
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Monthly Income
                    </span>
                    <span className="font-bold text-primary">
                      {formatCurrency(hustle.income_range_min)} - {formatCurrency(hustle.income_range_max)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-secondary" />
                      Startup Cost
                    </span>
                    <span className="font-bold">
                      {hustle.startup_cost_min === 0 ? "Free" : formatCurrency(hustle.startup_cost_min)} - {formatCurrency(hustle.startup_cost_max)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-accent" />
                      Time to Income
                    </span>
                    <span className="font-bold">{hustle.time_to_first_income}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      Hours/Week
                    </span>
                    <span className="font-bold">{hustle.hours_per_week_min} - {hustle.hours_per_week_max} hrs</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      Popularity
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.round(hustle.popularity_score / 20)
                              ? "fill-accent text-accent"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Side Hustle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{hustle.description}</p>
              </CardContent>
            </Card>

            {/* Earning Potential */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Earning Potential
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">{hustle.earning_potential_description}</p>
              </CardContent>
            </Card>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    Pros
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {hustle.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <XCircle className="w-5 h-5" />
                    Cons
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2.5">
                    {hustle.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2 text-sm">
                        <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span className="text-gray-600">{con}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* 30-Day Launch Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  30-Day Launch Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {hustle.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-8 pb-6 last:pb-0"
                    >
                      {index < hustle.steps.length - 1 && (
                        <div className="absolute left-[11px] top-8 w-0.5 h-[calc(100%-16px)] bg-primary/20" />
                      )}
                      <div className="absolute left-0 top-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">{index + 1}</span>
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2 text-xs">{step.day}</Badge>
                        <h4 className="font-heading font-bold text-lg mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                        <ul className="space-y-1.5">
                          {step.tasks.map((task) => (
                            <li key={task} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span className="text-gray-600">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Success Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" />
                  Tips for Success
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {hustle.success_tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-sm">
                      <Star className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 shrink-0 space-y-6">
            {/* Skills Required */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {hustle.skills_required.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tools Needed */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tools Needed</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {hustle.tools_needed.map((tool) => (
                    <li key={tool} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                      {tool}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary/20">
              <CardContent className="p-5 text-center">
                <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-bold mb-2">Get Your Personalized Playbook</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  AI-generated 30-day action plan customized to your experience level and goals.
                </p>
                <Link href={`/playbook/${hustle.slug}`}>
                  <Button className="w-full gap-1.5" size="sm">
                    <Zap className="w-3.5 h-3.5" />
                    Generate Playbook
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Related Hustles */}
            {relatedHustles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Related Side Hustles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {relatedHustles.map((related) => (
                      <Link
                        key={related.id}
                        href={`/hustles/${related.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                          <DollarSign className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                            {related.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatCurrency(related.income_range_min)}-{formatCurrency(related.income_range_max)}/mo
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
