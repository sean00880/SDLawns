"use client";

import React, { useState, useEffect } from "react";
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices,
} from "../../data/servicesData";
import { lawncareContent } from "../../data/content/lawncareContent";

interface Service {
  id: string;
  name: string;
  description: string[]; // Adjusted to align with `servicesData`
  img: string;
  pricing: Record<string, number>;
}



interface Package {
  id: string;
  name: string;
  servicesIncluded: string[];
  img: string;
  pricing: Record<string, number>;
}

interface CategoryData {
  services: Service[];
  packages: Package[];
}


const categoryData: Record<string, CategoryData> = {
  lawncare: lawncareServices,
  pressurewashing: pressureWashingServices,
  dumpruns: dumpRunServices,
  gardening: gardeningServices,
};



const categoryDescriptions: Record<string, string> = {
  lawncare: `Keep your lawn pristine and lush with our expert lawn care services in San Diego.`,
  pressureWashing: `Revitalize your property's exterior with our premium pressure washing services.`,
  dumpRuns: `Effortlessly clear out unwanted items with our dump run services in San Diego.`,
  gardening: `Transform your outdoor spaces with our gardening services in San Diego.`,
};

export default function ServiceCategoryPage({ params }: { params: { category: string } }) {
  const [category, setCategory] = useState<string | null>(null);
  const [categoryServices, setCategoryServices] = useState<CategoryData | null>(null);

  useEffect(() => {
    const normalizedCategory = params.category.replace(/-/g, "").toLowerCase();
    console.log("Normalized Category:", normalizedCategory);
    console.log("Available Categories:", Object.keys(categoryData));
  
    if (normalizedCategory in categoryData) {
      setCategory(normalizedCategory);
      setCategoryServices(categoryData[normalizedCategory]);
    } else {
      setCategory(null);
      setCategoryServices(null);
    }
  }, [params]);
  
  
  
  
  

  const [selectedFrequency, setSelectedFrequency] = useState<"weekly" | "bi-weekly" | "monthly" | "one-time">("weekly");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);


  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handlePackageToggle = (packageId: string) => {
    if (selectedPackage === packageId) {
      setSelectedPackage(null);
      setSelectedServices([]);
    } else {
      const selectedPkg = categoryServices?.packages.find((pkg) => pkg.id === packageId);
      if (selectedPkg) {
        setSelectedPackage(packageId);
        setSelectedServices(selectedPkg.servicesIncluded);
      }
    }
  };

  const computeTotal = () => {
    let total = 0;

    if (selectedPackage) {
      const selectedPkg = categoryServices?.packages.find((pkg) => pkg.id === selectedPackage);
      if (selectedPkg) total += selectedPkg.pricing[selectedFrequency];
    } else {
      selectedServices.forEach((serviceId) => {
        const service = categoryServices?.services.find((srv) => srv.id === serviceId);
        if (service) total += service.pricing[selectedFrequency];
      });
    }

    return total;
  };

  const generateExcerptAndList = (content: string | undefined) => {
    if (!content) return { excerpt: "Description not available.", listItems: [] };
  
    const paragraphs = content.trim().split("\n").filter((p) => p.length > 0);
    const excerpt = paragraphs[0];
    const listItems = paragraphs
      .slice(1)
      .filter((line) => line.trim().startsWith("-"))
      .map((item) => item.trim().substring(2));
    return { excerpt, listItems };
  };
  

  if (!category || !categoryServices) {
    return <div className="text-center text-gray-500">Invalid category or loading...</div>;
  }
  

  // Function to generate query string
  const generateBookingURL = (): string => {
    const params = new URLSearchParams();
    if (selectedServices.length > 0) params.append("services", JSON.stringify(selectedServices));
    if (selectedPackage) params.append("packages", JSON.stringify([selectedPackage]));
    params.append("frequency", selectedFrequency);
    return `/booking?${params.toString()}`;
  };
  
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-pure-white min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          {category.charAt(0).toUpperCase() + category.slice(1)} Services
        </h1>
        <p className="text-gray-700 mb-8 text-lg">{categoryDescriptions[category]}</p>

        {/* Detailed Rows for Services */}
        {categoryServices.services.map((service, index) => {
          const { excerpt, listItems } = generateExcerptAndList(
            lawncareContent[service.id as keyof typeof lawncareContent]
          );
          const isSelected = selectedServices.includes(service.id);
          return (
            <div
              key={service.id}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-6 mb-12`}
            >
              <img
                src={service.img}
                alt={service.name}
                className="w-full lg:w-1/2 h-60 object-cover rounded-lg shadow-md"
              />
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-bold text-green-700 mb-4">{service.name}</h2>
                <p className="text-gray-700 mb-4">{excerpt}</p>
                <ul className="list-disc pl-5 text-gray-700 mb-4">
                  {listItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <div className="flex items-center gap-4">
                  <a
                    href={`/services/${service.id}`}
                    className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Read More
                  </a>
                  <button
                    className={`py-2 px-4 rounded-lg ${
                      isSelected
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    } transition-all`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    {isSelected ? "Selected" : "Select"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Packages Section */}
        <h2 className="text-2xl font-semibold text-green-700 mt-12 mb-6">Available Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {categoryServices.packages.map((pkg) => {
    const isSelected = selectedPackage === pkg.id; // Check if the package is selected

    return (
      <div key={pkg.id} className="bg-white shadow-md rounded-lg p-4">
        <img
          src={pkg.img}
          alt={pkg.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {pkg.name}
        </h3>
        <ul className="text-sm text-gray-600 mb-4">
          {pkg.servicesIncluded.map((serviceId) => {
            const service = categoryServices.services.find((srv) => srv.id === serviceId);
            return service && <li key={serviceId}>{service.name}</li>;
          })}
        </ul>
        <div className="flex items-center gap-4">
          <a
            href={`/services/packages/${pkg.id}`}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Read More
          </a>
          <button
            className={`py-2 px-4 rounded-lg ${
              isSelected
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => handlePackageToggle(pkg.id)}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    );
  })}
</div>

      </div>

      {/* Sticky Sidebar Widget */}
      <aside className="w-full lg:w-1/3 h-[60vh] bg-white shadow-md rounded-lg p-6 sticky top-6 text-black">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Booking Summary</h2>

        {/* Frequency Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Frequency</h3>
          <div className="flex space-x-2">
            {["weekly", "bi-weekly", "monthly", "one-time"].map((freq) => (
              <button
                key={freq}
                className={`py-2 px-4 rounded-lg border ${
                  selectedFrequency === freq
                    ? "bg-green-500 text-white"
                    : "bg-white text-green-500 border-green-500 hover:bg-green-100"
                }`}
                onClick={() => setSelectedFrequency(freq as typeof selectedFrequency)}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Package Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Package</h3>
          {categoryServices.packages.map((pkg) => (
            <label key={pkg.id} className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                checked={selectedPackage === pkg.id}
                onChange={() => handlePackageToggle(pkg.id)}
              />
              <span>{pkg.name} (${pkg.pricing[selectedFrequency]})</span>
            </label>
          ))}
        </div>

        {/* Services Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Services</h3>
          {categoryServices.services.map((service) => (
            <label
              key={service.id}
              className={`flex items-center space-x-2 mb-2 ${
                selectedPackage &&
                categoryServices.packages
                  .find((pkg) => pkg.id === selectedPackage)
                  ?.servicesIncluded.includes(service.id)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                disabled={
                  selectedPackage &&
                  categoryServices.packages
                    .find((pkg) => pkg.id === selectedPackage)
                    ?.servicesIncluded.includes(service.id)
                }
                checked={selectedServices.includes(service.id)}
                onChange={() => handleServiceToggle(service.id)}
              />
              <span>{service.name} (${service.pricing[selectedFrequency]})</span>
            </label>
          ))}
        </div>

        {/* Total Calculation */}
        <div className="text-xl font-bold text-gray-800 flex justify-between border-t border-gray-300 pt-4">
          <span>Total:</span>
          <span>${computeTotal()}</span>
        </div>

        <button
  className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded mt-4 text-white"
  onClick={() => {
    const bookingURL = generateBookingURL();
    window.location.href = bookingURL; // Redirect to the booking page
  }}
>
  Proceed to Booking
</button>
      </aside>
    </div>
  );
}
