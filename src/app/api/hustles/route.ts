import { NextRequest, NextResponse } from "next/server";
import { sideHustles, searchHustles, getHustlesByCategory, getTrendingHustles } from "@/data/side-hustles";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const trending = searchParams.get("trending");

    let result = sideHustles;

    if (query) {
      result = searchHustles(query);
    } else if (category) {
      result = getHustlesByCategory(category);
    } else if (trending === "true") {
      result = getTrendingHustles();
    }

    return NextResponse.json({
      success: true,
      data: {
        hustles: result,
        total: result.length,
      },
    });
  } catch (error) {
    console.error("Hustles API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
