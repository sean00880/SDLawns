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
  description: string[];
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
  pressurewashing: `Revitalize your property's exterior with our premium pressure washing services.`,
  dumpruns: `Effortlessly clear out unwanted items with our dump run services in San Diego.`,
  gardening: `Transform your outdoor spaces with our gardening services in San Diego.`,
};

// Wrapper Component
export default function ServiceCategoryWrapper({ params }: { params: Promise<{ category: string }> }) {
  const [categoryFromParams, setCategoryFromParams] = useState<string | null>(null);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setCategoryFromParams(resolvedParams.category);
    };
    fetchParams();
  }, [params]);

  if (!categoryFromParams) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return <ServiceCategoryPage categoryFromParams={categoryFromParams} />;
}

// Main Component
function ServiceCategoryPage({ categoryFromParams }: { categoryFromParams: string }) {
  const [category, setCategory] = useState<string | null>(null);
  const [categoryServices, setCategoryServices] = useState<CategoryData | null>(null);

  const [selectedFrequency, setSelectedFrequency] = useState<"weekly" | "bi-weekly" | "monthly" | "one-time">("weekly");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    const normalizedCategory = categoryFromParams.replace(/-/g, "").toLowerCase();
    if (normalizedCategory in categoryData) {
      setCategory(normalizedCategory);
      setCategoryServices(categoryData[normalizedCategory]);
    } else {
      setCategory(null);
      setCategoryServices(null);
    }
  }, [categoryFromParams]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) => {
      const updatedServices = prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];

      // If deselecting a service that is part of a selected package, deselect the package
      if (selectedPackage) {
        const selectedPkg = categoryServices?.packages.find((pkg) => pkg.id === selectedPackage);
        if (selectedPkg && !selectedPkg.servicesIncluded.every((id) => updatedServices.includes(id))) {
          setSelectedPackage(null);
        }
      }

      return updatedServices;
    });
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

  const generateBookingURL = (): string => {
    const params = new URLSearchParams();
    if (selectedServices.length > 0) params.append("services", JSON.stringify(selectedServices));
    if (selectedPackage) params.append("packages", JSON.stringify([selectedPackage]));
    params.append("frequency", selectedFrequency);
    return `/booking?${params.toString()}`;
  };

  if (!category || !categoryServices) {
    return <div className="text-center text-gray-500">Invalid category or loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 bg-pure-white min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <h1 className="text-4xl font-bold text-green-600 mb-6">
          {category.charAt(0).toUpperCase() + category.slice(1)} Services
        </h1>
        <p className="text-gray-700 mb-8 text-lg">{categoryDescriptions[category]}</p>

        {/* Services Section */}
        {categoryServices.services.map((service, index) => {
          const content = lawncareContent[service.id as keyof typeof lawncareContent];
          const { excerpt } = content
            ? { excerpt: content.excerpt || "Description not available." }
            : { excerpt: "Description not available." };

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
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    {isSelected ? "Deselect" : "Select"}
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
            const isSelected = selectedPackage === pkg.id;

            return (
              <div key={pkg.id} className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={pkg.img}
                  alt={pkg.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{pkg.name}</h3>
                <ul className="text-sm text-gray-600 mb-4">
                  {pkg.servicesIncluded.map((serviceId) => {
                    const service = categoryServices.services.find((srv) => srv.id === serviceId);
                    return service ? <li key={serviceId}>{service.name}</li> : null;
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
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handlePackageToggle(pkg.id)}
                  >
                    {isSelected ? "Deselect" : "Select"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 h-[60vh] bg-white shadow-md rounded-lg p-6 sticky lg:top-[9vh] text-black">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Booking Summary</h2>

        {selectedPackage ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Selected Package:</h3>
            <p className="font-medium">{categoryServices.packages.find((pkg) => pkg.id === selectedPackage)?.name}</p>
            <ul className="list-disc pl-5">
              {categoryServices.packages
                .find((pkg) => pkg.id === selectedPackage)
                ?.servicesIncluded.map((serviceId) => {
                  const service = categoryServices.services.find((srv) => srv.id === serviceId);
                  return service ? <li key={serviceId}>{service.name}</li> : null;
                })}
            </ul>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Selected Services:</h3>
            {selectedServices.length > 0 ? (
              <ul className="list-disc pl-5">
                {selectedServices.map((serviceId) => {
                  const service = categoryServices.services.find((srv) => srv.id === serviceId);
                  return service ? <li key={serviceId}>{service.name}</li> : null;
                })}
              </ul>
            ) : (
              <p className="text-gray-500">No services selected.</p>
            )}
          </div>
        )}

        {/* Frequency Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Frequency:</h3>
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

        {/* Total Calculation */}
        <div className="text-xl font-bold text-gray-800 flex justify-between border-t border-gray-300 pt-4">
          <span>Total:</span>
          <span>${computeTotal()}</span>
        </div>

        {/* Book Now Button */}
        <button
          className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded mt-4 text-white"
          onClick={() => {
            const bookingURL = generateBookingURL();
            window.location.href = bookingURL;
          }}
        >
          Book This Service
        </button>
      </aside>
    </div>
  );
}
