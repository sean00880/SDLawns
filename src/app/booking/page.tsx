"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { exteriorServices, interiorServices } from "../../app/data/servicesData";
import { packagesData } from "../../app/data/packagesData";

// If you changed “deluxe” to “standard” in your data, ensure servicesData reflects that.

type VehicleType = "sedan" | "suvTruck" | "van";

/**
 * Example discount combos:
 * - Basic Exterior Wash + Basic Interior Cleaning => $10 off
 * - Standard Exterior Detail + Standard Interior Detail => $20 off
 * - Premium Exterior Detail + Premium Interior Detail => $25 off
 *
 * You can expand or modify these as needed.
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
  // 1) Vehicle size
  const [vehicleSize, setVehicleSize] = useState<VehicleType>("sedan");

  // 2) Which items (services/packages) have been selected
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Access search params via Next.js 13+ app router
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchParams = async () => {
      const serviceParam = searchParams?.get("service");
      if (serviceParam) {
        const allItems = [
          ...exteriorServices,
          ...interiorServices,
          ...packagesData,
        ];
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
    };
    fetchSearchParams();
  }, [searchParams]);

  // Toggle an item in/out of `selectedServices`
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

  /**
   * computeTotal:
   * - Sum up prices of all selected items
   * - Check for combos in discountCombos
   * - Subtract the sum of relevant combo discounts
   */
  function computeTotal(): number {
    // Combine all items
    const allItems = [...exteriorServices, ...interiorServices, ...packagesData];

    // 1) Sum base prices
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

    // 2) Sum combo discounts
    let comboDiscount = 0;
    for (const combo of discountCombos) {
      const hasExterior = selectedServices.includes(combo.exterior);
      const hasInterior = selectedServices.includes(combo.interior);
      if (hasExterior && hasInterior) {
        comboDiscount += combo.discount;
      }
    }

    // Final total can't go below zero
    const final = sum - comboDiscount;
    return final < 0 ? 0 : final;
  }

  // final total
  const total = computeTotal();

  // If you want to show how much discount in total from combos:
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

      <main className="flex-grow flex flex-col lg:flex-row p-6 gap-6">
        {/* LEFT: FORM */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* 1) Vehicle Size */}
          <section>
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

          {/* 2) Exterior */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Exterior Services ({vehicleSize.toUpperCase()} Pricing)
            </h2>
            <div className="space-y-2">
              {exteriorServices.map((service) => {
                let price = service.sedanPrice;
                if (vehicleSize === "suvTruck") price = service.suvTruckPrice;
                if (vehicleSize === "van") price = service.vanPrice;

                const isChecked = selectedServices.includes(service.name);

                return (
                  <label
                    key={service.name}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleServiceToggle(service.name)}
                    />
                    <span>
                      {service.name}: <span className="text-green-300">${price}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 3) Interior */}
          <section>
            <h2 className="text-xl font-semibold mb-2">
              Interior Services ({vehicleSize.toUpperCase()} Pricing)
            </h2>
            <div className="space-y-2">
              {interiorServices.map((service) => {
                let price = service.sedanPrice;
                if (vehicleSize === "suvTruck") price = service.suvTruckPrice;
                if (vehicleSize === "van") price = service.vanPrice;

                const isChecked = selectedServices.includes(service.name);

                return (
                  <label
                    key={service.name}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleServiceToggle(service.name)}
                    />
                    <span>
                      {service.name}: <span className="text-green-300">${price}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </section>

          {/* 4) Packages */}
          <section>
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

        {/* RIGHT: SUMMARY */}
        <aside className="w-full lg:w-1/3 bg-white/10 p-6 rounded-lg border border-white/20 h-fit self-start sticky-summary">
          <h2 className="text-xl font-semibold mb-4">SUMMARY</h2>

          <p className="text-white/70 mb-4">
            Vehicle Size: <strong>{vehicleSize.toUpperCase()}</strong>
          </p>

          <div className="space-y-1 mb-4">
            {selectedServices.map((serviceName) => {
              // Look up the item in any of the arrays
              const allItems = [...exteriorServices, ...interiorServices, ...packagesData];
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

          {/* If combos apply, show them */}
          {totalComboDiscount > 0 && (
            <div className="flex justify-between text-red-400 mb-2">
              <span>Combo Discount(s):</span>
              <span>- ${totalComboDiscount}</span>
            </div>
          )}

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
