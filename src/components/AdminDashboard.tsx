"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/components/lib/supaBaseClient";
import { exteriorServices, interiorServices } from "../app/data/servicesData";
import { packagesData } from "../app/data/packagesData";
import {
  Button,
} from "@/components/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/components/ui/tooltip";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/components/ui/dialog";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone, startOfWeek, startOfMonth } from "@internationalized/date";

type VehicleType = "sedan" | "suvTruck" | "van";

const AdminModifyQuote = () => {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [vehicleSize, setVehicleSize] = useState<VehicleType>("sedan");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(today(getLocalTimeZone()));
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [calendarValue, setCalendarValue] = useState(today(getLocalTimeZone()));

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

  const handleEdit = (quote: any) => {
    setSelectedQuote(quote);
    setVehicleSize(quote.vehicle_size);
    setSelectedServices(quote.services || []);
    setSelectedDate(today(getLocalTimeZone()));
    setCalendarValue(today(getLocalTimeZone()));
    setTotal(quote.total);
    setIsEditing(true);
  };

  const handleDelete = async (quoteId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this quote?");
    if (confirmDelete) {
      const { error } = await supabase.from("quote_requests").delete().eq("id", quoteId);
      if (error) {
        console.error("Error deleting quote:", error);
        alert("Failed to delete quote.");
      } else {
        setQuotes((prev) => prev.filter((quote) => quote.id !== quoteId));
        alert("Quote deleted successfully.");
      }
    }
  };

  const handleUpdateQuote = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("quote_requests")
      .update({
        vehicle_size: vehicleSize,
        services: selectedServices,
        date: calendarValue.toString(),
        total,
      })
      .eq("id", selectedQuote.id);

    setLoading(false);

    if (error) {
      console.error("Error updating quote:", error);
      alert("An error occurred while updating the quote.");
    } else {
      setQuotes((prev) =>
        prev.map((quote) =>
          quote.id === selectedQuote.id
            ? { ...quote, vehicle_size: vehicleSize, services: selectedServices, date: calendarValue.toString(), total }
            : quote
        )
      );
      alert("Quote updated successfully!");
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Admin: Modify Quotes</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Quotes</h2>
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 bg-white text-black shadow rounded flex justify-between items-center"
            >
              <div>
                <p><strong>ID:</strong> {quote.id}</p>
                <p><strong>Vehicle Size:</strong> {quote.vehicle_size}</p>
                <p><strong>Total:</strong> ${quote.total}</p>
                <p><strong>Services:</strong> {JSON.parse(quote.services).join(", ")}</p>
                <p><strong>Date:</strong> {quote.date}</p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="text-lg font-semibold">•••</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleEdit(quote)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(quote.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-black">
          <DialogHeader>
            <DialogTitle>Edit Quote</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <div>
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
            <div>
              <label className="block font-medium mb-2">Services</label>
              <div className="space-y-2">
                {[...exteriorServices, ...interiorServices, ...packagesData].map((service) => (
                  <label key={service.name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.name)}
                      onChange={() =>
                        setSelectedServices((prev) =>
                          prev.includes(service.name)
                            ? prev.filter((s) => s !== service.name)
                            : [...prev, service.name]
                        )
                      }
                    />
                    <span>{service.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-2">Date</label>
              <Calendar
                value={calendarValue}
                onChange={setCalendarValue}
                className="bg-black flex justify-center items-center"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Total</label>
              <input
                type="number"
                value={total}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleUpdateQuote}
              disabled={loading}
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-gray-700"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminModifyQuote;
