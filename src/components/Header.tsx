"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Updated import
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices,
} from "../app/data/servicesData";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState<
    "weekly" | "bi-weekly" | "monthly" | "one-time"
  >("weekly");
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Using `useRouter` from `next/navigation`

  const servicesData = {
    LawnCare: lawncareServices,
    PressureWashing: pressureWashingServices,
    DumpRuns: dumpRunServices,
    Gardening: gardeningServices,
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleMegaMenu = () => setMegaMenuOpen(!megaMenuOpen);

  function generateSlug(name: string, frequency: "weekly" | "bi-weekly" | "monthly" | "one-time"): string {
    return `${name.toLowerCase().replace(/\s+/g, "-")}-${frequency}`;
  }

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
      setMegaMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
        setMegaMenuOpen(false);
      }
    };
  
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setMegaMenuOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);
    router.prefetch("/");
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);
  
  
  
  
  return (
    <header className="glass-header sticky top-0 w-full z-50 shadow-md bg-white/90 backdrop-blur-lg"  ref={menuRef}>
      <div className="p-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logoSD.png"
            alt="San Diego Custom Backyards Logo"
            width={200}
            height={60}
            className="object-contain rounded-md"
            priority
          />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden flex flex-col items-center justify-center w-10 h-10 focus:outline-none"
          onClick={toggleMenu}
        >
          <div
            className={`h-1 w-6 bg-black rounded transition-transform duration-300 ${
              menuOpen ? "transform rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-black rounded my-1 transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`h-1 w-6 bg-black rounded transition-transform duration-300 ${
              menuOpen ? "transform -rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>

        {/* Desktop Navigation */}
      
{/* Desktop Navigation */}
<nav
  className={`${
    menuOpen ? "block" : "hidden"
  } md:flex md:items-center md:space-x-6 w-full md:w-auto text-black`}
>
  <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-black">
    <li>
      <Link href="/" className="nav-link" onClick={() => setMegaMenuOpen(false)}>
        Home
      </Link>
    </li>
    <li>
      <div className="relative">
        <button
          onClick={toggleMegaMenu}
          className="nav-link relative flex items-center"
        >
          Services
        </button>
        {megaMenuOpen && (
          <div className="fixed top-full left-0 w-full bg-white shadow-lg p-6 z-50">
            <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
              {Object.entries(servicesData).map(([category, data]) => (
                <div
                  key={category}
                  className="flex flex-col items-center border border-gray-200 rounded-lg p-4 shadow-md"
                >
                  <Image
                    src={data.packages?.[0]?.img || "/images/default-service.jpg"}
                    alt={category}
                    width={300}
                    height={200}
                    className="rounded-lg mb-2 object-cover h-[200px]"
                  />
                  <h3 className="font-bold text-black text-center text-lg mb-2">
                    <Link
                      href={`/services/${category.toLowerCase()}`}
                      className="text-green-600 hover:underline"
                      onClick={() => {
                        setMegaMenuOpen(false);
                      }}
                    >
                      {category}
                    </Link>
                  </h3>
                  <ul className="mt-2 w-full">
                    {data.services.map((service) => (
                      <li
                        key={service.id}
                        className="text-sm text-gray-800 mb-4 border-b border-gray-200 pb-2"
                      >
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/services/${service.id}`}
                            className="text-green-600 hover:underline"
                            onClick={() => {
                              setMegaMenuOpen(false);
                            }}
                          >
                            {service.name}
                          </Link>
                          <span className="text-black font-medium">
                            ${service.pricing?.[selectedFrequency] || "N/A"}
                          </span>
                        </div>
                        <div className="mt-1">
                          <Link
                            href={`/booking?services=%5B%22${service.id}%22%5D&frequency=${selectedFrequency}`}
                            className="text-green-600 hover:underline text-sm"
                            onClick={() => {
                              setMegaMenuOpen(false);
                            }}
                          >
                            Book Now
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 w-full">
                    <h4 className="font-semibold text-black mb-2">Package:</h4>
                    {data.packages?.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="text-sm text-gray-800 mb-4 border-b border-gray-200 pb-2"
                      >
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/services/${pkg.id}`}
                            className="text-green-600 hover:underline"
                            onClick={() => {
                              setMegaMenuOpen(false);
                            }}
                          >
                            {pkg.name || "No Package"}
                          </Link>
                          <span className="text-black font-medium">
                            ${pkg.pricing?.[selectedFrequency] || "N/A"}
                          </span>
                        </div>
                        <div className="mt-1">
                          <Link
                            href={`/booking?services=%5B%22${pkg.id}%22%5D&frequency=${selectedFrequency}`}
                            className="text-green-600 hover:underline text-sm"
                            onClick={() => {
                              setMegaMenuOpen(false);
                            }}
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Frequency Toggle */}
            <div className="mt-6 max-w-7xl mx-auto">
              <label className="text-sm font-bold text-black">Frequency:</label>
              <select
                value={selectedFrequency}
                onChange={(e) =>
                  setSelectedFrequency(e.target.value as typeof selectedFrequency)
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
      </div>
    </li>
    <li>
      <Link href="/booking" className="nav-link" onClick={() => setMegaMenuOpen(false)}>
        Get a Quote
      </Link>
    </li>
  </ul>
</nav>






        {/* Mobile Navigation */}
        {menuOpen && (
  <div className="fixed inset-0 h-screen bg-white z-50 flex flex-col items-center justify-center">
    <button
      className="absolute top-4 right-4 text-black text-2xl focus:outline-none"
      onClick={() => setMenuOpen(false)}
    >
      &times;
    </button>
    <ul className="flex flex-col items-center space-y-6 text-black">
      {/* Home Link */}
      <li>
        <Link href="/" className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
      </li>

      {/* Services Menu */}
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
              onClick={() => {
                setMegaMenuOpen(false);
              }}
            >
              &times;
            </button>
            <div className="grid grid-cols-1 gap-6 max-w-full">
              {Object.entries(servicesData).map(([category, data]) => (
                <div key={category} className="flex flex-col items-center">
                  <Image
                    src={data.packages[0]?.img || "/images/default-service.jpg"}
                    alt={category}
                    width={300}
                    height={200}
                    className="rounded-lg mb-2 object-cover h-[200px]"
                  />
                  <h3 className="font-bold text-black text-center text-lg mb-2">
                    <Link
                      href={`/services/${category.toLowerCase()}`}
                      className="text-green-600 hover:underline"
                      onClick={() => {
                        setMegaMenuOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {category}
                    </Link>
                  </h3>
                  <ul className="mt-2 w-full">
                    {data.services.map((service) => (
                      <li
                        key={service.id}
                        className="text-sm text-gray-800 mb-4 border-b border-gray-200 pb-2"
                      >
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/services/${service.id}`}
                            className="text-green-600 hover:underline"
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setMenuOpen(false);
                            }}
                          >
                            {service.name}
                          </Link>
                          <span className="text-black font-medium">
                            ${service.pricing?.[selectedFrequency] || "N/A"}
                          </span>
                        </div>
                        <div className="mt-1">
                          <Link
                            href={`/booking?services=%5B%22${service.id}%22%5D&frequency=${selectedFrequency}`}
                            className="text-green-600 hover:underline text-sm"
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setMenuOpen(false);
                            }}
                          >
                            Book Now
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 w-full">
                    <h4 className="font-semibold text-black mb-2">Package:</h4>
                    {data.packages?.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="text-sm text-gray-800 mb-4 border-b border-gray-200 pb-2"
                      >
                        <div className="flex justify-between items-center">
                          <Link
                            href={`/services/${pkg.id}`}
                            className="text-green-600 hover:underline"
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setMenuOpen(false);
                            }}
                          >
                            {pkg.name || "No Package"}
                          </Link>
                          <span className="text-black font-medium">
                            ${pkg.pricing?.[selectedFrequency] || "N/A"}
                          </span>
                        </div>
                        <div className="mt-1">
                          <Link
                            href={`/booking?services=%5B%22${pkg.id}%22%5D&frequency=${selectedFrequency}`}
                            className="text-green-600 hover:underline text-sm"
                            onClick={() => {
                              setMegaMenuOpen(false);
                              setMenuOpen(false);
                            }}
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Frequency Selector */}
            <div className="mt-6">
              <label className="text-sm font-bold text-black">Frequency:</label>
              <select
                value={selectedFrequency}
                onChange={(e) =>
                  setSelectedFrequency(e.target.value as typeof selectedFrequency)
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

      {/* Get a Quote */}
      <li>
        <Link
          href="/booking"
          className="nav-link"
          onClick={() => {
            setMenuOpen(false);
          }}
        >
          Get a Quote
        </Link>
      </li>
    </ul>
  </div>
)}


</div>
    </header>
  );
};

export default Header;
