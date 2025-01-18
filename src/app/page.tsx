"use client";

import { useState } from "react";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { PackagesSection } from "../components/PackagesSection";
import { ServicesSection } from "../components/ServicesSection";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Testimonials } from "../components/Testimonials";
import { BlogSection } from "../components/BlogSection";
import Image from "next/image"; // For thumb icon

// Types for service categories and frequency options
type ServiceCategory = "lawncare" | "pressureWashing" | "dumpRuns" | "gardening";
type Frequency = "weekly" | "bi-weekly" | "monthly" | "one-time";

export default function HomePage() {
  // Track the selected service category and frequency
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("lawncare");
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>("weekly");

  // Frequency options
  const frequencyOptions: { value: number; label: Frequency; icon: string }[] = [
    { value: 0, label: "weekly", icon: "/icons/weekly.png" },
    { value: 1, label: "bi-weekly", icon: "/icons/bi-weekly.png" },
    { value: 2, label: "monthly", icon: "/icons/monthly.png" },
    { value: 3, label: "one-time", icon: "/icons/one-time.png" },
  ];

  const handleSliderChange = (value: number) => {
    const selected = frequencyOptions.find((f) => f.value === value);
    if (selected) {
      setSelectedFrequency(selected.label);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero />

      <main className="flex-grow space-y-6 px-4 sm:px-8">
        <AboutSection />

        {/* Horizontal Tabs to select service category */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Our Services</h2>
          <div className="flex space-x-4" id="services">
            {(["lawncare", "pressureWashing", "dumpRuns", "gardening"] as ServiceCategory[]).map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full shadow-md text-black ${
                  activeCategory === category
                    ? "bg-white  font-bold"
                    : "bg-white hover:bg-gray-300"
                } neumorphic-button`}
                onClick={() => setActiveCategory(category)}
              >
                {category === "lawncare"
                  ? "Lawn Care"
                  : category === "pressureWashing"
                  ? "Pressure Washing"
                  : category === "gardening"
                  ? "Gardening"
                  : "Dump Runs"}
              </button>
            ))}
          </div>
        </section>

        {/* Custom Frequency Slider */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Filter by Frequency</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg neumorphic-div">
            <div className="custom-slider-container">
              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={frequencyOptions.findIndex((f) => f.label === selectedFrequency)}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="custom-slider"
              />
              <div className="custom-slider-thumb">
                <Image
                  src={
                    "/images/mower.png"
                  }
                  alt={selectedFrequency}
                  width={60}
                  height={60}
                />
              </div>
              <div className="custom-slider-marks">
                {frequencyOptions.map((option) => (
                  <div key={option.value} className="custom-slider-mark text-black">
                    <span>{option.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pass the selected service category and frequency to Packages and Services sections */}
        <PackagesSection category={activeCategory} frequency={selectedFrequency} />
        <ServicesSection category={activeCategory} frequency={selectedFrequency} />

        <WhyChooseUs />
        <Testimonials />
        <BlogSection />
      </main>

      <style jsx>{`
        .custom-slider-container {
          position: relative;
          width: 100%;
          height: 50px;
        }

        .custom-slider {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          background: #ccc;
          outline: none;
          border-radius: 4px;
        }

        .custom-slider-thumb {
          position: absolute;
          top: -15px;
          left: calc(${frequencyOptions.findIndex((f) => f.label === selectedFrequency) * 33.33}% - 16px);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
        }

        .custom-slider-marks {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .custom-slider-mark {
          text-align: center;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}
