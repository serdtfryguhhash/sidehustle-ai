import { NextRequest, NextResponse } from "next/server";
import { affiliateLinks } from "@/data/affiliate-links";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const link = affiliateLinks[params.slug];

  if (!link) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.redirect(link.url);
}
