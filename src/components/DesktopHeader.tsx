"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices,
} from "../app/data/servicesData";

const DesktopHeader: React.FC = () => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<
    "weekly" | "bi-weekly" | "monthly" | "one-time"
  >("weekly");

  const servicesData = {
    LawnCare: lawncareServices,
    PressureWashing: pressureWashingServices,
    DumpRuns: dumpRunServices,
    Gardening: gardeningServices,
  };

  const toggleMegaMenu = () => setMegaMenuOpen(!megaMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logoSD.png"
            alt="San Diego Custom Backyards Logo"
            width={180}
            height={50}
            className="object-contain rounded-md"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <div className="relative">
            <button
              onClick={toggleMegaMenu}
              className="nav-link flex items-center focus:outline-none"
            >
              Services
            </button>
            {megaMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg py-8 z-50">
                <div className="container mx-auto px-6 grid grid-cols-4 gap-8">
                  {Object.entries(servicesData).map(([category, data]) => (
                    <div key={category} className="flex flex-col items-center">
                      <Image
                        src={data.packages?.[0]?.img || "/images/default-service.jpg"}
                        alt={category}
                        width={300}
                        height={200}
                        className="rounded-lg mb-4 object-cover"
                      />
                      <h3 className="font-bold text-lg text-black">{category}</h3>
                      <ul className="mt-4 w-full">
                        {data.services.map((service) => (
                          <li
                            key={service.id}
                            className="flex justify-between text-gray-700 py-2"
                          >
                            <Link
                              href={`/services/${service.id}/page`}
                              className="hover:underline"
                            >
                              {service.name}
                            </Link>
                            <span className="text-black font-medium">
                              ${service.pricing?.[selectedFrequency] || "N/A"}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <h4 className="text-black font-semibold">Package:</h4>
                        <div className="flex justify-between text-gray-700 py-2">
                          <Link
                            href={`/services/${data.packages?.[0]?.id}/page`}
                            className="hover:underline"
                          >
                            {data.packages?.[0]?.name || "No Package"}
                          </Link>
                          <span className="text-black font-medium">
                            ${data.packages?.[0]?.pricing?.[selectedFrequency] || "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 px-6">
                  <label className="font-bold text-sm text-black">
                    Frequency:
                  </label>
                  <select
                    value={selectedFrequency}
                    onChange={(e) =>
                      setSelectedFrequency(
                        e.target.value as typeof selectedFrequency
                      )
                    }
                    className="p-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="bi-weekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="one-time">One-time</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <Link href="/categories/all/page" className="nav-link">
            Categories
          </Link>
          <Link href="/booking" className="nav-link">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
