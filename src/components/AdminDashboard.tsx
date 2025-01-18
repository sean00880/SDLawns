"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/components/lib/supaBaseClient";
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices,
} from "../app/data/servicesData";
import { Button } from "@/components/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/components/ui/dialog";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";

type Frequency = "weekly" | "bi-weekly" | "monthly" | "one-time";
type Category = "lawncare" | "pressureWashing" | "gardening" | "dumpRuns";
type Service = {
  id: string;
  name: string;
  price: number;
  pricing: {
    weekly: number;
    "bi-weekly": number;
    monthly: number;
    "one-time": number;
  };
  img?: string;
  description?: string[];
};

const AdminDashboard = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>("weekly");
  const [selectedCategory, setSelectedCategory] = useState<Category>("lawncare");
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const [total, setTotal] = useState<number>(0);
  const [isEditing, setIsEditing] = useState(false);

  const categories: Record<Category, Service[]> = {
    lawncare: lawncareServices.services,
    pressureWashing: pressureWashingServices.services,
    dumpRuns: dumpRunServices.services,
    gardening: gardeningServices.services,
  };

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

  const getReadableCategory = (category: string) => {
    switch (category) {
      case "lawncare":
        return "Lawn Care";
      case "pressureWashing":
        return "Pressure Washing";
      case "gardening":
        return "Gardening";
      case "dumpRuns":
        return "Dump Runs";
      default:
        return category;
    }
  };

  const getReadableServices = (services: string, category: string) => {
    const serviceIds = JSON.parse(services);
    const serviceList = categories[category as Category];
    return serviceIds
      .map((serviceId: string) => {
        const service = serviceList.find((s) => s.id === serviceId);
        return service ? service.name : serviceId;
      })
      .join(", ");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this quote?")) {
      const { error } = await supabase.from("quote_requests").delete().eq("id", id);

      if (error) {
        console.error("Error deleting quote:", error);
        alert("Failed to delete the quote.");
      } else {
        setQuotes((prev) => prev.filter((q) => q.id !== id));
        alert("Quote deleted successfully.");
      }
    }
  };

  const handleEdit = (quote: any) => {
    setSelectedQuote(quote);
    setSelectedServices(JSON.parse(quote.services));
    setSelectedFrequency(quote.frequency);
    setSelectedCategory(quote.category);
    setSelectedDate(today(getLocalTimeZone())); // Update this if date is stored differently
    setTotal(quote.total);
    setIsEditing(true);
  };

  const computeTotal = () => {
    const servicesInCategory = categories[selectedCategory];
    const newTotal = selectedServices.reduce((acc, serviceId) => {
      const service = servicesInCategory.find((srv) => srv.id === serviceId);
      return acc + (service?.pricing[selectedFrequency] || 0);
    }, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    computeTotal();
  }, [selectedServices, selectedFrequency, selectedCategory]);

  const handleUpdateQuote = async () => {
    const updatedData = {
      category: selectedCategory,
      frequency: selectedFrequency,
      services: JSON.stringify(selectedServices),
      total,
      selected_date: selectedDate.toString(),
    };

    const { error } = await supabase
      .from("quote_requests")
      .update(updatedData)
      .eq("id", selectedQuote.id);

    if (error) {
      console.error("Error updating quote:", error);
      alert("An error occurred while updating the quote.");
    } else {
      setQuotes((prev) =>
        prev.map((quote) =>
          quote.id === selectedQuote.id
            ? { ...quote, ...updatedData }
            : quote
        )
      );
      setIsEditing(false);
      alert("Quote updated successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">Manage and modify quote requests</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Quotes</h2>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 bg-gray-200 shadow-lg rounded-lg flex justify-between items-start relative"
              style={{
                boxShadow: "8px 8px 15px #bdbdbd, -8px -8px 15px #ffffff",
              }}
            >
              <div>
                <p><strong>ID:</strong> {quote.id}</p>
                <p><strong>Category:</strong> {getReadableCategory(quote.category)}</p>
                <p><strong>Frequency:</strong> {quote.frequency}</p>
                <p>
                  <strong>Services:</strong> {getReadableServices(quote.services, quote.category)}
                </p>
                <p><strong>Date:</strong> {quote.selected_date || "Not specified"}</p>
              </div>
              <div className="absolute top-4 right-4 text-green-700 text-lg italic">
                <strong>Total:</strong> ${quote.total}
              </div>
              <div className="flex flex-col space-y-2 mt-10">
                <Button
                  onClick={() => handleEdit(quote)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  style={{
                    boxShadow: "inset 4px 4px 8px #bdbdbd, inset -4px -4px 8px #ffffff",
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(quote.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  style={{
                    boxShadow: "inset 4px 4px 8px #bdbdbd, inset -4px -4px 8px #ffffff",
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-gray-200 text-gray-800">
          <DialogHeader>
            <DialogTitle>Edit Quote</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="w-full p-2 border rounded bg-gray-300"
              >
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {getReadableCategory(category)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Frequency</label>
              <select
                value={selectedFrequency}
                onChange={(e) => setSelectedFrequency(e.target.value as Frequency)}
                className="w-full p-2 border rounded bg-gray-300"
              >
                {["weekly", "bi-weekly", "monthly", "one-time"].map((freq) => (
                  <option key={freq} value={freq}>
                    {freq}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Services</label>
              <div className="space-y-2">
                {categories[selectedCategory].map((service) => (
                  <label key={service.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() =>
                        setSelectedServices((prev) =>
                          prev.includes(service.id)
                            ? prev.filter((id) => id !== service.id)
                            : [...prev, service.id]
                        )
                      }
                    />
                    <span>{service.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label>Date</label>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                aria-label="Edit Quote Date"
                className="bg-gray-300 text-gray-800"
              />
            </div>
            <div>
              <label>Total</label>
              <input
                type="number"
                value={total}
                onChange={(e) => setTotal(Number(e.target.value))}
                className="w-full p-2 border rounded bg-gray-300 text-green-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleUpdateQuote}
              className="bg-green-600 text-white py-2 px-4 rounded-lg"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
