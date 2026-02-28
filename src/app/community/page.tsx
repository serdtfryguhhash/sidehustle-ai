"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Users, MessageSquare, Plus,
  Trophy, HelpCircle, Lightbulb, Target, Search,
  Clock, ArrowUp, Pin, X, Flame,
} from "lucide-react";
import { getTimeAgo } from "@/lib/utils";

const forumCategories = [
  { id: "all", label: "All Posts", icon: MessageSquare, count: 156 },
  { id: "success-stories", label: "Success Stories", icon: Trophy, count: 42 },
  { id: "questions", label: "Questions", icon: HelpCircle, count: 38 },
  { id: "tips", label: "Tips & Advice", icon: Lightbulb, count: 29 },
  { id: "challenges", label: "Challenges", icon: Target, count: 15 },
  { id: "accountability", label: "Accountability", icon: Flame, count: 32 },
];

const mockPosts = [
  {
    id: "1", author_name: "Alex T.", author_avatar: "AT", category: "success-stories",
    title: "Hit $3,000/month with freelance writing in 4 months!", content: "I started freelance writing after taking the SideHustle.ai quiz and following the 30-day playbook. Here is exactly what I did...",
    tags: ["freelance-writing", "milestone"], upvotes: 127, comment_count: 34, is_pinned: true,
    created_at: "2026-02-26T10:30:00Z",
  },
  {
    id: "2", author_name: "Maria S.", author_avatar: "MS", category: "questions",
    title: "Best platforms for selling digital templates in 2026?", content: "I have been creating Canva and Notion templates and want to expand beyond Etsy. What platforms do you recommend?",
    tags: ["digital-templates", "platforms"], upvotes: 45, comment_count: 18, is_pinned: false,
    created_at: "2026-02-27T14:15:00Z",
  },
  {
    id: "3", author_name: "James K.", author_avatar: "JK", category: "tips",
    title: "5 lessons from my first year of dropshipping", content: "After 12 months, $47K revenue, and many mistakes, here are the top lessons I wish I knew from the start...",
    tags: ["dropshipping", "lessons-learned"], upvotes: 89, comment_count: 22, is_pinned: false,
    created_at: "2026-02-25T09:00:00Z",
  },
  {
    id: "4", author_name: "Sarah L.", author_avatar: "SL", category: "challenges",
    title: "30-Day Side Hustle Challenge - February Results", content: "Who else completed the February challenge? Post your results here! I managed to earn $450 from my new tutoring side hustle.",
    tags: ["challenge", "accountability"], upvotes: 67, comment_count: 41, is_pinned: false,
    created_at: "2026-02-28T08:00:00Z",
  },
  {
    id: "5", author_name: "Chris D.", author_avatar: "CD", category: "accountability",
    title: "Week 2 of my YouTube channel journey - small wins!", content: "Just hit 50 subscribers on my finance YouTube channel. Not much, but it is progress. The consistency is the hardest part.",
    tags: ["youtube", "accountability"], upvotes: 34, comment_count: 12, is_pinned: false,
    created_at: "2026-02-27T20:30:00Z",
  },
  {
    id: "6", author_name: "Priya M.", author_avatar: "PM", category: "success-stories",
    title: "From $0 to $8,500/mo with AI automation consulting", content: "The AI automation side hustle changed my life. After 6 months of building my consulting practice, I am now earning more from my side hustle than my day job.",
    tags: ["ai-automation", "milestone", "consulting"], upvotes: 203, comment_count: 56, is_pinned: true,
    created_at: "2026-02-24T16:45:00Z",
  },
];

const categoryColors: Record<string, string> = {
  "success-stories": "bg-green-100 text-green-700",
  "questions": "bg-blue-100 text-blue-700",
  "tips": "bg-yellow-100 text-yellow-700",
  "challenges": "bg-purple-100 text-purple-700",
  "accountability": "bg-orange-100 text-orange-700",
  "general": "bg-gray-100 text-gray-700",
};

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-3"><Users className="w-3 h-3 mr-1" />Community</Badge>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">Community Forum</h1>
              <p className="text-gray-600">Connect with fellow hustlers, share your journey, and get inspired.</p>
            </div>
            <Button onClick={() => setShowNewPost(true)} className="gap-1.5">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-1">
                {forumCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.id ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span className="flex-1 text-left">{cat.label}</span>
                    <span className={`text-xs ${selectedCategory === cat.id ? "text-white/70" : "text-muted-foreground"}`}>{cat.count}</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary/20">
              <CardContent className="p-4 text-center">
                <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-heading font-bold text-sm mb-1">March Challenge</h3>
                <p className="text-xs text-muted-foreground mb-3">Earn your first $100 this month!</p>
                <Button size="sm" className="w-full">Join Challenge</Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Vote */}
                        <div className="flex flex-col items-center gap-1 pt-1">
                          <button className="p-1 hover:bg-primary-50 rounded transition-colors">
                            <ArrowUp className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </button>
                          <span className="text-sm font-bold">{post.upvotes}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {post.is_pinned && (
                              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                                <Pin className="w-3 h-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                            <Badge className={`${categoryColors[post.category]} border-0 text-xs`}>
                              {post.category.replace("-", " ")}
                            </Badge>
                          </div>

                          <h3 className="font-heading font-bold text-lg mb-1 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.content}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                              <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center">
                                <span className="text-[8px] font-bold text-primary">{post.author_avatar}</span>
                              </div>
                              <span>{post.author_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {post.comment_count} comments
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(post.created_at)}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {post.tags.map((tag) => (
                              <span key={tag} className="text-[10px] text-primary bg-primary-50 px-2 py-0.5 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold">Create New Post</h2>
              <button onClick={() => setShowNewPost(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowNewPost(false); }}>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Category</label>
                <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                  <option value="general">General</option>
                  <option value="success-stories">Success Story</option>
                  <option value="questions">Question</option>
                  <option value="tips">Tips & Advice</option>
                  <option value="challenges">Challenge</option>
                  <option value="accountability">Accountability</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Title</label>
                <Input placeholder="Give your post a title..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Content</label>
                <Textarea placeholder="Share your thoughts, questions, or story..." className="min-h-[120px]" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Tags (comma separated)</label>
                <Input placeholder="freelancing, tips, milestone" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowNewPost(false)}>Cancel</Button>
                <Button type="submit" className="flex-1">Publish Post</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
