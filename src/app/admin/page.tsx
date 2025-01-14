"use client";

import React from "react";
import AdminModifyQuote from "@/components/components/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="min-h-screen ">
      <header className=" text-white p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm">Manage and modify quote requests</p>
      </header>

      <main className="p-6">
        {/* Call the AdminModifyQuote component */}
        <AdminModifyQuote />
      </main>
    </div>
  );
}
