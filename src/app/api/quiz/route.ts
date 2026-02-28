import { NextRequest, NextResponse } from "next/server";
import { scoreQuizResults } from "@/data/quiz";

export async function POST(request: NextRequest) {
  try {
    const { answers, userId } = await request.json();

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Valid quiz answers are required" },
        { status: 400 }
      );
    }

    const results = scoreQuizResults(answers);
    const topHustles = results.slice(0, 5).map((r) => r.hustleSlug);
    const allScores = results.slice(0, 10);

    // Generate AI analysis (would use OpenAI in production)
    const aiAnalysis = generateAnalysis(answers, topHustles);

    // If user is logged in, save to database
    if (userId) {
      // In production: save to Supabase quiz_responses table
      // await supabase.from('quiz_responses').insert({ user_id: userId, answers, recommended_hustles: topHustles, ai_analysis: aiAnalysis });
    }

    return NextResponse.json({
      success: true,
      data: {
        topHustles,
        scores: allScores,
        aiAnalysis,
      },
    });
  } catch (error) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateAnalysis(
  answers: Record<number, string | string[]>,
  topHustles: string[]
): string {
  const time = answers[1] as string;
  const budget = answers[2] as string;
  const skills = answers[3] as string[];
  const speed = answers[4] as string;

  let analysis = `Based on your quiz responses, we have identified ${topHustles.length} side hustles that match your profile. `;

  if (time === "minimal" || time === "moderate") {
    analysis += "Since you have limited time available, we have prioritized hustles that can be done in shorter time blocks. ";
  } else {
    analysis += "With your significant time commitment, you can pursue more intensive hustles with higher earning potential. ";
  }

  if (budget === "zero" || budget === "low") {
    analysis += "We focused on low-cost or free-to-start options that do not require upfront investment. ";
  }

  if (skills && skills.length > 0) {
    analysis += `Your skills in ${skills.join(", ")} give you a strong foundation for your recommended hustles. `;
  }

  if (speed === "immediate") {
    analysis += "We prioritized hustles with the fastest time to first income, so you can start earning quickly.";
  } else if (speed === "longterm") {
    analysis += "Since you are thinking long-term, we included hustles with the highest earning potential over time.";
  }

  return analysis;
}
