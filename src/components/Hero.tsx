"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";

export function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center text-white">
      {/* Background slides container */}
      <div className="absolute inset-0 w-full h-full">
        {/* Slide 1 */}
        <div
          className="
            absolute inset-0 
            bg-cover bg-center
            animate-fade-30s-infinite
            delay-0s
            opacity-0
          "
          style={{ 
            backgroundImage: "url('/images/landscape1.jpg')",
          }}
        />

        {/* Slide 2 */}
        <div
          className="
            absolute inset-0 
            bg-cover bg-center
            animate-fade-30s-infinite
            delay-10s
            opacity-0
          "
          style={{ 
            backgroundImage: "url('/images/landscape2.jpg')",
          }}
        />

        {/* Slide 3 */}
        <div
          className="
            absolute inset-0 
            bg-cover bg-center
            animate-fade-30s-infinite
            delay-20s
            opacity-0
          "
          style={{ 
            backgroundImage: "url('/images/landscape3.jpg')",
          }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-[1]" />

      {/* Hero content */}
      <div className="relative z-[2] max-w-2xl px-4 text-center space-y-4">
        <h1 className="text-5xl font-bold drop-shadow-md">
          Transform Your Outdoors with <br /> Premier Landscaping Services
        </h1>
        <p className="text-lg text-white/90 leading-relaxed">
          Creating Stunning, Sustainable Landscapes Across San Diego
        </p>
        <p className="text-3xl font-semibold">
          Your Dream Yard Starts Here
        </p>
        <Link href="/contact">
          <Button variant="default" className="bg-green-600 hover:bg-green-700 mt-4">
            Get a Free Quote
          </Button>
        </Link>
      </div>

      {/* (Optional) Scroll down indicator */}
      <div className="absolute bottom-6 z-[2]">
        <p className="uppercase text-sm tracking-wider text-white/80">Scroll Down</p>
      </div>
    </section>
  );
}
