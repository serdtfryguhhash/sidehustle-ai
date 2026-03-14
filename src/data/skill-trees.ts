// ============================================================
// SideHustle.ai - Skill Tree Definitions
// ============================================================

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  xpRequired: number;
  prerequisites: string[];
  category: SkillCategory;
  icon: string;
  resources: string[];
}

export type SkillCategory = "marketing" | "content" | "tech" | "sales";

export interface SkillTree {
  id: SkillCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
  nodes: SkillNode[];
}

export const skillTrees: SkillTree[] = [
  {
    id: "marketing",
    name: "Marketing",
    description: "Master the art of getting eyes on your hustle",
    icon: "Megaphone",
    color: "#7C3AED",
    nodes: [
      {
        id: "social-media",
        name: "Social Media",
        description: "Build a presence and engage audiences across social platforms",
        xpRequired: 0,
        prerequisites: [],
        category: "marketing",
        icon: "Share2",
        resources: ["Create profiles on 3 platforms", "Post consistently for 7 days"],
      },
      {
        id: "seo",
        name: "SEO",
        description: "Optimize content for search engines to drive organic traffic",
        xpRequired: 100,
        prerequisites: ["social-media"],
        category: "marketing",
        icon: "Search",
        resources: ["Learn keyword research", "Optimize 5 pieces of content"],
      },
      {
        id: "paid-ads",
        name: "Paid Ads",
        description: "Run profitable paid advertising campaigns on major platforms",
        xpRequired: 300,
        prerequisites: ["seo"],
        category: "marketing",
        icon: "Target",
        resources: ["Set up first ad campaign", "Achieve positive ROAS"],
      },
      {
        id: "analytics",
        name: "Analytics",
        description: "Track, measure, and analyze marketing performance with data",
        xpRequired: 500,
        prerequisites: ["paid-ads"],
        category: "marketing",
        icon: "BarChart3",
        resources: ["Set up Google Analytics", "Create a KPI dashboard"],
      },
      {
        id: "growth-hacking",
        name: "Growth Hacking",
        description: "Deploy creative strategies for rapid user and revenue growth",
        xpRequired: 800,
        prerequisites: ["analytics"],
        category: "marketing",
        icon: "Rocket",
        resources: ["Run 3 growth experiments", "Achieve viral coefficient > 1"],
      },
    ],
  },
  {
    id: "content",
    name: "Content",
    description: "Create compelling content that converts",
    icon: "FileText",
    color: "#DB2777",
    nodes: [
      {
        id: "writing",
        name: "Writing",
        description: "Craft clear, engaging written content for any audience",
        xpRequired: 0,
        prerequisites: [],
        category: "content",
        icon: "PenTool",
        resources: ["Write 5 blog posts", "Learn copywriting basics"],
      },
      {
        id: "video",
        name: "Video",
        description: "Create professional video content for social media and courses",
        xpRequired: 100,
        prerequisites: ["writing"],
        category: "content",
        icon: "Video",
        resources: ["Create 3 short-form videos", "Learn basic editing"],
      },
      {
        id: "design",
        name: "Design",
        description: "Design eye-catching graphics, thumbnails, and brand assets",
        xpRequired: 300,
        prerequisites: ["video"],
        category: "content",
        icon: "Palette",
        resources: ["Master Canva basics", "Create a brand kit"],
      },
      {
        id: "branding",
        name: "Branding",
        description: "Build a cohesive personal or business brand identity",
        xpRequired: 600,
        prerequisites: ["design"],
        category: "content",
        icon: "Sparkles",
        resources: ["Define brand voice", "Create style guide"],
      },
    ],
  },
  {
    id: "tech",
    name: "Tech",
    description: "Build and automate with technology",
    icon: "Code",
    color: "#0891B2",
    nodes: [
      {
        id: "html-css",
        name: "HTML/CSS",
        description: "Build and style web pages from scratch",
        xpRequired: 0,
        prerequisites: [],
        category: "tech",
        icon: "Globe",
        resources: ["Build a landing page", "Learn responsive design"],
      },
      {
        id: "javascript",
        name: "JavaScript",
        description: "Add interactivity and logic to your web projects",
        xpRequired: 150,
        prerequisites: ["html-css"],
        category: "tech",
        icon: "Code",
        resources: ["Complete JS fundamentals", "Build an interactive feature"],
      },
      {
        id: "no-code-tools",
        name: "No-Code Tools",
        description: "Build apps and automations without traditional coding",
        xpRequired: 300,
        prerequisites: ["javascript"],
        category: "tech",
        icon: "Blocks",
        resources: ["Build a Notion system", "Create a Webflow site"],
      },
      {
        id: "automation",
        name: "Automation",
        description: "Automate workflows and repetitive tasks across platforms",
        xpRequired: 500,
        prerequisites: ["no-code-tools"],
        category: "tech",
        icon: "Cog",
        resources: ["Set up 5 Zapier automations", "Create an email sequence"],
      },
      {
        id: "ai-tools",
        name: "AI Tools",
        description: "Leverage AI to 10x your productivity and capabilities",
        xpRequired: 800,
        prerequisites: ["automation"],
        category: "tech",
        icon: "Brain",
        resources: ["Master prompt engineering", "Build an AI workflow"],
      },
    ],
  },
  {
    id: "sales",
    name: "Sales",
    description: "Close deals and grow revenue",
    icon: "Handshake",
    color: "#EA580C",
    nodes: [
      {
        id: "prospecting",
        name: "Prospecting",
        description: "Find and qualify potential customers and clients",
        xpRequired: 0,
        prerequisites: [],
        category: "sales",
        icon: "UserSearch",
        resources: ["Build a list of 50 prospects", "Learn outreach templates"],
      },
      {
        id: "pitching",
        name: "Pitching",
        description: "Present your offer compellingly to win new business",
        xpRequired: 100,
        prerequisites: ["prospecting"],
        category: "sales",
        icon: "Presentation",
        resources: ["Create a pitch deck", "Practice elevator pitch"],
      },
      {
        id: "closing",
        name: "Closing",
        description: "Convert prospects into paying clients and customers",
        xpRequired: 300,
        prerequisites: ["pitching"],
        category: "sales",
        icon: "BadgeCheck",
        resources: ["Learn objection handling", "Close 5 deals"],
      },
      {
        id: "retention",
        name: "Retention",
        description: "Keep customers coming back with exceptional service and systems",
        xpRequired: 600,
        prerequisites: ["closing"],
        category: "sales",
        icon: "Heart",
        resources: ["Set up feedback system", "Create loyalty program"],
      },
    ],
  },
];

export function getSkillTree(category: SkillCategory): SkillTree | undefined {
  return skillTrees.find((tree) => tree.id === category);
}

export function getAllSkillNodes(): SkillNode[] {
  return skillTrees.flatMap((tree) => tree.nodes);
}

export function getSkillNode(nodeId: string): SkillNode | undefined {
  return getAllSkillNodes().find((node) => node.id === nodeId);
}
