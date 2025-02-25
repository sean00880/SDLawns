"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  lawncareServices,
  pressureWashingServices,
  dumpRunServices,
  gardeningServices, // Add this line
} from "../data/servicesData";
import { Calendar, Radio, RadioGroup, Button, ButtonGroup, cn } from "@nextui-org/react";
import { today, getLocalTimeZone, isWeekend, startOfWeek, startOfMonth } from "@internationalized/date";
import { supabase } from "@/components/lib/supaBaseClient";
import { useLocale } from "@react-aria/i18n";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY); // Set RESEND_API_KEY in your .env.local file


// Type for Frequency
type Frequency = "weekly" | "bi-weekly" | "monthly" | "one-time";

// Type for Category
type Category = "lawncare" | "pressureWashing" | "gardening" | "dumpRuns";

type Service = {
  id: string;
  name: string;
  price: number; // Default price based on the selected frequency
  pricing: { weekly: number; "bi-weekly": number; monthly: number; "one-time": number };
  img: string;
  description: string[];
};

type Package = {
  id: string;
  name: string;
  price: number;
  pricing: { weekly: number; "bi-weekly": number; monthly: number; "one-time": number };
  img: string;
  servicesIncluded: string[];
};



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
  const [lawncareServicesState, setLawncareServices] = useState<Service[]>(
    lawncareServices.services
  );
  const [pressureWashingServicesState, setPressureWashingServices] = useState<Service[]>(
    pressureWashingServices.services
  );
  const [dumpRunServicesState, setDumpRunServices] = useState<Service[]>(
    dumpRunServices.services
  );
  const [gardeningServicesState, setGardeningServices] = useState<Service[]>(
    gardeningServices.services
  );

  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const categories: Record<Category, { services: Service[]; packages: Package[] }> = {
    lawncare: lawncareServices,
    pressureWashing: pressureWashingServices,
    dumpRuns: dumpRunServices,
    gardening: gardeningServices,
  };
  

  const [activeCategory, setActiveCategory] = useState<Category>("lawncare");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<Frequency>("weekly");
  const searchParams = useSearchParams();
  const { locale } = useLocale(); // Correctly use the locale from the hook
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const defaultDate = today(getLocalTimeZone()); // Set the initial value for the calendar
  const [value, setValue] = useState(defaultDate); // State for calendar value
  
    let now = today(getLocalTimeZone());
    let nextWeek = startOfWeek(now.add({weeks: 1}), locale);
    let nextMonth = startOfMonth(now.add({months: 1}));


    function generateSlug(name: string, frequency: Frequency): string {
      return `${name.toLowerCase().replace(/\s+/g, "-")}-${frequency}`;
    }
    
    
  

  // On mount, read ?service= from the URL and pre-select if found
  useEffect(() => {
    const servicesParam = searchParams?.get("services");
    const packagesParam = searchParams?.get("packages");
    const frequencyParam = searchParams?.get("frequency");
  
    if (servicesParam) {
      try {
        const services = JSON.parse(servicesParam) as string[];
        setSelectedServices(services);
      } catch {
        console.error("Invalid services parameter");
      }
    }
  
    if (packagesParam) {
      try {
        const packages = JSON.parse(packagesParam) as string[];
        setSelectedPackages(packages);
  
        // Add services included in the selected packages
        const includedServices = packages.flatMap((pkgName) =>
          Object.values(categories)
            .flatMap((category) => category.packages)
            .find((pkg) => pkg.name === pkgName)?.servicesIncluded || []
        );
        setSelectedServices((prev) => [...new Set([...prev, ...includedServices])]);
      } catch {
        console.error("Invalid packages parameter");
      }
    }
  
    if (frequencyParam && ["weekly", "bi-weekly", "monthly", "one-time"].includes(frequencyParam)) {
      setSelectedFrequency(frequencyParam as Frequency);
    }
  }, [searchParams]);
  
  
  

  function handleServiceToggle(serviceId: string) {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId) // Remove if already selected
        : [...prev, serviceId] // Add if not selected
    );
  }
  
  

  function handlePackageToggle(packageName: string) {
    const selectedPackage = categories[activeCategory].packages.find((pkg) => pkg.name === packageName);
  
    if (!selectedPackage) return;
  
    const associatedServices = selectedPackage.servicesIncluded;
  
    if (selectedPackages.includes(packageName)) {
      setSelectedPackages((prev) => prev.filter((pkg) => pkg !== packageName));
      setSelectedServices((prev) => prev.filter((srv) => !associatedServices.includes(srv)));
    } else {
      setSelectedPackages((prev) => [...prev, packageName]);
      setSelectedServices((prev) => [...new Set([...prev, ...associatedServices])]);
    }
  }
  
  
  
  

  function handleFrequencyChange(newFrequency: Frequency) {
    setSelectedFrequency(newFrequency);
  
    setLawncareServices((prev) =>
      prev.map((service) => ({
        ...service,
        price: service.pricing[newFrequency],
      }))
    );
  
    setPressureWashingServices((prev) =>
      prev.map((service) => ({
        ...service,
        price: service.pricing[newFrequency],
      }))
    );
  
    setDumpRunServices((prev) =>
      prev.map((service) => ({
        ...service,
        price: service.pricing[newFrequency],
      }))
    );
  
    setGardeningServices((prev) =>
      prev.map((service) => ({
        ...service,
        price: service.pricing[newFrequency],
      }))
    );
  }
  
  
  
  
  

  function handleCategoryChange(newCategory: Category) {
    setActiveCategory(newCategory);
  
    // Do not reset `selectedServices` or `selectedPackages`
    // These are maintained globally across categories
  }
  
  
  function isServiceIncludedInAnyPackage(serviceName: string): boolean {
    return selectedPackages.some((pkgName) =>
      Object.values(categories).some((category) =>
        category.packages
          .find((pkg) => pkg.name === pkgName)
          ?.servicesIncluded.includes(serviceName)
      )
    );
  }

  function computeTotal(): number {
    let total = 0;
  
    // Calculate total for selected packages
    selectedPackages.forEach((packageName) => {
      const pkg = Object.values(categories)
        .flatMap((category) => category.packages)
        .find((pkg) => pkg.name === packageName);
  
      if (pkg) {
        total += pkg.pricing[selectedFrequency];
      }
    });
  
    // Calculate total for selected services not included in packages
    selectedServices.forEach((serviceId) => {
      if (!isServiceIncludedInAnyPackage(serviceId)) {
        const service = Object.values(categories)
          .flatMap((category) => category.services)
          .find((srv) => srv.id === serviceId);
  
        if (service) {
          total += service.pricing[selectedFrequency];
        }
      }
    });
  
    return total;
  }
  
  
  
  

  
  
  const handleSubmit = async () => {
    // Validate form inputs
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("All fields are required. Please fill out your name, email, and phone.");
      return;
    }
  
    // Prepare the data to be submitted
    const data = {
      category: activeCategory,
      frequency: selectedFrequency,
      services: JSON.stringify(selectedServices),
      packages: JSON.stringify(selectedPackages),
      total: computeTotal(),
      selected_date: value.toString(), // Calendar date
      client_name: name,
      client_email: email,
      client_phone: phone,
    };
  
    try {
      // Submit data to Supabase
      const { error } = await supabase.from("quote_requests").insert([data]);
      if (error) {
        console.error("Error submitting quote request to Supabase:", error);
        alert("An error occurred while submitting your quote. Please try again.");
        return;
      }
  
      // Notify admin via email
      const adminResponse = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "service@sitedominion.com", // Replace with the admin's email
          subject: "New Quote Request Submitted",
          firstName: "Admin",
          details: data,
        }),
      });
  
      if (!adminResponse.ok) {
        const adminErrorData = await adminResponse.json();
        console.error("Error sending admin email:", adminErrorData);
        alert("An error occurred while sending the admin notification email.");
        return;
      }
  
      // Notify client via email
      const clientResponse = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Your Quote Request Confirmation",
          firstName: name,
          details: data,
        }),
      });
  
      if (!clientResponse.ok) {
        const clientErrorData = await clientResponse.json();
        console.error("Error sending client email:", clientErrorData);
        alert("An error occurred while sending your confirmation email.");
        return;
      }
  
      // Success: Notify the user and reset form
      alert("Quote request submitted successfully! A confirmation email has been sent.");
      setSelectedServices([]);
      setSelectedPackages([]);
      setSelectedFrequency("weekly");
      setActiveCategory("lawncare");
      setValue(today(getLocalTimeZone()));
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      alert("An unexpected error occurred while submitting your quote. Please try again.");
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
    <div className="min-h-screen bg-white text-black flex flex-col">
    <header className="p-6 border-b border-gray-300">
      <h1 className="text-3xl font-bold">Booking Page</h1>
      <p className="text-gray-600 mt-2">
        Select your category, frequency, and services to build your custom landscaping plan.
      </p>
    </header>
  
    <main className="flex-grow flex flex-col lg:flex-row p-6 gap-6">
      {/* LEFT: FORM */}
      <div className="w-full lg:w-2/3 space-y-8">
        {/* 1) Category Tabs */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Select a Category:</h2>
          <div className="flex space-x-4">
          {(["lawncare", "pressureWashing", "gardening", "dumpRuns"] as Category[]).map((category) => (
  <button
    key={category}
    className={`px-4 py-2 rounded-lg ${
      activeCategory === category
        ? "bg-green-600 text-white"
        : "bg-white text-gray-800 hover:bg-gray-300"
    }`}
    onClick={() => handleCategoryChange(category)}
  >
    {category === "lawncare"
      ? "Lawn Care"
      : category === "pressureWashing"
      ? "Pressure Washing"
       : category === "gardening"
      ? "Gardening"
      : "Dump Runs"}
  </button>
))}
          </div>
        </section>
  
        {/* 2) Frequency Selection */}
        <section>
  <h2 className="text-xl font-semibold mb-2">Select Frequency:</h2>
  <div className="flex space-x-4">
    {["weekly", "bi-weekly", "monthly", "one-time"].map((frequency) => (
      <button
        key={frequency}
        className={`px-4 py-2 rounded-lg ${
          selectedFrequency === frequency
            ? "bg-green-600 text-white"
            : "bg-white text-gray-800 hover:bg-gray-300"
        }`}
        onClick={() => handleFrequencyChange(frequency as Frequency)}
      >
        {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
      </button>
    ))}
  </div>
</section>

  
 
       {/* 3) Services List */}
       <section>
  <h2 className="text-xl font-semibold mb-2">Available Packages:</h2>
  <div className="space-y-2">
    {categories[activeCategory].packages.map((pkg) => {
      const isChecked = selectedPackages.includes(pkg.name);

      return (
        <label key={pkg.name} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handlePackageToggle(pkg.name)}
          />
          <span>
            {pkg.name} (Discounted Price:{" "}
            <span className="text-green-600">${pkg.pricing[selectedFrequency]}</span>)
          </span>
        </label>
      );
    })}
  </div>

  <h2 className="text-xl font-semibold mt-4 mb-2">Available Services:</h2>
  <div className="space-y-2">
    {categories[activeCategory].services.map((srv) => {
      // Check if the service is included in any selected package
      const isIncludedInAnyPackage = selectedPackages.some((pkgName) =>
        categories[activeCategory].packages
          .find((pkg) => pkg.name === pkgName)
          ?.servicesIncluded.includes(srv.id) // Compare service ID instead of name
      );

      return (
        <label
          key={srv.id}
          className={`flex items-center space-x-2 cursor-pointer ${
            isIncludedInAnyPackage ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={selectedServices.includes(srv.id)}
            disabled={isIncludedInAnyPackage} // Disable if the service is part of a selected package
            onChange={() => handleServiceToggle(srv.id)}
          />
          <span>
            {srv.name}:{" "}
            <span
              className={`text-green-600 ${
                isIncludedInAnyPackage ? "italic" : ""
              }`}
            >
              {isIncludedInAnyPackage ? "Included" : `$${srv.pricing[selectedFrequency]}`}
            </span>
          </span>
        </label>
      );
    })}
  </div>
</section>




  
        {/* 4) Contact Information */}
        <section>
          <h2 className="text-xl font-semibold">Contact Information:</h2>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone Number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded bg-white text-black"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </section>
      </div>
  
      {/* RIGHT: SUMMARY */}
      <aside className="w-full lg:w-1/3 bg-white p-6 rounded-lg border border-gray-300 h-fit self-start sticky-summary">
  <h2 className="text-xl font-semibold mb-4">SUMMARY</h2>

  {/* Selected Frequency */}
  <p className="text-gray-600 mb-4">
    Frequency: <strong>{selectedFrequency.charAt(0).toUpperCase() + selectedFrequency.slice(1)}</strong>
  </p>

  {/* Selected Packages */}
  <div className="mb-4">
    <h3 className="text-lg font-semibold">Selected Packages:</h3>
 <div className="mb-4">
  <h3 className="text-lg font-semibold">Selected Packages:</h3>
  {selectedPackages.map((packageName) => {
    const pkg = Object.values(categories)
      .flatMap((category) => category.packages)
      .find((pkg) => pkg.name === packageName);

    return (
      pkg && (
        <div key={packageName}>
          <div className="flex justify-between">
            <span>{pkg.name}</span>
            <span className="text-green-600">${pkg.pricing[selectedFrequency]}</span>
          </div>
          <ul className="pl-4 text-sm text-gray-600">
            {pkg.servicesIncluded.map((serviceId) => {
              const service = Object.values(categories)
                .flatMap((category) => category.services)
                .find((srv) => srv.id === serviceId);
              return service && <li key={serviceId}>{service.name}</li>;
            })}
          </ul>
        </div>
      )
    );
  })}
</div>

    {selectedPackages.length === 0 && <p className="text-gray-500">No packages selected.</p>}
  </div>

  {/* Selected Services */}
  <div className="mb-4">
    <h3 className="text-lg font-semibold">Selected Services:</h3>
    {selectedServices
      .filter((serviceName) => !isServiceIncludedInAnyPackage(serviceName))
      .map((serviceId) => {
        const service = Object.values(categories)
          .flatMap((category) => category.services)
          .find((srv) => srv.id === serviceId);

        return (
          service && (
            <div key={serviceId} className="flex justify-between">
              <span>{service.name}</span>
              <span className="text-green-600">${service.pricing[selectedFrequency]}</span>
            </div>
          )
        );
      })}
    {selectedServices.length === 0 && <p className="text-gray-500">No services selected.</p>}
  </div>

  {/* Total */}
  <div className="flex justify-between border-t text-gray-800 border-gray-300 pt-2 text-lg font-bold">
    <span>Total:</span>
    <span>${computeTotal()}</span>
  </div>

  {/* Submit Button */}
  <button
    className="w-full bg-green-600 hover:bg-green-700 py-2 px-4 rounded mt-4 text-white"
    onClick={handleSubmit}
  >
    Submit Quote
  </button>
</aside>



    </main>
  </div>
  
  );
}
