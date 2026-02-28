"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2, Circle, Clock,
  Zap, ArrowLeft,
  ChevronDown, ChevronUp, Lightbulb,
} from "lucide-react";
import { getHustleBySlug } from "@/data/side-hustles";
import { PlaybookWeek } from "@/types";

const generatePlaybook = (hustleName: string): PlaybookWeek[] => [
  {
    week: 1,
    title: "Foundation & Setup",
    goal: "Establish your presence and prepare everything you need to start",
    days: [
      { day: 1, title: "Research & Planning", tasks: [
        { id: "1-1-1", title: "Research your target market", description: `Spend 2 hours researching who your ideal customers are for ${hustleName}. Document their pain points and needs.`, duration_minutes: 120, is_completed: false },
        { id: "1-1-2", title: "Study 5 competitors", description: "Find 5 successful people doing this and analyze what makes them successful. Take notes on their approach.", duration_minutes: 90, is_completed: false },
        { id: "1-1-3", title: "Define your unique angle", description: "Based on your research, write down what will make you different. Your unique selling proposition is key.", duration_minutes: 30, is_completed: false },
      ], tip: "Do not skip the research phase. Understanding your market is the #1 factor in success." },
      { day: 2, title: "Brand & Identity", tasks: [
        { id: "1-2-1", title: "Choose your brand name", description: "Pick a memorable name that reflects your niche. Check domain and social media availability.", duration_minutes: 60, is_completed: false },
        { id: "1-2-2", title: "Create a simple logo", description: "Use Canva to create a clean, professional logo. Keep it simple - you can always refine later.", duration_minutes: 45, is_completed: false },
        { id: "1-2-3", title: "Set up social media profiles", description: "Create accounts on the platforms most relevant to your hustle. Complete all profile sections.", duration_minutes: 30, is_completed: false },
      ] },
      { day: 3, title: "Tools & Accounts", tasks: [
        { id: "1-3-1", title: "Set up essential tools", description: "Sign up for the key tools and platforms you will need. Start with free tiers where possible.", duration_minutes: 60, is_completed: false },
        { id: "1-3-2", title: "Create a simple website or portfolio", description: "Use a free website builder to create a basic online presence. Include your services and contact info.", duration_minutes: 90, is_completed: false },
      ], tip: "Start with free tools and upgrade only when you need to. Do not let tool costs eat into your starting budget." },
      { day: 4, title: "Create Your First Content", tasks: [
        { id: "1-4-1", title: "Create 3 sample work pieces", description: "Build examples of what you offer. These will be your portfolio pieces to attract your first clients.", duration_minutes: 180, is_completed: false },
      ] },
      { day: 5, title: "Set Up Business Basics", tasks: [
        { id: "1-5-1", title: "Set your pricing strategy", description: "Research market rates and set your initial pricing. Start slightly below market to attract first clients.", duration_minutes: 45, is_completed: false },
        { id: "1-5-2", title: "Create a service description", description: "Write clear descriptions of what you offer, what is included, and what clients can expect.", duration_minutes: 30, is_completed: false },
        { id: "1-5-3", title: "Set up payment processing", description: "Create accounts on payment platforms (PayPal, Stripe, Venmo) to accept payments.", duration_minutes: 20, is_completed: false },
      ] },
      { day: 6, title: "Day Off - Reflect", tasks: [
        { id: "1-6-1", title: "Review your progress", description: "Look at everything you have set up this week. Make adjustments and celebrate your progress.", duration_minutes: 30, is_completed: false },
      ], tip: "Taking breaks is essential for sustainable hustle. Burnout is the #1 reason people quit." },
      { day: 7, title: "Prepare for Launch", tasks: [
        { id: "1-7-1", title: "Plan your outreach strategy", description: "Identify 20 potential clients or places to market yourself. Create a spreadsheet to track your outreach.", duration_minutes: 60, is_completed: false },
        { id: "1-7-2", title: "Write pitch templates", description: "Create 3 different pitch templates you can customize for each potential client.", duration_minutes: 45, is_completed: false },
      ] },
    ],
  },
  {
    week: 2,
    title: "Launch & First Clients",
    goal: "Start reaching out and landing your first paying clients",
    days: [
      { day: 8, title: "Start Outreach", tasks: [
        { id: "2-1-1", title: "Send 10 personalized pitches", description: "Reach out to 10 potential clients with customized messages. Personalization is key.", duration_minutes: 120, is_completed: false },
        { id: "2-1-2", title: "Post on 3 relevant platforms", description: "Share your services on relevant communities, forums, or job boards.", duration_minutes: 45, is_completed: false },
      ] },
      { day: 9, title: "Continue Outreach", tasks: [
        { id: "2-2-1", title: "Send 10 more pitches", description: "Keep the momentum going. Follow up on yesterday's outreach.", duration_minutes: 120, is_completed: false },
        { id: "2-2-2", title: "Engage in relevant communities", description: "Provide value in forums and groups. Answer questions, share insights.", duration_minutes: 30, is_completed: false },
      ], tip: "Do not expect immediate responses. Follow up is where most deals happen." },
      { day: 10, title: "Follow Up & Network", tasks: [
        { id: "2-3-1", title: "Follow up on all previous outreach", description: "Send polite follow-ups to anyone who has not responded. Persistence pays.", duration_minutes: 60, is_completed: false },
        { id: "2-3-2", title: "Network with peers", description: "Connect with 5 people doing similar work. Collaboration often leads to opportunities.", duration_minutes: 45, is_completed: false },
      ] },
      { day: 11, title: "Content Marketing", tasks: [
        { id: "2-4-1", title: "Create valuable content", description: "Write a blog post, create a video, or share tips that showcase your expertise.", duration_minutes: 90, is_completed: false },
        { id: "2-4-2", title: "Share across all platforms", description: "Distribute your content on every platform where your audience spends time.", duration_minutes: 30, is_completed: false },
      ] },
      { day: 12, title: "Land First Client", tasks: [
        { id: "2-5-1", title: "Offer an introductory deal", description: "Create a limited-time introductory offer to reduce friction for first clients.", duration_minutes: 30, is_completed: false },
        { id: "2-5-2", title: "Close your first deal", description: "Negotiate terms, agree on scope, and get a deposit or payment.", duration_minutes: 60, is_completed: false },
      ] },
      { day: 13, title: "Deliver Excellence", tasks: [
        { id: "2-6-1", title: "Over-deliver on first project", description: "Go above and beyond. Your first clients become your best marketing.", duration_minutes: 180, is_completed: false },
      ], tip: "Your first project is your most important marketing asset. Make it exceptional." },
      { day: 14, title: "Review & Adjust", tasks: [
        { id: "2-7-1", title: "Analyze what is working", description: "Review your outreach. Which channels got the best response? Double down on those.", duration_minutes: 45, is_completed: false },
        { id: "2-7-2", title: "Collect your first testimonial", description: "Ask your first client for a testimonial or review. This is gold for future marketing.", duration_minutes: 15, is_completed: false },
      ] },
    ],
  },
  {
    week: 3,
    title: "Build Momentum",
    goal: "Scale your outreach and create systems for efficiency",
    days: [
      { day: 15, title: "Systems & Processes", tasks: [
        { id: "3-1-1", title: "Create workflow templates", description: "Document your process so you can deliver consistently and efficiently.", duration_minutes: 60, is_completed: false },
        { id: "3-1-2", title: "Set up project management", description: "Use Trello, Notion, or Asana to organize your tasks and client work.", duration_minutes: 30, is_completed: false },
      ] },
      { day: 16, title: "Expand Reach", tasks: [
        { id: "3-2-1", title: "Apply to 5 new platforms", description: "Expand to new marketplaces or platforms where clients can find you.", duration_minutes: 60, is_completed: false },
      ] },
      { day: 17, title: "Build Credibility", tasks: [
        { id: "3-3-1", title: "Create a case study", description: "Document your first successful project with results and testimonials.", duration_minutes: 90, is_completed: false },
      ] },
      { day: 18, title: "Optimize & Improve", tasks: [
        { id: "3-4-1", title: "Refine your offerings", description: "Based on client feedback, improve your service and materials.", duration_minutes: 60, is_completed: false },
      ] },
      { day: 19, title: "Increase Pricing", tasks: [
        { id: "3-5-1", title: "Raise rates for new clients", description: "Now that you have social proof, increase your rates by 20-30%.", duration_minutes: 15, is_completed: false },
      ], tip: "Raise your prices sooner than you think. Most new hustlers undercharge significantly." },
      { day: 20, title: "Content & Marketing", tasks: [
        { id: "3-6-1", title: "Publish valuable content", description: "Share another piece of content demonstrating your expertise.", duration_minutes: 90, is_completed: false },
      ] },
      { day: 21, title: "Rest & Plan", tasks: [
        { id: "3-7-1", title: "Take a break and plan week 4", description: "Reflect on your progress, celebrate wins, and plan the final push.", duration_minutes: 30, is_completed: false },
      ] },
    ],
  },
  {
    week: 4,
    title: "Scale & Sustain",
    goal: "Create recurring revenue and long-term growth systems",
    days: [
      { day: 22, title: "Recurring Revenue", tasks: [
        { id: "4-1-1", title: "Pitch retainer packages", description: "Offer monthly packages to existing clients for recurring revenue.", duration_minutes: 60, is_completed: false },
      ] },
      { day: 23, title: "Referral System", tasks: [
        { id: "4-2-1", title: "Set up a referral program", description: "Offer existing clients a discount or bonus for referring new clients.", duration_minutes: 30, is_completed: false },
      ] },
      { day: 24, title: "Email Marketing", tasks: [
        { id: "4-3-1", title: "Start building an email list", description: "Create a lead magnet and start collecting emails from potential clients.", duration_minutes: 90, is_completed: false },
      ] },
      { day: 25, title: "Automate", tasks: [
        { id: "4-4-1", title: "Automate repetitive tasks", description: "Use tools to automate scheduling, invoicing, and follow-ups.", duration_minutes: 60, is_completed: false },
      ] },
      { day: 26, title: "Diversify Income", tasks: [
        { id: "4-5-1", title: "Explore additional revenue streams", description: "Think about digital products, courses, or complementary services you can offer.", duration_minutes: 60, is_completed: false },
      ] },
      { day: 27, title: "Optimize", tasks: [
        { id: "4-6-1", title: "Review financials and KPIs", description: "Calculate your effective hourly rate, profit margins, and best channels.", duration_minutes: 45, is_completed: false },
      ] },
      { day: 28, title: "Plan Next 90 Days", tasks: [
        { id: "4-7-1", title: "Create your 90-day growth plan", description: "Set specific revenue goals and action items for the next 3 months.", duration_minutes: 60, is_completed: false },
      ], tip: "The first 30 days are the hardest. If you have made it here, you are ahead of 90% of people." },
      { day: 29, title: "Celebrate", tasks: [
        { id: "4-8-1", title: "Celebrate your progress", description: "Review everything you have accomplished. Share your story in the community!", duration_minutes: 15, is_completed: false },
      ] },
      { day: 30, title: "Keep Going", tasks: [
        { id: "4-9-1", title: "Execute your 90-day plan", description: "You have the foundation. Now execute, iterate, and grow.", duration_minutes: 30, is_completed: false },
      ] },
    ],
  },
];

export default function PlaybookPage() {
  const params = useParams();
  const slug = params.id as string;
  const hustle = getHustleBySlug(slug);
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  if (!hustle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-2">Playbook Not Found</h1>
          <p className="text-muted-foreground mb-6">The hustle you are looking for does not exist.</p>
          <Link href="/hustles"><Button>Browse Hustles</Button></Link>
        </div>
      </div>
    );
  }

  const playbook = generatePlaybook(hustle.name);
  const totalTasks = playbook.reduce((acc, week) => acc + week.days.reduce((d, day) => d + day.tasks.length, 0), 0);
  const completedCount = completedTasks.size;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(taskId)) next.delete(taskId);
      else next.add(taskId);
      return next;
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href={`/hustles/${slug}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {hustle.name}
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-primary-100 text-primary border-0">
              <Zap className="w-3 h-3 mr-1" />
              AI-Generated Playbook
            </Badge>
          </div>

          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
            30-Day {hustle.name} Playbook
          </h1>
          <p className="text-muted-foreground mb-6">
            Your personalized action plan to launch and grow your {hustle.name.toLowerCase()} side hustle in 30 days.
          </p>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{completedCount}/{totalTasks} tasks ({progressPercent}%)</span>
            </div>
            <Progress value={progressPercent} />
          </div>
        </div>
      </section>

      {/* Playbook Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        {playbook.map((week, weekIndex) => {
          const weekTasks = week.days.reduce((acc, day) => acc + day.tasks.length, 0);
          const weekCompleted = week.days.reduce(
            (acc, day) => acc + day.tasks.filter((t) => completedTasks.has(t.id)).length, 0
          );
          const isExpanded = expandedWeek === weekIndex;

          return (
            <Card key={week.week} className={isExpanded ? "border-primary/30" : ""}>
              <button
                onClick={() => setExpandedWeek(isExpanded ? -1 : weekIndex)}
                className="w-full text-left"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">W{week.week}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{week.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{week.goal}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground hidden sm:block">
                        {weekCompleted}/{weekTasks} done
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </button>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    {week.days.map((day) => (
                      <div key={day.day} className="border-l-2 border-primary/20 pl-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">Day {day.day}</Badge>
                          <h4 className="font-semibold">{day.title}</h4>
                        </div>

                        <div className="space-y-3">
                          {day.tasks.map((task) => {
                            const isComplete = completedTasks.has(task.id);
                            return (
                              <motion.div
                                key={task.id}
                                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                                  isComplete ? "bg-primary-50" : "bg-gray-50 hover:bg-gray-100"
                                }`}
                                whileTap={{ scale: 0.99 }}
                              >
                                <button onClick={() => toggleTask(task.id)} className="mt-0.5">
                                  {isComplete ? (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-300" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <div className={`text-sm font-medium ${isComplete ? "line-through text-muted-foreground" : ""}`}>
                                    {task.title}
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">{task.duration_minutes} min</span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>

                        {day.tip && (
                          <div className="mt-3 flex items-start gap-2 p-3 bg-accent-50 rounded-lg">
                            <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <p className="text-xs text-accent-800">{day.tip}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </section>
    </div>
  );
}
