import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { hustleSlug, hustleName } = await request.json();

    if (!hustleSlug || !hustleName) {
      return NextResponse.json(
        { error: "Hustle slug and name are required" },
        { status: 400 }
      );
    }

    // In production, this would call OpenAI GPT-4 API
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4",
    //   messages: [{
    //     role: "system",
    //     content: "You are a side hustle expert. Create a detailed, personalized 30-day action plan."
    //   }, {
    //     role: "user",
    //     content: `Create a 30-day playbook for starting a ${hustleName} side hustle.
    //     User experience level: ${userLevel || 'beginner'}.
    //     Include daily tasks with time estimates, tips, and resources.`
    //   }],
    //   temperature: 0.7,
    // });

    return NextResponse.json({
      success: true,
      data: {
        hustleSlug,
        hustleName,
        message: "Playbook generated successfully. In production, this would use GPT-4 for personalized content.",
      },
    });
  } catch (error) {
    console.error("Playbook API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
