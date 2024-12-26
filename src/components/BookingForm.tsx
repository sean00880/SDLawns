"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Calendar from "./Calendar"; // Now our react-modern-calendar-datepicker wrapper
import "../styles/CalendarOverrides.css"; // Optional custom CSS

interface Prices {
  "basic-package": { sedan: number; "suv/truck": number; van: number };
  "standard-package": { sedan: number; "suv/truck": number; van: number };
  "premium-package": { sedan: number; "suv/truck": number; van: number };
  "basic-exterior": { sedan: number; "suv/truck": number; van: number };
  "standard-exterior": { sedan: number; "suv/truck": number; van: number };
  "premium-exterior": { sedan: number; "suv/truck": number; van: number };
  "basic-interior": { sedan: number; "suv/truck": number; van: number };
  "standard-interior": { sedan: number; "suv/truck": number; van: number };
  "premium-interior": { sedan: number; "suv/truck": number; van: number };
}

type ServiceOption = keyof Prices;

const BookingForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get("service") ?? "";

  const [selectedService, setSelectedService] = useState<ServiceOption | "">(
    serviceParam ? (serviceParam as ServiceOption) : ""
  );
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    "sedan" | "suv/truck" | "van" | ""
  >("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState(0);

  // Example "booked" dates (would be fetched in real usage)
  const bookedDates = [
    new Date(2023, 7, 22),
    new Date(2023, 7, 23),
    new Date(2023, 7, 25),
  ];

  const prices: Prices = {
    "basic-package": { sedan: 100, "suv/truck": 155, van: 195 },
    "standard-package": { sedan: 210, "suv/truck": 255, van: 310 },
    "premium-package": { sedan: 325, "suv/truck": 375, van: 450 },
    "basic-exterior": { sedan: 60, "suv/truck": 80, van: 100 },
    "standard-exterior": { sedan: 95, "suv/truck": 140, van: 160 },
    "premium-exterior": { sedan: 250, "suv/truck": 295, van: 320 },
    "basic-interior": { sedan: 70, "suv/truck": 110, van: 130 },
    "standard-interior": { sedan: 185, "suv/truck": 225, van: 250 },
    "premium-interior": { sedan: 265, "suv/truck": 305, van: 325 },
  };

  function calculatePrice() {
    let price = 0;
    if (selectedService && selectedVehicleType) {
      price = prices[selectedService]?.[selectedVehicleType] || 0;
    }
    setTotalPrice(price);
  }

  useEffect(() => {
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService, selectedVehicleType, selectedDate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    console.log("Form submitted:", {
      name,
      email,
      phone,
      service: selectedService,
      vehicleType: selectedVehicleType,
      date: selectedDate,
    });

    // Example of routing after submission
    router.push("/");
  };

  return (
    <div className="booking-form-container grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* LEFT: Form (spans 2 columns on large screens) */}
      <div className="form-column lg:col-span-2">
        <h2 className="text-2xl font-bold mb-4 text-white">Book a Service</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-white mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-white mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-white mb-1">
              Select Service
            </label>
            <select
              id="service"
              name="service"
              value={selectedService}
              onChange={(e) =>
                setSelectedService(e.target.value as ServiceOption)
              }
              required
              className="w-full p-2 rounded"
            >
              <option value="">-- Select a service --</option>
              <option value="basic-package">Basic Package</option>
              <option value="standard-package">Standard Package</option>
              <option value="premium-package">Premium Package</option>
              <option value="basic-exterior">Basic Exterior Wash</option>
              <option value="standard-exterior">Standard Exterior Detail</option>
              <option value="premium-exterior">Premium Exterior Detail</option>
              <option value="basic-interior">Basic Interior Cleaning</option>
              <option value="standard-interior">Standard Interior Detail</option>
              <option value="premium-interior">Premium Interior Detail</option>
            </select>
          </div>

          <div>
            <label htmlFor="vehicleType" className="block text-white mb-1">
              Vehicle Type
            </label>
            <select
              id="vehicleType"
              name="vehicleType"
              value={selectedVehicleType}
              onChange={(e) =>
                setSelectedVehicleType(
                  e.target.value as "sedan" | "suv/truck" | "van"
                )
              }
              required
              className="w-full p-2 rounded"
            >
              <option value="">-- Select vehicle type --</option>
              <option value="sedan">Sedan</option>
              <option value="suv/truck">SUV/Truck</option>
              <option value="van">Van</option>
            </select>
          </div>

          {/* Payment placeholder */}
          <div className="mt-4">
            <h3 className="text-white font-semibold">Payment</h3>
            <p className="text-white/70">
              Stripe integration will be added later.
            </p>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>

      {/* RIGHT: Sticky calendar + price summary */}
      <div className="lg:col-span-1 space-y-4 sticky top-20 h-fit">
        {/* The modern calendar above the price summary */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h3 className="text-white mb-2">Select Date</h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            bookedDates={bookedDates} // pass array of booked JS Dates
          />
        </div>

        {/* Price summary */}
        <div className="bg-white/10 p-4 rounded shadow">
          <h3 className="text-white mb-2">Price Summary</h3>
          <p className="text-white/80">
            Selected Date: {selectedDate?.toDateString() || "None"}
          </p>
          <p className="text-white/80">Total: ${totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
