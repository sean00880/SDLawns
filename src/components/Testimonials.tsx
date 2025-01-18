"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export function Testimonials() {
  // Landscaping-related testimonials data
  const testimonials = [
    {
      name: "Lisa Green",
      role: "Homeowner in San Diego",
      avatarUrl: "/avatars/lisa.jpg",
      feedback:
        "San Diego Landscaping transformed my backyard into a stunning oasis. I can't believe how beautiful everything looks now!",
    },
    {
      name: "Robert Taylor",
      role: "Business Owner",
      avatarUrl: "/avatars/robert.jpg",
      feedback:
        "Our office garden has never looked better! The team was professional and delivered exactly what we wanted. Highly recommend!",
    },
    {
      name: "Emma Johnson",
      role: "Eco-Conscious Homeowner",
      avatarUrl: "",
      feedback:
        "I love how they used sustainable practices to redesign my front yard. It's beautiful, eco-friendly, and exactly what I wanted.",
    },
    {
      name: "David Martinez",
      role: "Commercial Property Manager",
      avatarUrl: "/avatars/david.jpg",
      feedback:
        "Their maintenance packages are perfect for keeping our property looking polished year-round. Fantastic work!",
    },
  ];

  // State to manage active testimonial in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next and previous handlers
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials" className="my-16 relative bg-cover bg-center text-white rounded-lg bg-fixed"
      style={{ backgroundImage: "url('/images/sandeigo.webp')" }} // Add your background image
    >
      <div className="bg-black/40 py-10 px-6 rounded-lg">
        <h2 className="text-4xl font-bold text-center mb-6">What Our Clients Say</h2>
        <p className="text-white/80 text-center mb-10">
          Discover how we’ve helped transform landscapes across San Diego.
        </p>

        {/* Carousel */}
        <div className="relative w-full max-w-4xl rounded-lg mx-auto overflow-hidden">
          <motion.div
            className="flex"
            initial={{ x: 0 }}
            animate={{ x: -currentIndex * 100 + "%" }}
            transition={{ duration: 0.6 }}
            style={{ width: `${testimonials.length * 100}%` }}
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="flex-shrink-0 rounded-lg w-full px-6 py-8 bg-white/20 backdrop-blur-lg  text-white"
                style={{ flex: "0 0 100%" }}
              >
                <CardHeader className="flex items-center space-x-4">
                  <Avatar>
                    {testimonial.avatarUrl ? (
                      <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                    ) : (
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription className="text-sm text-white/70">{testimonial.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 text-sm leading-relaxed">"{testimonial.feedback}"</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-6 transform -translate-y-1/2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition"
          >
            &#8592;
          </button>
        </div>
        <div className="absolute top-1/2 right-6 transform -translate-y-1/2">
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition"
          >
            &#8594;
          </button>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? "bg-green-500" : "bg-white/30"
              } transition`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
