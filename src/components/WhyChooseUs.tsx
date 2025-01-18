"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function WhyChooseUs() {
  const categories = [
    {
      name: "Lawncare",
      features: [
        "Precise mowing and edging",
        "Custom tree/weed removal plans",
        "High-quality fertilization techniques",
      ],
      img: "/images/lawn.jpg",
    },
    {
      name: "Pressure Washing",
      features: [
        "Eco-friendly surface restoration",
        "Advanced grease removal for driveways",
        "Deck and patio cleaning expertise",
      ],
      img: "/images/powerwash.png",
    },
    {
      name: "Dump Runs",
      features: [
        "Efficient junk and debris removal",
        "Construction waste recycling",
        "Affordable bulk pickup options",
      ],
      img: "/images/dump.png",
    },
    {
      name: "Gardening",
      features: [
        "Seasonal flower planting",
        "Expert garden bed maintenance",
        "Personalized mulching and pruning services",
      ],
      img: "/images/gardening2.jpg",
    },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section id="why-us" className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br rounded-lg from-gray-100 via-white to-gray-300 px-6 sm:px-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-green-700 mb-4">Why Choose Us?</h2>
        <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
          Discover why San Diego Landscaping Co. is the trusted choice for outdoor transformations. From lawn care to junk removal, we offer unmatched services tailored to your needs.
        </p>
      </div>

      {/* Tabs for Categories */}
      <div className="flex justify-center space-x-4 mb-12">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md transition ${
              activeCategory.name === category.name
                ? "bg-green-700 text-white"
                : "bg-white text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Interactive Features */}
      <motion.div
        key={activeCategory.name}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-6xl flex flex-col lg:flex-row items-center bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-xl p-8 gap-8"
      >
        {/* Left: Image */}
        <motion.div
          className="w-full lg:w-1/2 relative h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={activeCategory.img}
            alt={activeCategory.name}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right: Features */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col justify-center text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-green-700 mb-4">
            {activeCategory.name} Benefits
          </h3>
          <ul className="space-y-4">
            {activeCategory.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 text-gray-800"
              >
                <span className="w-4 h-4 bg-green-700 rounded-full"></span>
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}
