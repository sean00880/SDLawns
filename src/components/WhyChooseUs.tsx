"use client";
import Image from "next/image";

export function WhyChooseUs() {
  return (
    <section className="relative w-full h-[50vh] flex flex-col md:flex-row items-stretch text-white overflow-hidden shadow-xl mb-6">
      {/* LEFT: Textual Content (with glass effect) */}
      <div
        className="
          md:w-1/2
          p-6
          glassmorphism-card
          bg-white/10
          backdrop-blur-md
          border-l border-t border-b border-white/20
          flex flex-col
          justify-center
        "
      >
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="space-y-3 text-white/80 leading-relaxed">
          <li>
            <strong>Convenience:</strong> We come to your location, saving you
            time and effort.
          </li>
          <li>
            <strong>Expertise:</strong> Our detailers are highly skilled and
            passionate about cars.
          </li>
          <li>
            <strong>Quality:</strong> We use premium products for a superior
            finish.
          </li>
          <li>
            <strong>Customization:</strong> Tailored to your unique needs.
          </li>
          <li>
            <strong>Satisfaction Guaranteed:</strong> We’re not happy until you
            are!
          </li>
        </ul>
      </div>

      {/* RIGHT: Image Container */}
      <div className="md:w-1/2 h-64 md:h-auto relative">
        <Image
          src="/images/polish2.jpg"
          alt="Car detailing in progress"
          fill
          className="object-cover"
        />

        {/* GRADIENT FADE: from site’s background color (dark green) w/ opacity => transparent */}
        <div
          className="
            absolute
            inset-y-0
            left-0
            w-2/5
            bg-gradient-to-r
            from-[#004D40]/80
            to-transparent
            pointer-events-none
          "
        />
      </div>
    </section>
  );
}
