"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"about" | "team">("about");

  const images = [
    { src: "/images/landscape1.jpg", alt: "Beautifully landscaped yard in San Diego" },
    { src: "/images/landscape2.jpg", alt: "Professional landscaping team in action" },
    { src: "/images/landscape3.jpg", alt: "Elegant backyard design in San Diego" },
    { src: "/images/landscape4.jpg", alt: "Customized outdoor space" },
  ];

  const teamMembers = [
    {
      name: "John Doe",
      role: "Landscape Designer",
      image: "/images/team-member1.jpg",
      bio: "John has over 15 years of experience creating stunning outdoor designs tailored to San Diego’s unique climate.",
    },
    {
      name: "Jane Smith",
      role: "Horticulturist",
      image: "/images/team-member2.jpg",
      bio: "Jane specializes in sustainable gardening practices, ensuring every plant thrives in Southern California's environment.",
    },
    {
      name: "Michael Brown",
      role: "Construction Manager",
      image: "/images/team-member3.jpg",
      bio: "Michael oversees construction projects, ensuring high-quality craftsmanship and timely delivery for all clients.",
    },
  ];

  return (
    <section className="bg-white w-full h-screen flex flex-col items-center justify-center px-6 sm:px-12 py-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h2 className="text-4xl font-bold text-green-700 mb-4">About San Diego Landscaping Co.</h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Serving San Diego and surrounding areas, we are your trusted partner in crafting outdoor spaces that reflect your vision and enhance your lifestyle. Our team combines innovation, sustainability, and attention to detail to deliver exceptional results.
        </p>
      </motion.div>

      {/* Horizontal Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`px-4 py-2 rounded-full shadow-md text-black ${
            activeTab === "about"
              ? "bg-white text-green-700 font-bold shadow-inner"
              : "bg-white hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About Us
        </button>
        <button
          className={`px-4 py-2 rounded-full shadow-md text-black ${
            activeTab === "team"
              ? "bg-white text-green-700 font-bold shadow-inner"
              : "bg-white hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("team")}
        >
          Our Team
        </button>
      </div>

      {/* Tab Content */}
      <div
        className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 w-full h-[70vh] flex items-center overflow-hidden"
        style={{ minHeight: "60vh" }}
      >
        {activeTab === "about" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row w-full h-full"
          >
            {/* ABOUT SECTION */}
            <div className="space-y-6 m-4 w-full md:w-[60%] flex flex-col h-full items-start justify-center">
              <p className="text-gray-700 leading-relaxed">
                At <strong>San Diego Landscaping Co.</strong>, we take pride in transforming outdoor spaces into breathtaking havens. Whether you need lawn care, tree trimming, or a complete backyard overhaul, our team of experts has you covered.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our services are tailored to San Diego’s unique coastal environment, ensuring sustainable and aesthetically pleasing solutions. From drought-resistant gardens to lush green lawns, we understand what works best in Southern California.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to create outdoor spaces that reflect your style and meet your practical needs, all while adding value to your property.
              </p>
              <div className="mt-4">
                <a
                  href="#services"
                  className="inline-block bg-green-700 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-800 transition"
                >
                  Explore Our Services
                </a>
              </div>
            </div>

            {/* IMAGE CAROUSEL */}
            <div className="w-full md:w-[40%]">
              <motion.div
                className="relative w-full h-full rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* TEAM SECTION */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Meet Our Expert Team
            </h3>
            <p className="text-gray-600 mb-6">
              Our experienced team is dedicated to delivering top-notch services for every project, no matter the size.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="relative w-full h-40 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h4>
                  <p className="text-sm text-green-700">{member.role}</p>
                  <p className="text-gray-600 mt-2">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
