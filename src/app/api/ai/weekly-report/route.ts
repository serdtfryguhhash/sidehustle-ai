import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { incomeThisWeek, tasksCompleted, hustleHours, activeHustles, goals, streak, level } = body;

    const response = await chat([
      {
        role: "system",
        content: `You are SideHustle.ai's weekly report analyst. Create a concise, encouraging weekly hustle report.

Return a JSON object with:
- "summary": 2-3 sentence overview of the week
- "highlights": array of 3 highlight strings (achievements, milestones, etc.)
- "incomeInsight": string analyzing income performance
- "productivityScore": number 1-10 rating their week
- "tipsForNextWeek": array of 3 specific, actionable tips for next week
- "motivationalQuote": an inspiring quote about hustling or entrepreneurship

Be specific, reference the actual numbers, and be encouraging. Only return valid JSON.`,
      },
      {
        role: "user",
        content: `Generate my weekly hustle report:
- Income this week: $${incomeThisWeek || 0}
- Tasks completed: ${tasksCompleted || 0}
- Hours hustled: ${hustleHours || 0}
- Active hustles: ${activeHustles?.join(", ") || "None yet"}
- Goals: ${goals || "Start earning"}
- Current streak: ${streak || 0} days
- Level: ${level || "Dreamer"}`,
      },
    ], { temperature: 0.7, maxTokens: 1024 });

    let report;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      report = JSON.parse(cleaned);
    } catch {
      report = {
        summary: `This week you earned $${incomeThisWeek || 0} and completed ${tasksCompleted || 0} tasks. ${streak > 0 ? `Your ${streak}-day streak shows real dedication!` : "Start building your streak by logging daily progress."}`,
        highlights: [
          `Earned $${incomeThisWeek || 0} this week`,
          `Completed ${tasksCompleted || 0} tasks`,
          `${streak || 0}-day hustle streak`,
        ],
        incomeInsight: incomeThisWeek > 0
          ? `You brought in $${incomeThisWeek} this week. Keep pushing to grow this number.`
          : "No income logged this week. Focus on revenue-generating activities next week.",
        productivityScore: Math.min(Math.max(Math.round(((tasksCompleted || 0) / 5) * 10), 1), 10),
        tipsForNextWeek: [
          "Set a specific income target for next week",
          "Dedicate your first hour each day to client outreach",
          "Track your time to identify your most productive hours",
        ],
        motivationalQuote: "The secret of getting ahead is getting started. - Mark Twain",
      };
    }

    return NextResponse.json({ success: true, report });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to generate weekly report";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
