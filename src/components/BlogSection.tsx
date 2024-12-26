"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

// Example data: replace with real blog posts (possibly fetched from an API).
const blogPosts = [
  {
    title: "The Ultimate Guide to Car Detailing",
    date: "July 12, 2023",
    excerpt: "Keep your car shining like new with these pro tips and essentials. From washing and waxing to interior detailing, we cover it all.",
    href: "/blog/ultimate-guide-to-car-detailing",
  },
  {
    title: "5 Tools Every Car Detailer Needs",
    date: "May 20, 2023",
    excerpt: "From microfiber towels to foam cannons, we break down the must-have equipment in every detailer's arsenal.",
    href: "/blog/5-tools-every-car-detailer-needs",
  },
  {
    title: "Ceramic Coating vs. Wax: Which Is Right for You?",
    date: "April 10, 2023",
    excerpt: "Is ceramic coating worth the investment, or should you stick to traditional wax? Let's compare durability, shine, and cost.",
    href: "/blog/ceramic-coating-vs-wax",
  },
];

export function BlogSection() {
  return (
    <section className="my-10 px-4 sm:px-8">
      {/* Section Header */}
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        Our Blog
      </h2>
      <p className="text-white/70 text-center mb-8">
        Tips, insights, and the latest news in auto detailing
      </p>

      {/* Posts Grid */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
          max-w-6xl
          mx-auto
        "
      >
        {blogPosts.map((post, i) => (
          <Card
            key={i}
            className="
              bg-white/10
              backdrop-blur-md
              border border-white/20
              shadow-xl
              hover:scale-[1.02]
              transition-transform
              duration-300
              text-white
            "
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                {post.title}
              </CardTitle>
              <CardDescription className="text-sm text-white/70">
                {post.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80 mb-4">{post.excerpt}</p>
              <Link href={post.href}>
                <Button variant="link" className="text-green-400 p-0 h-auto">
                  Read More →
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
