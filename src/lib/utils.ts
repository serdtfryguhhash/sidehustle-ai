import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function generateReferralCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "SH-";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTimeAgo(date: string): string {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

export function getDifficultyColor(
  difficulty: string
): { bg: string; text: string; label: string } {
  switch (difficulty) {
    case "beginner":
      return { bg: "bg-green-100", text: "text-green-700", label: "Beginner" };
    case "intermediate":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Intermediate",
      };
    case "advanced":
      return { bg: "bg-red-100", text: "text-red-700", label: "Advanced" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", label: difficulty };
  }
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    freelancing: "Freelancing",
    ecommerce: "E-Commerce",
    "content-creation": "Content Creation",
    investing: "Investing",
    services: "Services",
    "digital-products": "Digital Products",
    teaching: "Teaching",
    tech: "Tech",
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    freelancing: "#059669",
    ecommerce: "#7C3AED",
    "content-creation": "#DB2777",
    investing: "#2563EB",
    services: "#EA580C",
    "digital-products": "#0D9488",
    teaching: "#4F46E5",
    tech: "#0891B2",
  };
  return colors[category] || "#6B7280";
}
