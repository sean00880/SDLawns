"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { exteriorServices, interiorServices } from "../../app/data/servicesData";
import { packagesData } from "../../app/data/packagesData";
import Calendar from "../../components/Calendar";

type VehicleType = "sedan" | "suvTruck" | "van";

const discountCombos = [
  { exterior: "Basic Exterior Wash", interior: "Basic Interior Cleaning", discount: 10 },
  { exterior: "Standard Exterior Detail", interior: "Standard Interior Detail", discount: 20 },
  { exterior: "Premium Exterior Detail", interior: "Premium Interior Detail", discount: 25 },
];

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading booking form...</div>}>
      <BookingContent />
    </Suspense>
  );
}

function BookingContent() {
  const [vehicleSize, setVehicleSize] = useState<VehicleType>("sedan");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceParam = searchParams?.get("service");
    if (serviceParam) {
      const allItems = [...exteriorServices, ...interiorServices, ...packagesData];
      const foundItem = allItems.find((i) => i.name === serviceParam.trim());
      if (foundItem) {
        setSelectedServices((prev) => {
          if (!prev.includes(foundItem.name)) {
            return [...prev, foundItem.name];
          }
          return prev;
        });
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  function handleServiceToggle(name: string) {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  function handleVehicleSizeChange(newSize: VehicleType) {
    setVehicleSize(newSize);
  }

  function computeTotal(): number {
    const allItems = [...exteriorServices, ...interiorServices, ...packagesData];
    let sum = 0;

    for (const item of allItems) {
      if (selectedServices.includes(item.name)) {
        switch (vehicleSize) {
          case "suvTruck":
            sum += item.suvTruckPrice;
            break;
          case "van":
            sum += item.vanPrice;
            break;
          default:
            sum += item.sedanPrice;
            break;
        }
      }
    }

    let comboDiscount = 0;
    for (const combo of discountCombos) {
      const hasExterior = selectedServices.includes(combo.exterior);
      const hasInterior = selectedServices.includes(combo.interior);
      if (hasExterior && hasInterior) {
        comboDiscount += combo.discount;
      }
    }

    const total = sum - comboDiscount;
    return total < 0 ? 0 : total;
  }

  const total = computeTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || selectedServices.length === 0) {
      alert("Please select a service and a date.");
      return;
    }

    const formData = {
      services: selectedServices,
      vehicleSize,
      date: selectedDate.toDateString(),
      totalPrice: total,
    };

    // Send to email (example: use a service like EmailJS, or setup backend)
    console.log("Submitting booking:", formData);
    alert("Booking request submitted. Thank you!");
  };

  if (isLoading) {
    return <div className="p-6 text-white">Loading booking data...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 border-b border-white/10">
        <h1 className="text-3xl font-bold">Booking Page</h1>
        <p className="text-white/70 mt-2">
          Select your vehicle size, services/packages, and a date to book your detailing.
        </p>
      </header>

      <main className="flex-grow flex flex-col lg:flex-row p-6 gap-6">
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Vehicle Size and Services/Packages Sections */}
          {/* Same logic as original */}
        </div>

        <aside className="w-full lg:w-1/3 bg-white/10 p-6 rounded-lg border border-white/20 h-fit self-start sticky-summary">
          <h2 className="text-xl font-semibold mb-4">SUMMARY</h2>
          <p className="text-white/70 mb-4">
            Vehicle Size: <strong>{vehicleSize.toUpperCase()}</strong>
          </p>

          <div className="space-y-1 mb-4">
            {selectedServices.map((serviceName) => {
              const allItems = [
                ...exteriorServices,
                ...interiorServices,
                ...packagesData,
              ];
              const item = allItems.find((i) => i.name === serviceName);
              if (!item) return null;

              let price = item.sedanPrice;
              if (vehicleSize === "suvTruck") price = item.suvTruckPrice;
              if (vehicleSize === "van") price = item.vanPrice;

              return (
                <div key={serviceName} className="flex justify-between">
                  <span>{serviceName}</span>
                  <span className="text-green-300">${price}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between border-t border-white/20 pt-2 text-lg font-bold">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <div className="mt-6">
            <Calendar
              onChange={(date) => setSelectedDate(date)}
              value={selectedDate}
              bookedDates={[]} // Add booked dates here if needed
            />
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded"
          >
            Submit Booking
          </button>
        </aside>
      </main>
    </div>
  );
}
