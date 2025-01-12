"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { exteriorServices, interiorServices } from "../../app/data/servicesData";
import { packagesData } from "../../app/data/packagesData";
import { Calendar, Radio, RadioGroup, Button, ButtonGroup, cn } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend, startOfWeek, startOfMonth } from "@internationalized/date";
import { supabase } from "@/components/lib/supaBaseClient";
import { useLocale } from "@react-aria/i18n";

type VehicleType = "sedan" | "suvTruck" | "van";

/**
 * Example discount combos:
 * - Basic Exterior Wash + Basic Interior Cleaning => $10 off
 * - Standard Exterior Detail + Standard Interior Detail => $20 off
 * - Premium Exterior Detail + Premium Interior Detail => $25 off
 */
const discountCombos = [
  { exterior: "Basic Exterior Wash", interior: "Basic Interior Cleaning", discount: 10 },
  { exterior: "Standard Exterior Detail", interior: "Standard Interior Detail", discount: 20 },
  { exterior: "Premium Exterior Detail", interior: "Premium Interior Detail", discount: 25 },
];

/* 
 The default export is a wrapper that uses <Suspense>. 
 Inside the fallback, you could show a spinner or skeleton. 
 The <BookingContent> does the actual logic with useSearchParams().
*/
export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading booking form...</div>}>
      <BookingContent />
    </Suspense>
  );
}

/* 
 The child component that calls useSearchParams() 
 and renders the booking form. 
*/
function BookingContent() {
  const [vehicleSize, setVehicleSize] = useState<VehicleType>("sedan");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
    const searchParams = useSearchParams();
    let defaultDate = today(getLocalTimeZone());
    let [value, setValue] = React.useState(defaultDate);
    let {locale} = useLocale();
  
    let now = today(getLocalTimeZone());
    let nextWeek = startOfWeek(now.add({weeks: 1}), locale);
    let nextMonth = startOfMonth(now.add({months: 1}));
  

  // On mount, read ?service= from the URL and pre-select if found
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

  // Toggle a service/package name in or out of selectedServices
  function handleServiceToggle(name: string) {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  function handleVehicleSizeChange(newSize: VehicleType) {
    setVehicleSize(newSize);
  }

  // Compute total
  function computeTotal(): number {
    const allItems = [...exteriorServices, ...interiorServices, ...packagesData];
    let sum = 0;

    // sum item prices
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

    // subtract combo discounts
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

  // Just for display, how much discount from combos
  const totalComboDiscount = discountCombos.reduce((acc, combo) => {
    if (
      selectedServices.includes(combo.exterior) &&
      selectedServices.includes(combo.interior)
    ) {
      return acc + combo.discount;
    }
    return acc;
  }, 0);

  if (isLoading) {
    return <div className="p-6 text-white">Loading booking data...</div>;
  }

  const handleSubmit = async () => {
    const data = {
      vehicleSize,
      services: selectedServices,
      date: selectedDate.toString(),
      total,
    };

    // Insert into Supabase
    const { error } = await supabase.from("quote_requests").insert([data]);

    if (error) {
      console.error("Error submitting quote request:", error);
      alert("An error occurred while submitting your quote.");
    } else {
      alert("Quote request submitted successfully!");
      setSelectedServices([]);
      setSelectedDate(today(getLocalTimeZone())); // Reset the form
    }
  };
  
    const CustomRadio: React.FC<React.ComponentProps<typeof Radio>> = (props) => {
      const { children, ...otherProps } = props;
    
      return (
        <Radio
          {...otherProps}
          classNames={{
            base: cn(
              "flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between",
              "cursor-pointer rounded-full border-2 border-default-200/60",
              "data-[selected=true]:border-primary"
            ),
            label: "text-tiny text-default-500",
            labelWrapper: "px-1 m-0",
            wrapper: "hidden",
          }}
        >
          {children}
        </Radio>
      );
    };

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

          {/* 3) Interior */}
          <section>
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
          <h2 className="text-xl font-semibold mb-4 text-black">SUMMARY</h2>

          <p className="text-black/70 mb-4">
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
                  <span className="text-black">{serviceName}</span>
                  <span className="text-green-800">${price}</span>
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

          {/* Final total */}
          <div className="flex justify-between border-t text-black border-white/20 pt-2 text-lg font-bold">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          
          <section className="bg-black flex flex-col justify-center">
            <h2 className="text-xl text-red font-semibold mb-4">Select a Date</h2>
            <Calendar className="bg-white text-white"
        aria-label="Date (Unavailable)"

        classNames={{
          content: "w-full  calendar",
        }}
        focusedValue={value}
        nextButtonProps={{
          variant: "bordered",
        }}
        prevButtonProps={{
          variant: "bordered",
        }}
        topContent={
          <ButtonGroup
            fullWidth
            className="px-3 pb-2 pt-3 bg-black [&>button]:text-default-500 [&>button]:border-default-200/60"
            radius="full"
            size="sm"
            variant="bordered"
          >
            <Button onPress={() => setValue(now)}>Today</Button>
            <Button onPress={() => setValue(nextWeek)}>Next week</Button>
            <Button onPress={() => setValue(nextMonth)}>Next month</Button>
          </ButtonGroup>
        }
        value={value}
        onChange={setValue}
        onFocusChange={setValue}
      />
          </section>
          <button className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded" onClick={handleSubmit}>
            Submit Quote
          </button>
        </aside>
      </main>
    </div>
  );
}
