"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock, BookOpen, Calendar, User,
} from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-border py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="outline" className="mb-3"><BookOpen className="w-3 h-3 mr-1" />Blog</Badge>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">Side Hustle Blog</h1>
          <p className="text-gray-600 text-lg">Guides, strategies, and inspiration to help you build profitable side hustles.</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Post */}
        <Link href={`/blog/${featuredPost.slug}`}>
          <Card className="mb-8 overflow-hidden hover:shadow-lg transition-shadow group">
            <CardContent className="p-8 md:p-12">
              <Badge className="bg-primary-100 text-primary border-0 mb-4">Featured Article</Badge>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 mb-4 text-lg">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{featuredPost.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(featuredPost.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featuredPost.read_time} min read</span>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-xs">{post.category}</Badge>
                    <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read_time} min</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
