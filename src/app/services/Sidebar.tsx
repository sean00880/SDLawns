"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices,
} from "../data/servicesData";

const Sidebar = () => {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const categories = [
    {
      name: "Lawn Care",
      path: "/categories/lawncare",
      data: lawncareServices,
    },
    {
      name: "Pressure Washing",
      path: "/categories/pressure-washing",
      data: pressureWashingServices,
    },
    {
      name: "Dump Runs",
      path: "/categories/dump-runs",
      data: dumpRunServices,
    },
    {
      name: "Gardening",
      path: "/categories/gardening",
      data: gardeningServices,
    },
  ];

  return (
    <aside className="sticky top-[6vh] h-screen w-1/4 bg-gray-100 shadow-md p-4">
      <h2 className="text-xl font-bold text-gray-700 m-6">Categories</h2>
      <ul className="space-y-4">
        {categories.map((category) => (
          <li key={category.name} className="border-b pb-2">
            <button
              onClick={() => toggleCategory(category.name)}
              className={`flex items-center justify-between w-full text-left text-gray-800 font-medium hover:text-green-700 transition-colors ${
                pathname.startsWith(category.path) ? "text-green-700 font-bold" : ""
              }`}
            >
              {category.name}
              <span>{activeCategory === category.name ? "-" : "+"}</span>
            </button>
            {activeCategory === category.name && (
              <div className="mt-2 space-y-2">
                {/* Services */}
                <h3 className="text-sm font-bold text-gray-600">Services</h3>
                <ul className="pl-4 space-y-1">
                  {category.data.services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={`/services/${service.id}`}
                        className={`block text-gray-700 hover:text-green-700 ${
                          pathname === `/services/${service.id}` ? "text-green-700 font-bold" : ""
                        }`}
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                {/* Packages */}
                <h3 className="text-sm font-bold text-gray-600 mt-3">Packages</h3>
                <ul className="pl-4 space-y-1">
                  {category.data.packages.map((pkg) => (
                    <li key={pkg.id}>
                      <Link
                        href={`/services/${pkg.id}`}
                        className={`block text-gray-700 hover:text-green-700 ${
                          pathname === `/services/${pkg.id}` ? "text-green-700 font-bold" : ""
                        }`}
                      >
                        {pkg.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
