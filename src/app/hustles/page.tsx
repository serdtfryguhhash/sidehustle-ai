"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search, DollarSign, Clock, TrendingUp,
  SlidersHorizontal, X, Sparkles,
} from "lucide-react";
import { sideHustles } from "@/data/side-hustles";
import { formatCurrency, getDifficultyColor, getCategoryLabel } from "@/lib/utils";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "freelancing", label: "Freelancing" },
  { value: "ecommerce", label: "E-Commerce" },
  { value: "content-creation", label: "Content Creation" },
  { value: "investing", label: "Investing" },
  { value: "services", label: "Services" },
  { value: "digital-products", label: "Digital Products" },
  { value: "teaching", label: "Teaching" },
  { value: "tech", label: "Tech" },
];

const difficulties = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const sortOptions = [
  { value: "popularity", label: "Most Popular" },
  { value: "income-high", label: "Highest Income" },
  { value: "income-low", label: "Lowest Startup Cost" },
  { value: "time-fast", label: "Fastest to Income" },
  { value: "name", label: "A-Z" },
];

export default function HustlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);

  const filteredHustles = useMemo(() => {
    let result = [...sideHustles];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.tagline.toLowerCase().includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.skills_required.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((h) => h.category === selectedCategory);
    }

    if (selectedDifficulty !== "all") {
      result = result.filter((h) => h.difficulty === selectedDifficulty);
    }

    switch (selectedSort) {
      case "popularity":
        result.sort((a, b) => b.popularity_score - a.popularity_score);
        break;
      case "income-high":
        result.sort((a, b) => b.income_range_max - a.income_range_max);
        break;
      case "income-low":
        result.sort((a, b) => a.startup_cost_min - b.startup_cost_min);
        break;
      case "time-fast":
        result.sort((a, b) => a.hours_per_week_min - b.hours_per_week_min);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedSort]);

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedDifficulty !== "all",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-3">
              <Sparkles className="w-3 h-3 mr-1" />
              {sideHustles.length}+ Side Hustles
            </Badge>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Browse Side Hustles
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our complete database of side hustles with detailed income data, startup costs, and step-by-step launch plans.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search side hustles by name, skill, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-1.5 h-11 relative"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="h-11 px-3 rounded-lg border border-input text-sm bg-background focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          selectedCategory === cat.value
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((diff) => (
                      <button
                        key={diff.value}
                        onClick={() => setSelectedDifficulty(diff.value)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                          selectedDifficulty === diff.value
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {diff.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedDifficulty("all");
                  }}
                  className="text-sm text-primary hover:underline mt-3"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredHustles.length}</span> side hustles
          </p>
        </div>

        {filteredHustles.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold mb-2">No hustles found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedDifficulty("all"); }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHustles.map((hustle, i) => (
              <motion.div
                key={hustle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}
              >
                <Link href={`/hustles/${hustle.slug}`}>
                  <Card className="group hover:shadow-lg hover:border-primary/20 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                          <DollarSign className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {hustle.is_trending && (
                            <Badge variant="accent" className="text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          <Badge className="text-xs bg-gray-100 text-gray-600 border-0">
                            {getCategoryLabel(hustle.category)}
                          </Badge>
                        </div>
                      </div>

                      <h3 className="font-heading font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                        {hustle.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hustle.tagline}</p>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-green-50 rounded-lg p-2.5">
                          <div className="text-[10px] text-green-600 font-medium uppercase tracking-wider">Income</div>
                          <div className="font-bold text-sm text-green-700">
                            {formatCurrency(hustle.income_range_min)}-{formatCurrency(hustle.income_range_max)}
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-2.5">
                          <div className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">Startup</div>
                          <div className="font-bold text-sm text-blue-700">
                            {hustle.startup_cost_min === 0 ? "Free" : formatCurrency(hustle.startup_cost_min)}-{formatCurrency(hustle.startup_cost_max)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <Badge className={`${getDifficultyColor(hustle.difficulty).bg} ${getDifficultyColor(hustle.difficulty).text} border-0 text-xs`}>
                          {getDifficultyColor(hustle.difficulty).label}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {hustle.time_to_first_income}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
