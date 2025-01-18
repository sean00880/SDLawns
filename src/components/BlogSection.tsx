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

const blogPosts = [
  {
    title: "Top Landscaping Trends in San Diego for 2025",
    date: "January 16, 2025",
    excerpt:
      "Discover the most popular landscaping trends in San Diego, including sustainable designs, drought-tolerant plants, and outdoor living spaces.",
    href: "/blog/landscaping-trends-san-diego-2025",
  },
  {
    title: "The Benefits of Professional Backyard Design in San Diego",
    date: "January 17, 2025",
    excerpt:
      "Learn why investing in professional backyard design can elevate your San Diego home with improved functionality and stunning aesthetics.",
    href: "/blog/benefits-professional-backyard-design",
  },
  {
    title: "Drought-Tolerant Landscaping Ideas for San Diego Homes",
    date: "January 18, 2025",
    excerpt:
      "Explore water-saving landscaping ideas that thrive in San Diego's climate, from succulents to native plants and xeriscaping tips.",
    href: "/blog/drought-tolerant-landscaping-ideas",
  },
];

export function BlogSection() {
  return (
    <section
      className="
        min-h-screen
        flex
        flex-col
        justify-center
        items-center
        bg-gray-100
        px-6
        sm:px-12
        py-16
        rounded-lg
      "
      id="blog"
    >
      {/* Section Container */}
      <div
        className="
          w-full
          max-w-7xl
          rounded-lg
          shadow-neumorphic
          bg-white
          p-8
        "
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl text-black mb-4 font-semibold">
            Landscaping Insights & Tips
          </h2>
          <p className="text-lg text-gray-700">
            Stay updated with the latest trends and expert advice to transform
            your backyard in San Diego.
          </p>
        </div>

        {/* Posts Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >
          {blogPosts.map((post, i) => (
            <Card
              key={i}
              className="
                bg-gray-50
                rounded-lg
                shadow-neumorphic
                hover:shadow-neumorphic-hover
                transition-shadow
                duration-300
                overflow-hidden
              "
            >
              <CardHeader className="p-6">
                <CardTitle className="text-2xl text-black">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-6">{post.excerpt}</p>
                <Link href={post.href}>
                  <Button
                    variant="link"
                    className="text-green-500 p-0 h-auto"
                  >
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
