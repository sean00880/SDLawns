"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { lawncareServices, pressureWashingServices, dumpRunServices, gardeningServices } from "../app/data/servicesData";

type Frequency = "weekly" | "bi-weekly" | "monthly" | "one-time";

interface ServicesSectionProps {
  category: "lawncare" | "pressureWashing" | "dumpRuns" | "gardening";
  frequency: Frequency;
}

export function ServicesSection({ category, frequency }: ServicesSectionProps) {
  const generateBookingURL = (serviceId: string) => {
    const params = new URLSearchParams({
      services: JSON.stringify([serviceId]),
      frequency,
    }).toString();
    return `/booking?${params}`;
  };

  const generateReadMoreURL = (serviceId: string) => {
    return `/services/${serviceId}`;
  };

  const renderServices = (services: typeof lawncareServices.services) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {services.map((srv) => (
          <Card
            key={srv.id}
            className="relative bg-white border border-gray-200 shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform flex flex-col"
          >
            {/* Service Image with Price */}
            <div className="relative w-full h-52">
              <Image
                src={srv.img} // Path stored in srv.img
                alt={srv.name}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-0 left-0 bg-green-700 text-white px-4 py-2 text-sm font-bold rounded-br-lg">
                ${srv.pricing[frequency]} / {frequency.replace("-", " ")}
              </div>
            </div>

            {/* Service Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{srv.name}</h3>
              <CardContent className="space-y-2">
                {srv.description.map((line, idx) => (
                  <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                    {line}
                  </p>
                ))}
              </CardContent>
            </div>

            {/* CTA: Book Now and Read More */}
            <div className="p-4 mt-auto flex justify-between items-center">
              <Link href={generateBookingURL(srv.id)} className="w-1/2 pr-2">
                <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                  Book Now
                </Button>
              </Link>
              <Link href={generateReadMoreURL(srv.id)} className="w-1/2 pl-2 text-center">
                <Button variant="outline" className="w-full text-green-600 hover:text-green-700 border-green-600 hover:border-green-700">
                  Read More
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const services =
    category === "lawncare"
      ? lawncareServices.services
      : category === "pressureWashing"
      ? pressureWashingServices.services
      : category === "dumpRuns"
      ? dumpRunServices.services
      : gardeningServices.services;

  return (
    <section className="px-4 py-10 bg-gray-50 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Services</h2>
      {renderServices(services)}
    </section>
  );
}
