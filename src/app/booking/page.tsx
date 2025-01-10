"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../../lib/supabaseClient";
import { Calendar } from "@/components/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/components/ui/popover";
import { Button } from "@/components/components/ui/button";

import { exteriorServices, interiorServices } from "../../app/data/servicesData";
import { packagesData } from "../../app/data/packagesData";

const discountCombos = [
  { exterior: "Basic Exterior Wash", interior: "Basic Interior Cleaning", discount: 10 },
  { exterior: "Standard Exterior Detail", interior: "Standard Interior Detail", discount: 20 },
  { exterior: "Premium Exterior Detail", interior: "Premium Interior Detail", discount: 25 },
];

const FormSchema = z.object({
  date: z.date({ required_error: "A date is required." }),
});

type VehicleType = "sedan" | "suvTruck" | "van";

type FormValues = z.infer<typeof FormSchema> & {
  vehicleSize: VehicleType;
  selectedServices: string[];
  totalPrice: number;
};

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
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { date: null, vehicleSize, selectedServices, totalPrice: 0 },
  });

  useEffect(() => {
    const serviceParam = searchParams?.get("service");
    if (serviceParam) {
      const allItems = [...exteriorServices, ...interiorServices, ...packagesData];
      const foundItem = allItems.find((i) => i.name === serviceParam.trim());
      if (foundItem) {
        setSelectedServices((prev) =>
          prev.includes(foundItem.name) ? prev : [...prev, foundItem.name]
        );
      }
    }
    setIsLoading(false);
  }, [searchParams]);

  function handleServiceToggle(name: string) {
    setSelectedServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
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

    return sum - comboDiscount < 0 ? 0 : sum - comboDiscount;
  }

  const handleSubmit = async (data: FormValues) => {
    const total = computeTotal();

    const formData = {
      services: selectedServices,
      vehicleSize,
      date: data.date?.toISOString(),
      totalPrice: total,
    };

    try {
      const { error } = await supabase.from("bookings").insert(formData);
      if (error) throw error;

      alert("Booking submitted successfully.");
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("There was an error submitting your booking.");
    }
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
        </div>

        <aside className="w-full lg:w-1/3 bg-white/10 p-6 rounded-lg border border-white/20 h-fit self-start sticky-summary">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full text-left"
                          >
                            {field.value ? field.value.toDateString() : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Submit Booking
              </Button>
            </form>
          </Form>
        </aside>
      </main>
    </div>
  );
}
