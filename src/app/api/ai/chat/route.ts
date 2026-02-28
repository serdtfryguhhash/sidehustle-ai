import { NextRequest, NextResponse } from "next/server";
import { chat, matchSideHustles, generatePlaybook, getIncomeAdvice } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, message, quizAnswers, hustleName, userProfile, currentIncome } = body;

    let response: string;

    switch (action) {
      case "match-hustles":
        response = await matchSideHustles(quizAnswers);
        break;
      case "generate-playbook":
        response = await generatePlaybook(hustleName, userProfile);
        break;
      case "income-advice":
        response = await getIncomeAdvice(hustleName, currentIncome);
        break;
      case "chat":
      default:
        response = await chat([
          {
            role: "system",
            content: "You are SideHustle.ai's AI advisor. Help users discover and grow side hustles. Be specific and actionable.",
          },
          { role: "user", content: message },
        ]);
        break;
    }

    return NextResponse.json({ success: true, response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "AI request failed";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    const res = await fetch("http://localhost:11434/api/tags");
    if (!res.ok) return NextResponse.json({ available: false, error: "Ollama not responding" });
    return NextResponse.json({ available: true, model: "llama3.2" });
  } catch {
    return NextResponse.json({ available: false, error: "Ollama is not running" });
  }
}
