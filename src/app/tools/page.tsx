"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search, Star, ExternalLink, Sparkles, Filter,
  Zap, Code, PenTool, ShoppingCart, BarChart3,
  Mail, Camera, DollarSign, Users, Palette,
} from "lucide-react";

const tools = [
  { id: "1", name: "Canva", description: "Design tool for creating graphics, presentations, and social media content. Perfect for non-designers.", category: "Design", pricing: "Free / $12.99/mo Pro", rating: 4.8, review_count: 15420, features: ["Templates", "Brand Kit", "Team Collaboration", "AI Image Gen"], best_for: ["Social Media Management", "Print on Demand", "Digital Templates"], is_featured: true, url: "https://canva.com", logo: "Palette" },
  { id: "2", name: "Shopify", description: "The leading e-commerce platform for building online stores. Powers millions of businesses worldwide.", category: "E-Commerce", pricing: "$39/mo", rating: 4.6, review_count: 12800, features: ["Online Store", "Payment Processing", "Inventory Management", "App Ecosystem"], best_for: ["Dropshipping", "Print on Demand", "Amazon FBA"], is_featured: true, url: "https://shopify.com", logo: "ShoppingCart" },
  { id: "3", name: "Grammarly", description: "AI-powered writing assistant that helps you write clearly and effectively. Essential for any writing side hustle.", category: "Writing", pricing: "Free / $12/mo Premium", rating: 4.7, review_count: 23100, features: ["Grammar Check", "Tone Detection", "Plagiarism Checker", "Style Suggestions"], best_for: ["Freelance Writing", "Newsletter", "Blogging"], is_featured: true, url: "https://grammarly.com", logo: "PenTool" },
  { id: "4", name: "Upwork", description: "The world's largest freelancing platform connecting businesses with independent professionals.", category: "Freelancing", pricing: "Free to join", rating: 4.3, review_count: 8900, features: ["Job Matching", "Secure Payments", "Time Tracking", "Portfolio"], best_for: ["Freelance Writing", "Web Development", "Graphic Design", "Virtual Assistant"], is_featured: false, url: "https://upwork.com", logo: "Users" },
  { id: "5", name: "ConvertKit", description: "Email marketing platform designed for creators. Build your audience and sell digital products.", category: "Email Marketing", pricing: "Free / $25/mo", rating: 4.7, review_count: 5600, features: ["Email Sequences", "Landing Pages", "Tagging", "Commerce"], best_for: ["Newsletter", "Online Courses", "Digital Products"], is_featured: true, url: "https://convertkit.com", logo: "Mail" },
  { id: "6", name: "Ahrefs", description: "All-in-one SEO toolset for growing search traffic. Research keywords, analyze competitors, and track rankings.", category: "SEO", pricing: "$99/mo", rating: 4.8, review_count: 7200, features: ["Keyword Research", "Site Audit", "Backlink Analysis", "Rank Tracking"], best_for: ["SEO Consulting", "Affiliate Marketing", "Blogging"], is_featured: false, url: "https://ahrefs.com", logo: "BarChart3" },
  { id: "7", name: "Stripe", description: "Payment processing platform for internet businesses. Accept payments online with easy integration.", category: "Payments", pricing: "2.9% + $0.30/transaction", rating: 4.8, review_count: 18300, features: ["Payment Processing", "Invoicing", "Subscriptions", "Global Payments"], best_for: ["SaaS", "E-Commerce", "Freelancing"], is_featured: false, url: "https://stripe.com", logo: "DollarSign" },
  { id: "8", name: "Figma", description: "Collaborative design tool for building digital products. The industry standard for UI/UX design.", category: "Design", pricing: "Free / $15/mo", rating: 4.9, review_count: 11200, features: ["Vector Design", "Prototyping", "Collaboration", "Design Systems"], best_for: ["Graphic Design", "Web Development", "Digital Templates"], is_featured: true, url: "https://figma.com", logo: "Palette" },
  { id: "9", name: "Notion", description: "All-in-one workspace for notes, docs, project management, and databases. Incredibly versatile productivity tool.", category: "Productivity", pricing: "Free / $10/mo", rating: 4.7, review_count: 14500, features: ["Databases", "Templates", "Collaboration", "API"], best_for: ["Notion Consulting", "Virtual Assistant", "Project Management"], is_featured: true, url: "https://notion.so", logo: "Code" },
  { id: "10", name: "Jasper AI", description: "AI content creation platform that helps you write marketing copy, blog posts, and social media content faster.", category: "AI Writing", pricing: "$49/mo", rating: 4.5, review_count: 4200, features: ["AI Writing", "Templates", "Brand Voice", "Team Plans"], best_for: ["Freelance Writing", "Social Media Management", "Content Creation"], is_featured: false, url: "https://jasper.ai", logo: "Sparkles" },
  { id: "11", name: "Teachable", description: "Online course platform that makes it easy to create and sell courses. Handles hosting, payments, and student management.", category: "Education", pricing: "Free / $39/mo", rating: 4.5, review_count: 6800, features: ["Course Builder", "Payment Processing", "Student Management", "Analytics"], best_for: ["Online Course Creation", "Digital Products"], is_featured: false, url: "https://teachable.com", logo: "Users" },
  { id: "12", name: "Buzzsprout", description: "Podcast hosting platform that makes it easy to start, grow, and monetize your podcast.", category: "Podcasting", pricing: "Free / $12/mo", rating: 4.8, review_count: 3900, features: ["Podcast Hosting", "Distribution", "Analytics", "Monetization"], best_for: ["Podcasting", "Content Creation"], is_featured: false, url: "https://buzzsprout.com", logo: "Zap" },
];

const iconMap: Record<string, React.ElementType> = {
  Palette, ShoppingCart, PenTool, Users, Mail, BarChart3, DollarSign, Code, Sparkles, Zap, Camera, Filter,
};

const toolCategories = ["All", "Design", "E-Commerce", "Writing", "Freelancing", "Email Marketing", "SEO", "Payments", "Productivity", "AI Writing", "Education", "Podcasting"];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = !searchQuery || tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Badge variant="outline" className="mb-3">
            <Sparkles className="w-3 h-3 mr-1" />
            Tool Marketplace
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Best Tools for Side Hustlers
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mb-8">
            Curated recommendations for the tools, software, and platforms that will help you launch and grow your side hustle.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search tools..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {toolCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === cat ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, i) => {
            const Icon = iconMap[tool.logo] || Zap;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5) }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      {tool.is_featured && (
                        <Badge variant="accent" className="text-xs">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-lg mb-1">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{tool.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3.5 h-3.5 ${j < Math.round(tool.rating) ? "fill-accent text-accent" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{tool.rating} ({tool.review_count.toLocaleString()})</span>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                      <span className="font-medium text-primary">{tool.pricing}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {tool.best_for.slice(0, 3).map((b) => (
                        <span key={b} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{b}</span>
                      ))}
                    </div>

                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full gap-1.5" size="sm">
                        Visit Website
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
