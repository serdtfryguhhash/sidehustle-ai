// ============================================================
// SideHustle.ai - Complete Type Definitions
// ============================================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  subscription_tier: "free" | "pro" | "lifetime";
  stripe_customer_id?: string;
  referral_code: string;
  referred_by?: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface SideHustle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: SideHustleCategory;
  difficulty: "beginner" | "intermediate" | "advanced";
  income_range_min: number;
  income_range_max: number;
  startup_cost_min: number;
  startup_cost_max: number;
  time_to_first_income: string;
  hours_per_week_min: number;
  hours_per_week_max: number;
  skills_required: string[];
  tools_needed: string[];
  pros: string[];
  cons: string[];
  steps: LaunchStep[];
  success_tips: string[];
  earning_potential_description: string;
  image_url: string;
  icon: string;
  is_trending: boolean;
  popularity_score: number;
  created_at: string;
}

export type SideHustleCategory =
  | "freelancing"
  | "ecommerce"
  | "content-creation"
  | "investing"
  | "services"
  | "digital-products"
  | "teaching"
  | "tech";

export interface LaunchStep {
  day: string;
  title: string;
  description: string;
  tasks: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  type: "single" | "multiple" | "scale" | "budget";
  options: QuizOption[];
}

export interface QuizOption {
  id: string;
  label: string;
  value: string;
  icon?: string;
  description?: string;
}

export interface QuizResponse {
  id: string;
  user_id?: string;
  answers: Record<number, string | string[]>;
  recommended_hustles: string[];
  ai_analysis?: string;
  created_at: string;
}

export interface UserHustle {
  id: string;
  user_id: string;
  hustle_id: string;
  hustle?: SideHustle;
  status: "exploring" | "starting" | "active" | "paused" | "completed";
  started_at: string;
  current_step: number;
  notes: string;
  total_earned: number;
  created_at: string;
}

export interface IncomeLog {
  id: string;
  user_id: string;
  hustle_id: string;
  hustle_name: string;
  amount: number;
  source: string;
  notes?: string;
  date: string;
  created_at: string;
}

export interface IncomeStat {
  total_earned: number;
  this_month: number;
  last_month: number;
  best_month: number;
  current_streak: number;
  longest_streak: number;
  monthly_data: MonthlyIncome[];
  by_hustle: HustleIncome[];
}

export interface MonthlyIncome {
  month: string;
  amount: number;
}

export interface HustleIncome {
  hustle_name: string;
  total: number;
  percentage: number;
  color: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  logo_url: string;
  url: string;
  affiliate_url?: string;
  pricing: string;
  rating: number;
  review_count: number;
  features: string[];
  best_for: string[];
  is_featured: boolean;
}

export interface ForumPost {
  id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  category: ForumCategory;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  comment_count: number;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

export type ForumCategory =
  | "general"
  | "success-stories"
  | "questions"
  | "tips"
  | "challenges"
  | "accountability";

export interface ForumComment {
  id: string;
  post_id: string;
  user_id: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  upvotes: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  author_avatar: string;
  category: string;
  tags: string[];
  featured_image: string;
  read_time: number;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

export interface NewsletterSub {
  id: string;
  email: string;
  first_name?: string;
  source: string;
  is_active: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_email: string;
  referred_user_id?: string;
  status: "pending" | "signed_up" | "subscribed" | "paid_out";
  commission_amount: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id?: string;
  tier: "free" | "pro" | "lifetime";
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start?: string;
  current_period_end?: string;
  created_at: string;
}

export interface Playbook {
  id: string;
  user_id: string;
  hustle_id: string;
  hustle_name: string;
  content: PlaybookWeek[];
  ai_generated: boolean;
  personalized_tips: string[];
  resources: PlaybookResource[];
  created_at: string;
}

export interface PlaybookWeek {
  week: number;
  title: string;
  goal: string;
  days: PlaybookDay[];
}

export interface PlaybookDay {
  day: number;
  title: string;
  tasks: PlaybookTask[];
  tip?: string;
}

export interface PlaybookTask {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  is_completed: boolean;
  resources?: string[];
}

export interface PlaybookResource {
  title: string;
  url: string;
  type: "article" | "video" | "tool" | "course";
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  earned_at?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tier: "free" | "pro" | "lifetime";
  price: number;
  billing_period?: string;
  stripe_price_id: string;
  features: string[];
  highlighted: boolean;
  cta: string;
}
