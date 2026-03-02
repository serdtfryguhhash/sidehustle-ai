import { NextRequest, NextResponse } from "next/server";
import { chat } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { hustleName, skills, availableHours, capital, goals } = body;

    if (!hustleName) {
      return NextResponse.json(
        { error: "Hustle name is required" },
        { status: 400 }
      );
    }

    const response = await chat([
      {
        role: "system",
        content: `You are SideHustle.ai's playbook generator. Create a personalized step-by-step business plan.

Return a JSON object with:
- "title": playbook title
- "summary": 1-2 sentence summary
- "estimatedWeeks": number of weeks to complete
- "steps": array of steps, each with:
  - "id": unique string id (e.g. "step-1")
  - "title": step title
  - "description": detailed description (2-3 sentences)
  - "estimatedHours": estimated hours to complete
  - "week": which week (1-4)
  - "tasks": array of 2-3 sub-task strings
  - "tip": optional pro tip

Generate 8-12 steps spread across 4 weeks. Be specific and actionable.
Only return valid JSON, no other text.`,
      },
      {
        role: "user",
        content: `Create a personalized playbook for: ${hustleName}.
Skills: ${skills?.join(", ") || "General"}.
Available hours/week: ${availableHours || 10}.
Starting capital: $${capital || 0}.
Goals: ${goals || "Start earning income"}.`,
      },
    ], { temperature: 0.7, maxTokens: 4096 });

    let playbook;
    try {
      const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      playbook = JSON.parse(cleaned);
    } catch {
      playbook = {
        title: `${hustleName} Launch Playbook`,
        summary: `A personalized 4-week plan to launch and grow your ${hustleName} side hustle.`,
        estimatedWeeks: 4,
        steps: [
          { id: "step-1", title: "Research & Planning", description: "Research your target market and competition. Define your unique value proposition.", estimatedHours: 3, week: 1, tasks: ["Research 5 competitors", "Define target audience", "Write value proposition"], tip: "Spend time understanding what makes you unique." },
          { id: "step-2", title: "Setup & Branding", description: "Create your brand identity and set up essential accounts and tools.", estimatedHours: 4, week: 1, tasks: ["Choose a brand name", "Create logo with Canva", "Set up social profiles"] },
          { id: "step-3", title: "Create Your Offer", description: "Define your services or products with clear pricing and deliverables.", estimatedHours: 2, week: 1, tasks: ["Define service packages", "Set pricing strategy", "Write service descriptions"] },
          { id: "step-4", title: "Build Your Presence", description: "Create a simple website or portfolio to showcase your work.", estimatedHours: 5, week: 2, tasks: ["Build portfolio site", "Write compelling copy", "Add testimonials or samples"] },
          { id: "step-5", title: "Create Content", description: "Produce content that demonstrates your expertise and attracts clients.", estimatedHours: 4, week: 2, tasks: ["Write 3 blog posts or samples", "Create social media content", "Film intro video"] },
          { id: "step-6", title: "Start Outreach", description: "Begin reaching out to potential clients and marketing your services.", estimatedHours: 5, week: 3, tasks: ["Send 20 personalized pitches", "Join relevant communities", "Post in job boards"] },
          { id: "step-7", title: "Land First Client", description: "Close your first deal and deliver outstanding work.", estimatedHours: 6, week: 3, tasks: ["Follow up on pitches", "Negotiate terms", "Deliver first project"], tip: "Over-deliver on your first project to earn referrals." },
          { id: "step-8", title: "Systematize & Scale", description: "Create systems for efficiency and plan your growth strategy.", estimatedHours: 3, week: 4, tasks: ["Create workflow templates", "Set up invoicing", "Plan next 90 days"] },
        ],
      };
    }

    return NextResponse.json({ success: true, playbook });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to generate playbook";
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
