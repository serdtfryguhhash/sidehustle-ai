import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hustles, userContext } = body;

    if (!hustles || hustles.length === 0) {
      return NextResponse.json(
        { error: "At least one active hustle is required" },
        { status: 400 }
      );
    }

    const response = await chat([
      {
        role: "system",
        content: `You are SideHustle.ai's daily task generator. Generate exactly 3 personalized daily tasks for the user based on their active side hustles. Each task should be specific, actionable, and completable in under 30 minutes.

Return a JSON array with exactly 3 objects, each with:
- "title": short task name (under 60 chars)
- "description": detailed description (1-2 sentences)
- "hustle": which side hustle this relates to
- "estimatedMinutes": estimated time in minutes (5-30)
- "xpReward": XP reward (10-20)

Only return valid JSON, no other text.`,
      },
      {
        role: "user",
        content: `Generate 3 daily tasks for me. My active hustles: ${hustles.join(", ")}. ${userContext || ""}`,
      },
    ], { temperature: 0.8, maxTokens: 1024 });

    let tasks;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      tasks = JSON.parse(cleaned);
    } catch {
      tasks = [
        { title: "Research your target market", description: "Spend 15 minutes researching what your ideal customers need right now.", hustle: hustles[0], estimatedMinutes: 15, xpReward: 15 },
        { title: "Create one piece of content", description: "Write a social media post or short blog entry about your hustle.", hustle: hustles[0], estimatedMinutes: 20, xpReward: 15 },
        { title: "Reach out to a potential client", description: "Send a personalized message to someone who could benefit from your services.", hustle: hustles[0], estimatedMinutes: 10, xpReward: 15 },
      ];
    }

    return NextResponse.json({ success: true, tasks });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to generate daily tasks";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
