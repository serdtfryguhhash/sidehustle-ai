import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/data/blog";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");

    if (slug) {
      const post = blogPosts.find((p) => p.slug === slug);
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: post });
    }

    let result = blogPosts.filter((p) => p.is_published);

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    return NextResponse.json({
      success: true,
      data: {
        posts: result,
        total: result.length,
      },
    });
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
