"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText, TrendingUp, CheckCircle2, Lightbulb, Star,
  RefreshCw, Quote,
} from "lucide-react";

interface WeeklyReport {
  summary: string;
  highlights: string[];
  incomeInsight: string;
  productivityScore: number;
  tipsForNextWeek: string[];
  motivationalQuote: string;
  generatedAt: string;
}

const WEEKLY_REPORT_KEY = "weekly_report";

export function WeeklyReport() {
  const [report, setReport] = useState<WeeklyReport | null>(null);
  const [loading, setLoading] = useState(false);

  const loadReport = useCallback(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(WEEKLY_REPORT_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as WeeklyReport;
        // Show report if it was generated within the last 7 days
        const generatedAt = new Date(parsed.generatedAt);
        const now = new Date();
        const daysDiff = (now.getTime() - generatedAt.getTime()) / (1000 * 60 * 60 * 24);
        if (daysDiff < 7) {
          setReport(parsed);
        }
      } catch {
        /* empty */
      }
    }
  }, []);

  useEffect(() => {
    loadReport();
  }, [loadReport]);

  const generateReport = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/weekly-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incomeThisWeek: 450,
          tasksCompleted: 12,
          hustleHours: 15,
          activeHustles: ["Freelance Writing", "Social Media Management"],
          goals: "Hit $2,000/month",
          streak: 7,
          level: "Hustler",
        }),
      });
      const data = await res.json();
      if (data.success && data.report) {
        const newReport: WeeklyReport = {
          ...data.report,
          generatedAt: new Date().toISOString(),
        };
        setReport(newReport);
        localStorage.setItem(WEEKLY_REPORT_KEY, JSON.stringify(newReport));
      }
    } catch {
      // Fallback report
      const fallback: WeeklyReport = {
        summary: "You earned $450 this week and completed 12 tasks across your hustles. Your 7-day streak shows real consistency!",
        highlights: [
          "Earned $450 from your side hustles",
          "Completed 12 tasks this week",
          "Maintained a 7-day hustle streak",
        ],
        incomeInsight: "You are on track for $1,800 this month. Push for a few more client projects to hit your $2,000 goal.",
        productivityScore: 7,
        tipsForNextWeek: [
          "Pitch 3 new potential clients for retainer work",
          "Create a content calendar for next month",
          "Spend 1 hour optimizing your rates based on market research",
        ],
        motivationalQuote: "The secret of getting ahead is getting started. - Mark Twain",
        generatedAt: new Date().toISOString(),
      };
      setReport(fallback);
      localStorage.setItem(WEEKLY_REPORT_KEY, JSON.stringify(fallback));
    } finally {
      setLoading(false);
    }
  };

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Weekly Hustle Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <FileText className="w-10 h-10 text-primary/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              Get AI-powered insights on your weekly hustle performance
            </p>
            <Button onClick={generateReport} disabled={loading} className="gap-1.5">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Generating Report..." : "Generate Weekly Report"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Weekly Report
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Score: {report.productivityScore}/10
            </Badge>
            <Button variant="ghost" size="sm" onClick={generateReport} disabled={loading} className="h-7 w-7 p-0">
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <p className="text-sm">{report.summary}</p>

        {/* Highlights */}
        <div>
          <div className="text-xs font-medium mb-2 flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-accent" />
            Highlights
          </div>
          <div className="space-y-1.5">
            {report.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                {highlight}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Income Insight */}
        <div className="bg-primary-50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Income Insight</span>
          </div>
          <p className="text-xs text-muted-foreground">{report.incomeInsight}</p>
        </div>

        {/* Tips */}
        <div>
          <div className="text-xs font-medium mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5 text-accent" />
            Tips for Next Week
          </div>
          <div className="space-y-1.5">
            {report.tipsForNextWeek.map((tip, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-primary font-medium">{i + 1}.</span>
                {tip}
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
          <Quote className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-xs italic text-muted-foreground">{report.motivationalQuote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
