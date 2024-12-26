"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

export function Testimonials() {
  // Example data; you might fetch this from an API or keep it local
  const testimonials = [
    {
      name: "John Doe",
      role: "Car Enthusiast",
      avatarUrl: "/avatars/john.jpg",   // or an external URL
      feedback: "No Limits Mobile Detailing really lives up to its name—my car looks flawless, inside and out. Absolutely stellar service!"
    },
    {
      name: "Jane Smith",
      role: "Busy Professional",
      avatarUrl: "/avatars/jane.jpg",
      feedback: "I love that they come straight to my office. The team was super thorough and my car hasn’t looked this good in years!"
    },
    {
      name: "Mike Johnson",
      role: "Family Guy",
      avatarUrl: "",
      feedback: "With two messy kids, my minivan needed serious help. These folks worked miracles—I can’t believe how clean everything is now."
    },
  ]

  return (
    <section className="my-10">
      <h2 className="text-3xl font-bold text-white mb-4 text-center">
        Testimonials
      </h2>
      <p className="text-white/70 text-center mb-8">
        Hear what our satisfied customers have to say!
      </p>

      {/* Container for cards */}
      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-6
        px-4
        max-w-6xl
        mx-auto
      ">
        {testimonials.map((t, i) => (
          <Card 
            key={i}
            className="
              bg-white/10
              backdrop-blur-md
              border border-white/20
              shadow-xl
              hover:scale-[1.02]
              transition-transform
              text-white
            "
          >
            <CardHeader className="flex items-center space-x-4">
              <Avatar>
                {t.avatarUrl ? (
                  <AvatarImage src={t.avatarUrl} alt={t.name} />
                ) : (
                  <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <CardTitle>{t.name}</CardTitle>
                <CardDescription className="text-sm text-white/70">
                  {t.role}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <p className="text-white/80 text-sm leading-relaxed">
                "{t.feedback}"
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
