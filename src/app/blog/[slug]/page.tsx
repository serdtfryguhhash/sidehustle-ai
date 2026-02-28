"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Clock,
  Twitter, Facebook, Link as LinkIcon, Zap,
} from "lucide-react";
import { getBlogBySlug, blogPosts } from "@/data/blog";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-2">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you are looking for does not exist.</p>
          <Link href="/blog"><Button><ArrowLeft className="w-4 h-4 mr-1.5" />Back to Blog</Button></Link>
        </div>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Blog
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline">{post.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.read_time} min read
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{post.author_avatar}</span>
                </div>
                <div>
                  <div className="font-medium text-sm">{post.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="w-8 h-8"><Twitter className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8"><Facebook className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="w-8 h-8"><LinkIcon className="w-4 h-4" /></Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mt-8">
              {post.content.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("## ")) {
                  return <h2 key={i} className="font-heading text-2xl font-bold mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
                }
                if (paragraph.startsWith("### ")) {
                  return <h3 key={i} className="font-heading text-xl font-bold mt-6 mb-3">{paragraph.replace("### ", "")}</h3>;
                }
                if (paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n").map((item) => item.replace("- ", ""));
                  return (
                    <ul key={i} className="list-disc list-inside space-y-1 mb-4 text-gray-600">
                      {items.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  );
                }
                return <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">#{tag}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary/20">
          <CardContent className="p-8 text-center">
            <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
            <h3 className="font-heading text-xl font-bold mb-2">Find Your Perfect Side Hustle</h3>
            <p className="text-sm text-muted-foreground mb-4">Take our free AI quiz and get personalized recommendations in 2 minutes.</p>
            <Link href="/quiz">
              <Button className="gap-1.5"><Zap className="w-4 h-4" />Take the Free Quiz</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-heading text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardContent className="p-5">
                      <Badge variant="outline" className="mb-2 text-xs">{related.category}</Badge>
                      <h3 className="font-heading font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
