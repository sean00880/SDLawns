"use client";

import { useState } from "react";
import { Hero } from "../components/Hero";
import { AboutSection } from "../components/AboutSection";
import { PackagesSection } from "../components/PackagesSection";
import { ServicesSection } from "../components/ServicesSection";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Testimonials } from "../components/Testimonials";
import { BlogSection } from "../components/BlogSection";
import { Button } from "../components/ui/button";

// A simple type for your vehicle tabs
export type VehicleType = "sedan" | "suvTruck" | "van";

// If you’re using Next.js app router, this is your page component:
export default function HomePage() {

  

  // Track which vehicle size is selected
  const [activeVehicle, setActiveVehicle] = useState<VehicleType>("sedan");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-[#001a15] to-[#004d40]">
      <Hero />

      <main className="flex-grow space-y-6 px-4 sm:px-8 py-8">
        <AboutSection />

        {/* Horizontal Tabs to select vehicle type */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Select Vehicle Type</h2>
          <div className="flex space-x-4">
            <Button
              variant={activeVehicle === "sedan" ? "default" : "secondary"}
              onClick={() => setActiveVehicle("sedan")}
            >
              Sedan
            </Button>
            <Button
              variant={activeVehicle === "suvTruck" ? "default" : "secondary"}
              onClick={() => setActiveVehicle("suvTruck")}
            
            >
              SUV/Truck
            </Button>
            <Button
              variant={activeVehicle === "van" ? "default" : "secondary"}
              onClick={() => setActiveVehicle("van")}
            >
              Van
            </Button>
          </div>
        </section>

        {/* Pass the selected vehicle type to Packages and Services sections */}
        <PackagesSection vehicleType={activeVehicle} />
        <ServicesSection vehicleType={activeVehicle} />

        <WhyChooseUs />
        <Testimonials />
        <BlogSection />
      </main>
    </div>
  );
}
