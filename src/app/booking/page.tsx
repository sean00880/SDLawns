"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { exteriorServices, interiorServices } from "../../app/data/servicesData";
import { packagesData } from "../../app/data/packagesData";

// Type for vehicle size radio
type VehicleType = "sedan" | "suvTruck" | "van";

/**
 * Example discount combos:
 * - Basic Exterior Wash + Basic Interior Cleaning => $10 off
 * - Standard Exterior Detail + Standard Interior Detail => $20 off
 * - Premium Exterior Detail + Premium Interior Detail => $25 off
 */
const discountCombos = [
  {
    exterior: "Basic Exterior Wash",
    interior: "Basic Interior Cleaning",
    discount: 10,
  },
  {
    exterior: "Standard Exterior Detail",
    interior: "Standard Interior Detail",
    discount: 20,
  },
  {
    exterior: "Premium Exterior Detail",
    interior: "Premium Interior Detail",
    discount: 25,
  },
];

export default function BookingPage() {
  // Vehicle size radio state
  const [vehicleSize, setVehicleSize] = useState<VehicleType>("sedan");

  // Which services/packages are selected (by name)
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Access search params (Next.js 13+)
  const searchParams = useSearchParams();

  // If ?service= is present, pre-check that item
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
  }, [searchParams]);

  // Toggle a service/package in or out of selectedServices
  function handleServiceToggle(serviceName: string) {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((name) => name !== serviceName)
        : [...prev, serviceName]
    );
  }

  function handleVehicleSizeChange(newSize: VehicleType) {
    setVehicleSize(newSize);
  }

  // Compute total with combo discounts
  function computeTotal(): number {
    const allItems = [...exteriorServices, ...interiorServices, ...packagesData];
    let sum = 0;

    // 1) sum base prices
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

    // 2) sum combo discounts
    let comboDiscount = 0;
    for (const combo of discountCombos) {
      const hasExt = selectedServices.includes(combo.exterior);
      const hasInt = selectedServices.includes(combo.interior);
      if (hasExt && hasInt) {
        comboDiscount += combo.discount;
      }
    }

    const total = sum - comboDiscount;
    return total < 0 ? 0 : total;
  }

  const total = computeTotal();

  // Optional: show total discount from combos
  const totalComboDiscount = (() => {
    let discount = 0;
    for (const combo of discountCombos) {
      if (
        selectedServices.includes(combo.exterior) &&
        selectedServices.includes(combo.interior)
      ) {
        discount += combo.discount;
      }
    }
    return discount;
  })();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <header className="p-6 border-b border-white/10">
        <h1 className="text-3xl font-bold">Booking Page</h1>
        <p className="text-white/70 mt-2">
          Select your vehicle size and services/packages to build your custom detailing.
        </p>
      </header>

      {/* MAIN: Grid layout on lg screens; single column on smaller screens */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 p-6 gap-6">
        {/* LEFT: 2 columns worth (the form) */}
        <div className="space-y-8 col-span-2">
          {/* 1) Vehicle Size */}
          <section className="bg-white/5 p-4 rounded-md border border-white/10">
            <h2 className="text-xl font-semibold mb-2">Select Vehicle Size:</h2>
            <div className="flex space-x-4">
              <label className="cursor-pointer flex flex-col items-center">
                <input
                  type="radio"
                  name="vehicleSize"
                  value="sedan"
                  checked={vehicleSize === "sedan"}
                  onChange={() => handleVehicleSizeChange("sedan")}
                  className="mb-1"
                />
                <span>Sedan</span>
              </label>

              <label className="cursor-pointer flex flex-col items-center">
                <input
                  type="radio"
                  name="vehicleSize"
                  value="suvTruck"
                  checked={vehicleSize === "suvTruck"}
                  onChange={() => handleVehicleSizeChange("suvTruck")}
                  className="mb-1"
                />
                <span>SUV/Truck</span>
              </label>

              <label className="cursor-pointer flex flex-col items-center">
                <input
                  type="radio"
                  name="vehicleSize"
                  value="van"
                  checked={vehicleSize === "van"}
                  onChange={() => handleVehicleSizeChange("van")}
                  className="mb-1"
                />
                <span>Van</span>
              </label>
            </div>
          </section>

          {/* 2) Exterior Services */}
          <section className="bg-white/5 p-4 rounded-md border border-white/10">
            <h2 className="text-xl font-semibold mb-2">
              Exterior Services ({vehicleSize.toUpperCase()} Pricing)
            </h2>
            <div className="space-y-2">
              {exteriorServices.map((srv) => {
                let price = srv.sedanPrice;
                if (vehicleSize === "suvTruck") price = srv.suvTruckPrice;
                if (vehicleSize === "van") price = srv.vanPrice;

                const isChecked = selectedServices.includes(srv.name);

                return (
                  <label
                    key={srv.name}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleServiceToggle(srv.name)}
                    />
                    <span>
                      {srv.name}: <span className="text-green-300">${price}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 3) Interior Services */}
          <section className="bg-white/5 p-4 rounded-md border border-white/10">
            <h2 className="text-xl font-semibold mb-2">
              Interior Services ({vehicleSize.toUpperCase()} Pricing)
            </h2>
            <div className="space-y-2">
              {interiorServices.map((srv) => {
                let price = srv.sedanPrice;
                if (vehicleSize === "suvTruck") price = srv.suvTruckPrice;
                if (vehicleSize === "van") price = srv.vanPrice;

                const isChecked = selectedServices.includes(srv.name);

                return (
                  <label
                    key={srv.name}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleServiceToggle(srv.name)}
                    />
                    <span>
                      {srv.name}: <span className="text-green-300">${price}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 4) Detailing Packages */}
          <section className="bg-white/5 p-4 rounded-md border border-white/10">
            <h2 className="text-xl font-semibold mb-2">
              Detailing Packages ({vehicleSize.toUpperCase()} Pricing)
            </h2>
            <div className="space-y-2">
              {packagesData.map((pkg) => {
                let price = pkg.sedanPrice;
                if (vehicleSize === "suvTruck") price = pkg.suvTruckPrice;
                if (vehicleSize === "van") price = pkg.vanPrice;

                const isChecked = selectedServices.includes(pkg.name);

                return (
                  <label
                    key={pkg.name}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleServiceToggle(pkg.name)}
                    />
                    <span>
                      {pkg.name}: <span className="text-green-300">${price}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/* RIGHT: SUMMARY (sticky on large screens) */}
        <aside
          className="
            col-span-1 
            bg-white/10 
            p-6 
            rounded-lg 
            border border-white/20 
            h-fit 
            self-start 
            lg:sticky 
            lg:top-20
          "
        >
          <h2 className="text-xl font-semibold mb-4">SUMMARY</h2>
          <p className="text-white/70 mb-4">
            Vehicle Size: <strong>{vehicleSize.toUpperCase()}</strong>
          </p>

          <div className="space-y-1 mb-4">
            {selectedServices.map((serviceName) => {
              const all = [...exteriorServices, ...interiorServices, ...packagesData];
              const item = all.find((i) => i.name === serviceName);
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

          {/* Show combo discount if any */}
          {totalComboDiscount > 0 && (
            <div className="flex justify-between text-red-400 mb-2">
              <span>Combo Discount(s):</span>
              <span>- ${totalComboDiscount}</span>
            </div>
          )}

          {/* Final total */}
          <div className="flex justify-between border-t border-white/20 pt-2 text-lg font-bold">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded">
            Proceed to Checkout
          </button>
        </aside>
      </main>
    </div>
  );
}
