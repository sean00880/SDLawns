"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/components/lib/supaBaseClient";
import { exteriorServices, interiorServices } from "../app/data/servicesData";
import {packagesData} from "../app/data/packagesData";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { CalendarDate } from "@internationalized/date"; // Import CalendarDate

type VehicleType = "sedan" | "suvTruck" | "van";

const AdminModifyQuote = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [vehicleSize, setVehicleSize] = useState<VehicleType>("sedan");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Fetch all quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching quotes:", error);
      } else {
        setQuotes(data || []);
      }
    };

    fetchQuotes();
  }, []);

  // Load selected quote details into the form
  const handleSelectQuote = (quote: any) => {
    setSelectedQuote(quote);
    setVehicleSize(quote.vehicle_size);
    setSelectedServices(quote.services || []);
  
    // Convert JavaScript Date to CalendarDate
    const calendarDate = new CalendarDate(
      new Date(quote.date).getFullYear(),
      new Date(quote.date).getMonth() + 1, // Months are 0-indexed in JS Date
      new Date(quote.date).getDate()
    );
    setSelectedDate(calendarDate); // Pass the correct type to setSelectedDate
  
    setTotal(quote.total);
  };

  // Toggle a service selection
  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  // Recalculate total
  useEffect(() => {
    const computeTotal = () => {
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

      setTotal(sum);
    };

    computeTotal();
  }, [vehicleSize, selectedServices]);

  // Update the quote in Supabase
  const handleUpdateQuote = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("quote_requests")
      .update({
        vehicle_size: vehicleSize,
        services: selectedServices,
        date: selectedDate.toString(), // Use `toString()` for CalendarDate
        total,
      })
      .eq("id", selectedQuote.id);
  
    setLoading(false);
  
    if (error) {
      console.error("Error updating quote:", error);
      alert("An error occurred while updating the quote.");
    } else {
      alert("Quote updated successfully!");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin: Modify Quotes</h1>

      {/* Quotes List */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Quotes</h2>
        <ul className="space-y-2">
          {quotes.map((quote) => (
            <li
              key={quote.id}
              className="p-4 bg-white shadow rounded cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelectQuote(quote)}
            >
              <div>
                <strong>ID:</strong> {quote.id}
              </div>
              <div>
                <strong>Vehicle Size:</strong> {quote.vehicle_size}
              </div>
              <div>
                <strong>Total:</strong> ${quote.total}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Form */}
      {selectedQuote && (
        <div className="p-6 bg-white shadow rounded">
          <h2 className="text-xl font-semibold mb-4">Edit Quote</h2>

          {/* Vehicle Size */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Vehicle Size</label>
            <select
              value={vehicleSize}
              onChange={(e) => setVehicleSize(e.target.value as VehicleType)}
              className="w-full p-2 border rounded"
            >
              <option value="sedan">Sedan</option>
              <option value="suvTruck">SUV/Truck</option>
              <option value="van">Van</option>
            </select>
          </div>

          {/* Services */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Services</label>
            <div className="space-y-2">
              {[...exteriorServices, ...interiorServices, ...packagesData].map((service) => (
                <label key={service.name} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service.name)}
                    onChange={() => handleServiceToggle(service.name)}
                  />
                  <span>{service.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Date</label>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              className="w-full bg-gray-100"
            />
          </div>

          {/* Total */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Total</label>
            <input
              type="number"
              value={total}
              readOnly
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdateQuote}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Quote"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminModifyQuote;
