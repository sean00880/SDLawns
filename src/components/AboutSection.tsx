"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

export function AboutSection() {
  return (
    <section className="mb-6">
      {/* We can wrap everything in a <section> instead of a big Card if desired */}
      <div
        className="
          glassmorphism-card
          bg-white/5
          backdrop-blur-md
          border border-white/20
          text-white
          shadow-xl
          p-6
        "
      >
        {/* ABOUT TITLE */}
        <h2 className="text-3xl font-semibold mb-4">About Us</h2>

        {/* TWO-COLUMN LAYOUT FOR MAIN TEXT + IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: TEXT CONTENT */}
          <div className="space-y-4">
            <p className="text-white/80 leading-relaxed">
              No Limits Mobile Detailing LLC is proud to serve car owners in
              <strong> San Diego, California</strong>. We bring the detailing
              shop directly to your driveway—saving you time, hassle, and
              ensuring you receive exceptional quality without leaving home.
            </p>
            <p className="text-white/80 leading-relaxed">
              Our philosophy is simple:{" "}
              <em>deliver a showroom-ready finish</em> for every vehicle,
              no matter its make or model. We combine premium products,
              industry-leading techniques, and a passion for cars to give
              your ride the pampering it deserves.
            </p>
            <p className="text-white/80 leading-relaxed">
              Whether you drive a family SUV, a classic convertible, or a
              corporate fleet vehicle, our certified detailers handle each
              project with the same care. We take pride in restoring paint
              luster, reviving interiors, and protecting surfaces against
              the coastal elements unique to San Diego.
            </p>
          </div>

          {/* RIGHT: IMAGE GALLERY */}
          <div className="flex flex-col space-y-4">
            <div className="relative w-full h-40 md:h-52 overflow-hidden rounded-lg hover:scale-[1.02] transition-transform">
              <Image
                src="/images/polish.webp"
                alt="Team polishing a car"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-40 md:h-52 overflow-hidden rounded-lg hover:scale-[1.02] transition-transform">
              <Image
                src="/images/interior.jpg"
                alt="Clean, shiny interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* OUR PROMISE */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-3">Our Promise:</h3>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <CheckCircleIcon />
              <span className="text-white/80 leading-relaxed">
                <strong>Convenience:</strong> We handle the cleaning while you relax at home, work, or anywhere in San Diego County.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircleIcon />
              <span className="text-white/80 leading-relaxed">
                <strong>Premium Products:</strong> We only use top-tier polishes, waxes, and coatings for a brilliant, long-lasting shine.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircleIcon />
              <span className="text-white/80 leading-relaxed">
                <strong>Expertise:</strong> Our detailers undergo continuous training to master the latest techniques and technology.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircleIcon />
              <span className="text-white/80 leading-relaxed">
                <strong>Eco-Friendly:</strong> Our methods minimize water usage and pollution, helping preserve San Diego’s natural beauty.
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircleIcon />
              <span className="text-white/80 leading-relaxed">
                <strong>Unmatched Customer Care:</strong> We treat your vehicle as if it were our own—no exceptions.
              </span>
            </li>
          </ul>
        </div>

        {/* CTA or concluding statement */}
        <div className="mt-6 text-white/80">
          Ready to give your car the attention it deserves? Check out our
          <strong> Services</strong> or <strong>Packages</strong> and experience
          the difference for yourself!
        </div>
      </div>
    </section>
  );
}

/**
 * Example functional component for a check circle icon.
 * You can also import from a library (e.g. Heroicons) instead.
 */
function CheckCircleIcon() {
  return (
    <svg
      className="w-5 h-5 text-green-400 flex-shrink-0 mt-[2px]"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293
           a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 
           00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
