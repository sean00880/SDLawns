"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices,
} from "../app/data/servicesData";

const MobileHeader: React.FC<{
  menuOpen: boolean;
  toggleMenu: () => void;
}> = ({ menuOpen, toggleMenu }) => {
  const servicesData = {
    LawnCare: lawncareServices,
    PressureWashing: pressureWashingServices,
    DumpRuns: dumpRunServices,
    Gardening: gardeningServices,
  };
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<
    "weekly" | "bi-weekly" | "monthly" | "one-time"
  >("weekly");

  const toggleMegaMenu = () => setMegaMenuOpen(!megaMenuOpen);

  return (
    <>
      {menuOpen && (
        <div className="fixed inset-0 h-screen bg-white z-50 flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-black text-2xl focus:outline-none"
            onClick={toggleMenu}
          >
            &times;
          </button>
          <ul className="flex flex-col items-center space-y-6 text-black">
            <li>
              <Link href="/" className="nav-link" onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={toggleMegaMenu}
                className="nav-link relative flex items-center"
              >
                Services
              </button>
              {megaMenuOpen && (
                <div className="fixed inset-y-0 h-screen right-0 w-full bg-white shadow-lg p-6 z-50 overflow-y-auto">
                  <button
                    className="absolute top-4 right-4 text-black text-2xl focus:outline-none"
                    onClick={toggleMegaMenu}
                  >
                    &times;
                  </button>
                  <div className="grid grid-cols-1 gap-6 max-w-full">
                    {Object.entries(servicesData).map(([category, data]) => (
                      <div
                        key={category}
                        className="flex flex-col items-center"
                      >
                        <Image
                          src={data.packages[0]?.img || "/images/default-service.jpg"}
                          alt={category}
                          width={300}
                          height={200}
                          className="rounded-lg mb-2 object-cover h-[200px]"
                        />
                        <h3 className="font-bold text-black text-center">
                          {category}
                        </h3>
                        <ul className="mt-2 w-full">
                          {data.services.map((service) => (
                            <li
                              key={service.id}
                              className="text-sm text-gray-600 mb-2"
                            >
                              <div className="flex justify-between items-center">
                                <span>{service.name}</span>
                                <span className="text-black font-medium">
                                  $
                                  {service.pricing[selectedFrequency] || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <Link
                                  href={`/booking?slug=${service.id}-${selectedFrequency}`}
                                  className="text-green-500 hover:underline text-sm"
                                >
                                  Book Now
                                </Link>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <label className="text-sm font-bold text-black">
                      Frequency:
                    </label>
                    <select
                      value={selectedFrequency}
                      onChange={(e) =>
                        setSelectedFrequency(
                          e.target.value as typeof selectedFrequency
                        )
                      }
                      className="p-2 rounded-md bg-gray-100 border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-green-500 mt-2"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="one-time">One-time</option>
                    </select>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link href="/booking" className="nav-link" onClick={toggleMenu}>
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
