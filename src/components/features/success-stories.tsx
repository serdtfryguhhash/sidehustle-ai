"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Trophy, ArrowUp, Clock, DollarSign, Star, Plus, X, Award,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface SuccessStory {
  id: string;
  authorName: string;
  authorAvatar: string;
  hustleType: string;
  monthlyIncome: number;
  timeInvested: string;
  tips: string;
  story: string;
  upvotes: number;
  isFeatured: boolean;
  createdAt: string;
}

const mockStories: SuccessStory[] = [
  {
    id: "1",
    authorName: "Alex T.",
    authorAvatar: "AT",
    hustleType: "Freelance Writing",
    monthlyIncome: 3500,
    timeInvested: "4 months",
    tips: "Specialize in one niche and become the go-to expert. I focused on SaaS content.",
    story: "Started with $0 and zero clients. Used the SideHustle.ai playbook to land my first client within 2 weeks. Now I have 5 recurring clients!",
    upvotes: 127,
    isFeatured: true,
    createdAt: "2026-02-20",
  },
  {
    id: "2",
    authorName: "Priya M.",
    authorAvatar: "PM",
    hustleType: "AI Automation Consulting",
    monthlyIncome: 8500,
    timeInvested: "6 months",
    tips: "Position yourself as a problem solver, not a tech person. Businesses pay for solutions.",
    story: "Left my corporate job after my side hustle income exceeded my salary. AI consulting is booming and I got in early.",
    upvotes: 203,
    isFeatured: false,
    createdAt: "2026-02-15",
  },
  {
    id: "3",
    authorName: "Marcus J.",
    authorAvatar: "MJ",
    hustleType: "Print on Demand",
    monthlyIncome: 2200,
    timeInvested: "8 months",
    tips: "Volume is key. I upload 10 new designs per week and let the data tell me what sells.",
    story: "Never thought I could make money from art. Started designing on Canva and now have 400+ designs selling on Redbubble and Etsy.",
    upvotes: 89,
    isFeatured: false,
    createdAt: "2026-02-10",
  },
  {
    id: "4",
    authorName: "Sarah L.",
    authorAvatar: "SL",
    hustleType: "Online Tutoring",
    monthlyIncome: 1800,
    timeInvested: "3 months",
    tips: "Start with your strongest subject and build testimonials fast. Word of mouth is everything.",
    story: "Teaching math online started as a way to make extra cash. Now I have a waitlist of students!",
    upvotes: 67,
    isFeatured: false,
    createdAt: "2026-02-05",
  },
  {
    id: "5",
    authorName: "David K.",
    authorAvatar: "DK",
    hustleType: "YouTube Channel",
    monthlyIncome: 4200,
    timeInvested: "12 months",
    tips: "Consistency is everything. I posted 3 videos per week for 6 months before seeing real income.",
    story: "My personal finance YouTube channel just hit 50K subscribers. AdSense plus sponsorships bring in a nice income every month.",
    upvotes: 156,
    isFeatured: false,
    createdAt: "2026-01-28",
  },
];

export function SuccessStories() {
  const [stories, setStories] = useState<SuccessStory[]>(mockStories);
  const [showForm, setShowForm] = useState(false);
  const [newStory, setNewStory] = useState({
    hustleType: "",
    monthlyIncome: "",
    timeInvested: "",
    tips: "",
    story: "",
  });

  const featuredStory = stories.find((s) => s.isFeatured);
  const otherStories = stories.filter((s) => !s.isFeatured).sort((a, b) => b.upvotes - a.upvotes);

  const handleUpvote = (id: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, upvotes: s.upvotes + 1 } : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const story: SuccessStory = {
      id: Date.now().toString(),
      authorName: "You",
      authorAvatar: "ME",
      hustleType: newStory.hustleType,
      monthlyIncome: Number(newStory.monthlyIncome),
      timeInvested: newStory.timeInvested,
      tips: newStory.tips,
      story: newStory.story,
      upvotes: 0,
      isFeatured: false,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setStories((prev) => [story, ...prev]);
    setShowForm(false);
    setNewStory({ hustleType: "", monthlyIncome: "", timeInvested: "", tips: "", story: "" });
  };

  return (
    <div className="space-y-6">
      {/* Featured Story */}
      {featuredStory && (
        <Card className="border-accent/30 bg-gradient-to-br from-accent-50 to-white overflow-hidden">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              <Badge variant="accent">Story of the Week</Badge>
            </div>
            <CardTitle className="mt-2">{featuredStory.authorName}&apos;s Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3 text-center border border-accent/10">
                <DollarSign className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-lg font-bold">{formatCurrency(featuredStory.monthlyIncome)}</div>
                <div className="text-[10px] text-muted-foreground">Monthly</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-accent/10">
                <Clock className="w-4 h-4 text-secondary mx-auto mb-1" />
                <div className="text-sm font-bold">{featuredStory.timeInvested}</div>
                <div className="text-[10px] text-muted-foreground">Time Invested</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-accent/10">
                <Star className="w-4 h-4 text-accent mx-auto mb-1" />
                <div className="text-sm font-bold">{featuredStory.hustleType}</div>
                <div className="text-[10px] text-muted-foreground">Hustle</div>
              </div>
            </div>
            <p className="text-sm mb-3">{featuredStory.story}</p>
            <div className="bg-primary-50 rounded-lg p-3">
              <div className="text-xs font-medium text-primary mb-1">Top Tip:</div>
              <p className="text-xs text-muted-foreground">{featuredStory.tips}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Share Button */}
      <div className="flex justify-between items-center">
        <h3 className="font-heading font-bold text-lg">Community Stories</h3>
        <Button onClick={() => setShowForm(true)} size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Share Your Story
        </Button>
      </div>

      {/* Story List */}
      <div className="space-y-4">
        {otherStories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-primary">{story.authorAvatar}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold">{story.authorName}</span>
                      <Badge variant="outline" className="text-[10px]">{story.hustleType}</Badge>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs text-primary font-medium">{formatCurrency(story.monthlyIncome)}/mo</span>
                      <span className="text-xs text-muted-foreground">{story.timeInvested}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{story.story}</p>
                    <div className="bg-gray-50 rounded p-2 mb-2">
                      <span className="text-[10px] font-medium text-foreground">Tip: </span>
                      <span className="text-[10px] text-muted-foreground">{story.tips}</span>
                    </div>
                    <button
                      onClick={() => handleUpvote(story.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      {story.upvotes}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Share Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold">Share Your Story</h2>
              <button onClick={() => setShowForm(false)}>
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Side Hustle Type</label>
                <Input
                  placeholder="e.g., Freelance Writing"
                  value={newStory.hustleType}
                  onChange={(e) => setNewStory({ ...newStory, hustleType: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Monthly Income ($)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newStory.monthlyIncome}
                  onChange={(e) => setNewStory({ ...newStory, monthlyIncome: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Time Invested</label>
                <Input
                  placeholder="e.g., 3 months"
                  value={newStory.timeInvested}
                  onChange={(e) => setNewStory({ ...newStory, timeInvested: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Your Story</label>
                <Textarea
                  placeholder="Tell us about your journey..."
                  value={newStory.story}
                  onChange={(e) => setNewStory({ ...newStory, story: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Top Tip</label>
                <Input
                  placeholder="Your best advice for others"
                  value={newStory.tips}
                  onChange={(e) => setNewStory({ ...newStory, tips: e.target.value })}
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 gap-1.5">
                  <Trophy className="w-4 h-4" />
                  Share Story
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
