import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "SideHustle.ai - Discover Your Perfect Side Hustle with AI",
  description: "AI-powered platform to discover, launch, and grow your ideal side hustle. Take our quiz, get personalized playbooks, track your income, and join a community of hustlers.",
  keywords: ["side hustle", "make money online", "passive income", "freelancing", "side hustle ideas", "AI", "income tracker"],
  authors: [{ name: "SideHustle.ai" }],
  openGraph: {
    title: "SideHustle.ai - Discover Your Perfect Side Hustle with AI",
    description: "AI-powered platform to discover, launch, and grow your ideal side hustle.",
    url: "https://sidehustle.ai",
    siteName: "SideHustle.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SideHustle.ai - Discover Your Perfect Side Hustle with AI",
    description: "AI-powered platform to discover, launch, and grow your ideal side hustle.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
