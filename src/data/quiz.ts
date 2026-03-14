import { QuizQuestion } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How much time can you dedicate to a side hustle each week?",
    subtitle: "Be honest - consistency matters more than volume",
    type: "single",
    options: [
      { id: "time-1", label: "1-5 hours", value: "minimal", icon: "Clock", description: "A few hours on weekends" },
      { id: "time-2", label: "5-10 hours", value: "moderate", icon: "Clock", description: "About an hour a day" },
      { id: "time-3", label: "10-20 hours", value: "significant", icon: "Clock", description: "Serious commitment" },
      { id: "time-4", label: "20+ hours", value: "full", icon: "Clock", description: "Practically part-time" },
    ],
  },
  {
    id: 2,
    question: "How much are you willing to invest upfront?",
    subtitle: "Some hustles need zero dollars, others need seed capital",
    type: "single",
    options: [
      { id: "budget-1", label: "$0 - Zero investment", value: "zero", icon: "DollarSign", description: "Free to start" },
      { id: "budget-2", label: "$1-100", value: "low", icon: "DollarSign", description: "Coffee money" },
      { id: "budget-3", label: "$100-1,000", value: "medium", icon: "DollarSign", description: "Moderate investment" },
      { id: "budget-4", label: "$1,000+", value: "high", icon: "DollarSign", description: "Ready to invest seriously" },
    ],
  },
  {
    id: 3,
    question: "What skills do you already have?",
    subtitle: "Select all that apply - we will match you to hustles that leverage your strengths",
    type: "multiple",
    options: [
      { id: "skill-1", label: "Writing & Communication", value: "writing", icon: "PenTool" },
      { id: "skill-2", label: "Design & Visual Arts", value: "design", icon: "Palette" },
      { id: "skill-3", label: "Programming & Tech", value: "tech", icon: "Code" },
      { id: "skill-4", label: "Marketing & Sales", value: "marketing", icon: "TrendingUp" },
      { id: "skill-5", label: "Teaching & Coaching", value: "teaching", icon: "BookOpen" },
      { id: "skill-6", label: "Photography & Video", value: "media", icon: "Camera" },
      { id: "skill-7", label: "Finance & Numbers", value: "finance", icon: "Calculator" },
      { id: "skill-8", label: "Organization & Admin", value: "organization", icon: "Clipboard" },
    ],
  },
  {
    id: 4,
    question: "How quickly do you need to start earning?",
    subtitle: "Some hustles pay fast, others build slow but pay big",
    type: "single",
    options: [
      { id: "speed-1", label: "This week!", value: "immediate", icon: "Zap", description: "I need income ASAP" },
      { id: "speed-2", label: "Within a month", value: "soon", icon: "Zap", description: "Can wait a bit" },
      { id: "speed-3", label: "1-3 months", value: "patient", icon: "Zap", description: "Willing to build" },
      { id: "speed-4", label: "I'm building long-term", value: "longterm", icon: "Zap", description: "Playing the long game" },
    ],
  },
  {
    id: 5,
    question: "What is your income goal from a side hustle?",
    subtitle: "Monthly income target to aim for",
    type: "single",
    options: [
      { id: "income-1", label: "$500/month", value: "500", icon: "Target", description: "Nice supplemental income" },
      { id: "income-2", label: "$1,000-2,000/month", value: "2000", icon: "Target", description: "Meaningful side income" },
      { id: "income-3", label: "$3,000-5,000/month", value: "5000", icon: "Target", description: "Could replace a job" },
      { id: "income-4", label: "$5,000+/month", value: "10000", icon: "Target", description: "Building real wealth" },
    ],
  },
  {
    id: 6,
    question: "What type of work energizes you?",
    subtitle: "Your side hustle should not feel like a second job",
    type: "single",
    options: [
      { id: "energy-1", label: "Creating content (writing, video, audio)", value: "creative", icon: "Edit", description: "I love making things" },
      { id: "energy-2", label: "Building products or software", value: "building", icon: "Hammer", description: "I like to build" },
      { id: "energy-3", label: "Helping people directly", value: "service", icon: "Users", description: "I love working with people" },
      { id: "energy-4", label: "Buying, selling, and trading", value: "commerce", icon: "ShoppingBag", description: "I have a business mind" },
    ],
  },
  {
    id: 7,
    question: "How do you feel about being on camera or public-facing?",
    subtitle: "Some hustles need you front and center, others let you stay behind the scenes",
    type: "single",
    options: [
      { id: "camera-1", label: "Love it! I'm a natural", value: "love", icon: "Video", description: "Born performer" },
      { id: "camera-2", label: "I can do it when needed", value: "okay", icon: "Video", description: "Comfortable enough" },
      { id: "camera-3", label: "Prefer to stay behind the scenes", value: "behind", icon: "EyeOff", description: "Behind the curtain" },
      { id: "camera-4", label: "Absolutely not", value: "never", icon: "EyeOff", description: "Anonymous please" },
    ],
  },
  {
    id: 8,
    question: "What is your risk tolerance?",
    subtitle: "Are you willing to invest time and money with uncertain returns?",
    type: "single",
    options: [
      { id: "risk-1", label: "Play it safe - guaranteed income", value: "low", icon: "Shield", description: "Steady and predictable" },
      { id: "risk-2", label: "Moderate - calculated risks", value: "moderate", icon: "Shield", description: "Smart bets" },
      { id: "risk-3", label: "High - big swings, big wins", value: "high", icon: "Rocket", description: "Go big or go home" },
    ],
  },
  {
    id: 9,
    question: "Do you want passive income or active income?",
    subtitle: "Passive = money while you sleep. Active = trading time for money",
    type: "single",
    options: [
      { id: "passive-1", label: "Passive income all the way", value: "passive", icon: "Moon", description: "Set it and forget it" },
      { id: "passive-2", label: "Mix of both", value: "mix", icon: "Sun", description: "Best of both worlds" },
      { id: "passive-3", label: "Active is fine - I want fast results", value: "active", icon: "Zap", description: "Hustle mode" },
    ],
  },
  {
    id: 10,
    question: "What is your current situation?",
    subtitle: "This helps us recommend hustles that fit your life",
    type: "single",
    options: [
      { id: "situation-1", label: "Full-time employee looking for extra income", value: "employed", icon: "Briefcase", description: "Side hustle on the side" },
      { id: "situation-2", label: "Student with flexible time", value: "student", icon: "GraduationCap", description: "Building while learning" },
      { id: "situation-3", label: "Stay-at-home parent", value: "parent", icon: "Home", description: "Working around family" },
      { id: "situation-4", label: "Unemployed / between jobs", value: "unemployed", icon: "Search", description: "Need income now" },
      { id: "situation-5", label: "Already freelancing / self-employed", value: "freelancer", icon: "Star", description: "Adding revenue streams" },
    ],
  },
];

export interface QuizScoring {
  hustleSlug: string;
  score: number;
}

export function scoreQuizResults(answers: Record<number, string | string[]>): QuizScoring[] {
  const scores: Record<string, number> = {};

  const allHustleSlugs = [
    "freelance-writing", "dropshipping", "youtube-channel", "print-on-demand",
    "virtual-assistant", "online-course-creation", "social-media-management",
    "affiliate-marketing", "web-development", "stock-photography", "podcast-hosting",
    "graphic-design", "amazon-fba", "tutoring", "newsletter-business", "bookkeeping",
    "ai-automation-services", "flipping-reselling", "saas-micro-product",
    "real-estate-investing", "tiktok-creator", "digital-templates",
    "pet-sitting-dog-walking", "seo-consulting", "notion-consulting",
  ];

  allHustleSlugs.forEach((slug) => { scores[slug] = 0; });

  // Q1: Time available
  const time = answers[1] as string;
  if (time === "minimal") {
    scores["stock-photography"] += 3; scores["digital-templates"] += 3; scores["affiliate-marketing"] += 2;
    scores["print-on-demand"] += 2; scores["pet-sitting-dog-walking"] += 2; scores["notion-consulting"] += 2;
  } else if (time === "moderate") {
    scores["freelance-writing"] += 3; scores["virtual-assistant"] += 3; scores["tutoring"] += 3;
    scores["social-media-management"] += 2; scores["newsletter-business"] += 2; scores["bookkeeping"] += 2;
  } else if (time === "significant") {
    scores["youtube-channel"] += 3; scores["web-development"] += 3; scores["podcast-hosting"] += 2;
    scores["online-course-creation"] += 3; scores["seo-consulting"] += 2; scores["graphic-design"] += 2;
  } else if (time === "full") {
    scores["dropshipping"] += 3; scores["amazon-fba"] += 3; scores["saas-micro-product"] += 3;
    scores["ai-automation-services"] += 3; scores["tiktok-creator"] += 2;
  }

  // Q2: Budget
  const budget = answers[2] as string;
  if (budget === "zero") {
    scores["freelance-writing"] += 3; scores["virtual-assistant"] += 3; scores["social-media-management"] += 3;
    scores["tutoring"] += 3; scores["tiktok-creator"] += 3; scores["pet-sitting-dog-walking"] += 3;
  } else if (budget === "low") {
    scores["print-on-demand"] += 2; scores["newsletter-business"] += 2; scores["digital-templates"] += 2;
    scores["podcast-hosting"] += 2; scores["notion-consulting"] += 2; scores["flipping-reselling"] += 2;
  } else if (budget === "medium") {
    scores["dropshipping"] += 2; scores["stock-photography"] += 2; scores["graphic-design"] += 2;
    scores["youtube-channel"] += 2; scores["online-course-creation"] += 2; scores["affiliate-marketing"] += 2;
  } else if (budget === "high") {
    scores["amazon-fba"] += 3; scores["real-estate-investing"] += 3; scores["saas-micro-product"] += 2;
  }

  // Q3: Skills (multiple selection)
  const skills = answers[3] as string[];
  if (skills && Array.isArray(skills)) {
    if (skills.includes("writing")) {
      scores["freelance-writing"] += 4; scores["affiliate-marketing"] += 3; scores["newsletter-business"] += 3;
      scores["seo-consulting"] += 2;
    }
    if (skills.includes("design")) {
      scores["graphic-design"] += 4; scores["print-on-demand"] += 3; scores["digital-templates"] += 3;
      scores["social-media-management"] += 2;
    }
    if (skills.includes("tech")) {
      scores["web-development"] += 4; scores["saas-micro-product"] += 4; scores["ai-automation-services"] += 4;
      scores["seo-consulting"] += 2;
    }
    if (skills.includes("marketing")) {
      scores["social-media-management"] += 4; scores["affiliate-marketing"] += 3; scores["dropshipping"] += 3;
      scores["seo-consulting"] += 3;
    }
    if (skills.includes("teaching")) {
      scores["tutoring"] += 4; scores["online-course-creation"] += 4; scores["youtube-channel"] += 2;
      scores["podcast-hosting"] += 2;
    }
    if (skills.includes("media")) {
      scores["youtube-channel"] += 4; scores["tiktok-creator"] += 4; scores["stock-photography"] += 3;
      scores["podcast-hosting"] += 2;
    }
    if (skills.includes("finance")) {
      scores["bookkeeping"] += 4; scores["real-estate-investing"] += 3; scores["amazon-fba"] += 2;
    }
    if (skills.includes("organization")) {
      scores["virtual-assistant"] += 4; scores["bookkeeping"] += 3; scores["notion-consulting"] += 3;
    }
  }

  // Q4: Time to income
  const speed = answers[4] as string;
  if (speed === "immediate") {
    scores["pet-sitting-dog-walking"] += 3; scores["flipping-reselling"] += 3; scores["virtual-assistant"] += 3;
    scores["tutoring"] += 3; scores["freelance-writing"] += 2;
  } else if (speed === "soon") {
    scores["social-media-management"] += 2; scores["graphic-design"] += 2; scores["bookkeeping"] += 2;
    scores["web-development"] += 2; scores["print-on-demand"] += 2;
  } else if (speed === "patient") {
    scores["youtube-channel"] += 2; scores["affiliate-marketing"] += 2; scores["online-course-creation"] += 2;
    scores["newsletter-business"] += 2; scores["dropshipping"] += 2;
  } else if (speed === "longterm") {
    scores["saas-micro-product"] += 3; scores["real-estate-investing"] += 3; scores["youtube-channel"] += 2;
    scores["amazon-fba"] += 2; scores["podcast-hosting"] += 2;
  }

  // Q5: Income goal
  const income = answers[5] as string;
  if (income === "500") {
    scores["pet-sitting-dog-walking"] += 2; scores["flipping-reselling"] += 2; scores["stock-photography"] += 2;
    scores["digital-templates"] += 2;
  } else if (income === "2000") {
    scores["freelance-writing"] += 2; scores["virtual-assistant"] += 2; scores["tutoring"] += 2;
    scores["social-media-management"] += 2;
  } else if (income === "5000") {
    scores["web-development"] += 3; scores["ai-automation-services"] += 3; scores["seo-consulting"] += 2;
    scores["dropshipping"] += 2; scores["online-course-creation"] += 2;
  } else if (income === "10000") {
    scores["amazon-fba"] += 3; scores["saas-micro-product"] += 3; scores["ai-automation-services"] += 3;
    scores["youtube-channel"] += 2; scores["real-estate-investing"] += 2;
  }

  // Q6: Work type preference
  const energy = answers[6] as string;
  if (energy === "creative") {
    scores["youtube-channel"] += 3; scores["tiktok-creator"] += 3; scores["podcast-hosting"] += 3;
    scores["freelance-writing"] += 2; scores["newsletter-business"] += 2; scores["graphic-design"] += 2;
  } else if (energy === "building") {
    scores["saas-micro-product"] += 3; scores["web-development"] += 3; scores["ai-automation-services"] += 3;
    scores["online-course-creation"] += 2; scores["notion-consulting"] += 2;
  } else if (energy === "service") {
    scores["virtual-assistant"] += 3; scores["tutoring"] += 3; scores["pet-sitting-dog-walking"] += 3;
    scores["bookkeeping"] += 2; scores["social-media-management"] += 2;
  } else if (energy === "commerce") {
    scores["dropshipping"] += 3; scores["amazon-fba"] += 3; scores["flipping-reselling"] += 3;
    scores["affiliate-marketing"] += 2; scores["print-on-demand"] += 2;
  }

  // Q7: Camera comfort
  const camera = answers[7] as string;
  if (camera === "love") {
    scores["youtube-channel"] += 3; scores["tiktok-creator"] += 3; scores["online-course-creation"] += 2;
    scores["podcast-hosting"] += 1;
  } else if (camera === "okay") {
    scores["podcast-hosting"] += 2; scores["tutoring"] += 1; scores["social-media-management"] += 1;
  } else if (camera === "behind") {
    scores["freelance-writing"] += 2; scores["web-development"] += 2; scores["seo-consulting"] += 2;
    scores["digital-templates"] += 2; scores["bookkeeping"] += 2;
  } else if (camera === "never") {
    scores["affiliate-marketing"] += 2; scores["print-on-demand"] += 2; scores["notion-consulting"] += 2;
    scores["stock-photography"] += 2; scores["virtual-assistant"] += 2;
  }

  // Q8: Risk tolerance
  const risk = answers[8] as string;
  if (risk === "low") {
    scores["freelance-writing"] += 2; scores["virtual-assistant"] += 2; scores["tutoring"] += 2;
    scores["bookkeeping"] += 2; scores["pet-sitting-dog-walking"] += 2;
  } else if (risk === "moderate") {
    scores["social-media-management"] += 1; scores["web-development"] += 1; scores["print-on-demand"] += 1;
    scores["affiliate-marketing"] += 1; scores["online-course-creation"] += 1;
  } else if (risk === "high") {
    scores["dropshipping"] += 2; scores["amazon-fba"] += 2; scores["saas-micro-product"] += 2;
    scores["real-estate-investing"] += 2; scores["ai-automation-services"] += 1;
  }

  // Q9: Passive vs active
  const passive = answers[9] as string;
  if (passive === "passive") {
    scores["affiliate-marketing"] += 3; scores["digital-templates"] += 3; scores["print-on-demand"] += 3;
    scores["online-course-creation"] += 2; scores["stock-photography"] += 2; scores["real-estate-investing"] += 2;
  } else if (passive === "mix") {
    scores["youtube-channel"] += 2; scores["newsletter-business"] += 2; scores["saas-micro-product"] += 2;
    scores["notion-consulting"] += 1;
  } else if (passive === "active") {
    scores["freelance-writing"] += 2; scores["virtual-assistant"] += 2; scores["web-development"] += 2;
    scores["tutoring"] += 2; scores["pet-sitting-dog-walking"] += 2; scores["flipping-reselling"] += 2;
  }

  // Q10: Situation
  const situation = answers[10] as string;
  if (situation === "employed") {
    scores["freelance-writing"] += 1; scores["digital-templates"] += 1; scores["affiliate-marketing"] += 1;
    scores["stock-photography"] += 1; scores["notion-consulting"] += 1;
  } else if (situation === "student") {
    scores["tutoring"] += 2; scores["tiktok-creator"] += 2; scores["flipping-reselling"] += 1;
    scores["virtual-assistant"] += 1; scores["pet-sitting-dog-walking"] += 1;
  } else if (situation === "parent") {
    scores["freelance-writing"] += 2; scores["virtual-assistant"] += 2; scores["digital-templates"] += 2;
    scores["bookkeeping"] += 2; scores["print-on-demand"] += 1;
  } else if (situation === "unemployed") {
    scores["freelance-writing"] += 2; scores["virtual-assistant"] += 2; scores["pet-sitting-dog-walking"] += 2;
    scores["flipping-reselling"] += 2; scores["tutoring"] += 2;
  } else if (situation === "freelancer") {
    scores["ai-automation-services"] += 2; scores["online-course-creation"] += 2; scores["saas-micro-product"] += 2;
    scores["newsletter-business"] += 1; scores["seo-consulting"] += 1;
  }

  const result = Object.entries(scores)
    .map(([slug, score]) => ({ hustleSlug: slug, score }))
    .sort((a, b) => b.score - a.score);

  return result;
}
