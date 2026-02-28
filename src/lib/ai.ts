/**
 * SideHustle.ai — AI Client powered by Ollama (local LLM, zero API keys)
 *
 * This connects to Ollama running locally on your Mac.
 * Model: llama3.2 | Endpoint: http://localhost:11434/v1
 */

const OLLAMA_BASE_URL = "http://localhost:11434/v1";
const MODEL = "llama3.2";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: Array<{ message: { role: string; content: string } }>;
}

export async function chat(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {}
): Promise<string> {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.maxTokens ?? 2048,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data.choices[0]?.message?.content ?? "No response generated.";
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Ollama is not running. Open the Ollama app from Applications.");
    }
    throw error;
  }
}

/** Match user quiz answers to ideal side hustles */
export async function matchSideHustles(quizAnswers: {
  skills: string[];
  availableHours: number;
  startingCapital: number;
  riskTolerance: string;
  goals: string[];
  interests: string[];
}): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are SideHustle.ai's recommendation engine. Based on user quiz results,
      recommend the top 5 side hustles that match their profile. For each recommendation:
      1. Name the side hustle
      2. Why it's a match (reference their specific skills/constraints)
      3. Expected income range (monthly, be realistic)
      4. Time to first dollar
      5. First 3 action steps to get started
      Format as JSON array with fields: name, matchScore (0-100), reason, incomeRange, timeToFirstDollar, firstSteps`,
    },
    {
      role: "user",
      content: `Match me to side hustles based on: Skills: ${quizAnswers.skills.join(", ")}.
      Available time: ${quizAnswers.availableHours} hours/week.
      Starting capital: $${quizAnswers.startingCapital}.
      Risk tolerance: ${quizAnswers.riskTolerance}.
      Goals: ${quizAnswers.goals.join(", ")}.
      Interests: ${quizAnswers.interests.join(", ")}.`,
    },
  ]);
}

/** Generate a personalized 30-day launch playbook */
export async function generatePlaybook(hustleName: string, userProfile: {
  skills: string[];
  availableHours: number;
  capital: number;
}): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a side hustle expert creating a personalized 30-day launch plan.
      Create a day-by-day action plan that's specific, actionable, and realistic.
      Week 1: Foundation (setup, research, tools)
      Week 2: Build (create assets, set up systems)
      Week 3: Launch (go live, first customers)
      Week 4: Optimize (refine, scale)
      Include specific tools, platforms, and dollar amounts where relevant.`,
    },
    {
      role: "user",
      content: `Create a 30-day playbook for launching a ${hustleName} side hustle.
      My skills: ${userProfile.skills.join(", ")}.
      Available time: ${userProfile.availableHours} hours/week.
      Starting budget: $${userProfile.capital}.`,
    },
  ], { maxTokens: 4096 });
}

/** Generate income optimization tips */
export async function getIncomeAdvice(hustleName: string, currentIncome: number): Promise<string> {
  return chat([
    {
      role: "system",
      content: `You are a side hustle income optimization expert. Given the user's current
      side hustle and income level, provide 5 specific, actionable strategies to increase
      their earnings. Be specific with numbers and tactics.`,
    },
    {
      role: "user",
      content: `I'm running a ${hustleName} side hustle making $${currentIncome}/month. How can I grow this?`,
    },
  ]);
}

export async function checkAIStatus(): Promise<{ available: boolean; model: string; error?: string }> {
  try {
    const response = await fetch("http://localhost:11434/api/tags");
    if (!response.ok) return { available: false, model: MODEL, error: "Ollama not responding" };
    const data = await response.json();
    const found = data.models?.some((m: { name: string }) => m.name.startsWith(MODEL));
    return { available: !!found, model: MODEL, error: found ? undefined : `Model ${MODEL} not found` };
  } catch {
    return { available: false, model: MODEL, error: "Ollama is not running" };
  }
}
