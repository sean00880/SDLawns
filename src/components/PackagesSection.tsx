"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices,
} from "../app/data/servicesData";

type Frequency = "weekly" | "bi-weekly" | "monthly" | "one-time";

interface PackagesSectionProps {
  category: "lawncare" | "pressureWashing" | "dumpRuns" | "gardening";
  frequency: Frequency;
}

export function PackagesSection({ category, frequency }: PackagesSectionProps) {
  const calculateSavings = (
    servicesIncluded: string[],
    pricingFrequency: Frequency
  ): number => {
    const serviceDetails =
      category === "lawncare"
        ? lawncareServices.services
        : category === "pressureWashing"
        ? pressureWashingServices.services
        : category === "dumpRuns"
        ? dumpRunServices.services
        : gardeningServices.services;

    const totalPrice = servicesIncluded.reduce((total, id) => {
      const service = serviceDetails.find((service) => service.id === id);
      return service ? total + service.pricing[pricingFrequency] : total;
    }, 0);

    const packagePrice =
      packages.find((pkg) =>
        pkg.servicesIncluded.every((id, idx) => id === servicesIncluded[idx])
      )?.pricing[pricingFrequency] || 0;

    return totalPrice - packagePrice;
  };

  const packages =
    category === "lawncare"
      ? lawncareServices.packages
      : category === "pressureWashing"
      ? pressureWashingServices.packages
      : category === "dumpRuns"
      ? dumpRunServices.packages
      : gardeningServices.packages;

  const generateBookingURL = (packageId: string, servicesIncluded: string[]) => {
    const params = new URLSearchParams({
      packages: JSON.stringify([packageId]),
      services: JSON.stringify(servicesIncluded),
      frequency,
    }).toString();
    return `/booking?${params}`;
  };

  const generateReadMoreURL = (packageId: string) => {
    return `/services/${packageId}`;
  };

  const renderPackages = (
    packages: typeof lawncareServices.packages,
    pricingFrequency: Frequency
  ) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-between">
        {packages.map((pkg) => {
          const savings = calculateSavings(pkg.servicesIncluded, frequency);

          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              {/* Package Image */}
              <div className="relative h-48">
                <Image
                  src={pkg.img}
                  alt={pkg.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-green-700 text-white px-4 py-2 text-sm font-bold">
                  ${pkg.pricing[frequency]} / {frequency}
                </div>
              </div>

              {/* Package Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {pkg.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  Save ${savings > 0 ? savings.toFixed(2) : 0} when you buy this
                  package!
                </p>

                {/* Services Included */}
                <ul className="text-sm text-gray-600">
                  {pkg.servicesIncluded.map((id) => {
                    const service =
                      category === "lawncare"
                        ? lawncareServices.services.find(
                            (srv) => srv.id === id
                          )
                        : category === "pressureWashing"
                        ? pressureWashingServices.services.find(
                            (srv) => srv.id === id
                          )
                        : category === "dumpRuns"
                        ? dumpRunServices.services.find((srv) => srv.id === id)
                        : gardeningServices.services.find(
                            (srv) => srv.id === id
                          );

                    return (
                      service && (
                        <li key={id} className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span>{service.name}</span>
                        </li>
                      )
                    );
                  })}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-4 mt-auto flex justify-between items-center gap-4">
                <Link href={generateBookingURL(pkg.id, pkg.servicesIncluded)}>
                  <Button className="w-full bg-green-700 text-white hover:bg-green-800">
                    Book Now
                  </Button>
                </Link>
                <Link href={generateReadMoreURL(pkg.id)}>
                  <Button
                    variant="outline"
                    className="w-full text-green-600 hover:text-green-700 border-green-600 hover:border-green-700"
                  >
                    Read More
                  </Button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Packages
        </h2>
        {renderPackages(packages, frequency)}
      </div>
    </section>
  );
}
