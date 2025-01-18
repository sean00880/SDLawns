"use client";

import React from "react";
import { useParams } from "next/navigation";
import { lawncareContent } from "../../../data/content/lawncareContent"; // Import content files
import { dumpRunContent } from "../../../data/content/dumpRunContent";
import { pressureWashingContent } from "../../../data/content/pressureWashingContent";
import { gardeningContent } from "../../../data/content/gardeningContent";

const allContent = {
  ...lawncareContent,
  ...dumpRunContent,
  ...pressureWashingContent,
  ...gardeningContent,
};

// Define the type of allContent keys
type ServiceKey = keyof typeof allContent;

export default function ServiceDetailPage() {
  const params = useParams();
  const id = params?.id as ServiceKey | undefined; // Assert id is a valid key or undefined

  // Find content based on ID
  const content = id ? allContent[id] : null;

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Service Not Found</h1>
        <p className="text-lg text-gray-700">
          We couldn't find the service you were looking for. Please explore our other landscaping
          solutions or contact us for assistance.
        </p>
      </div>
    );
  }

  // Content sections
  const sections = content.trim().split("##").filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold capitalize">{id?.replace(/-/g, " ")}</h1>
          <p className="mt-4 text-lg font-light">
            Explore the details of our premium landscaping services and how they can elevate your
            outdoor spaces.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-12 px-6">
        {sections.map((section, index) => (
          <div key={index} className={`mb-16 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} p-6 rounded-lg shadow-md`}>
            <h2 className="text-3xl font-semibold text-green-700 mb-4">
              {section.split("\n")[0].trim()}
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {section.split("\n").slice(1).join("\n").trim()}
            </p>
          </div>
        ))}

        <div className="bg-white p-8 rounded-lg shadow-md mt-16">
          <h2 className="text-4xl font-bold text-green-600 mb-4">Get Started Today</h2>
          <p className="text-lg text-gray-700 mb-6">
            Ready to transform your outdoor space? Contact us now to schedule your service or book
            online to experience the difference we bring to landscaping in San Diego.
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all"
            >
              Contact Us
            </a>
            <a
              href="/booking"
              className="bg-gray-100 text-green-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-gray-200 border border-green-600 transition-all"
            >
              Book Online
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-green-600 text-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} San Diego Landscaping. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
