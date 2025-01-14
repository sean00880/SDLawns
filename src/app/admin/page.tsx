"use client";

import React, { useEffect, useState } from "react";
import AdminModifyQuote from "@/components/components/AdminDashboard";
import { supabase } from "@/components/lib/supaBaseClient";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Check session from Supabase
      const { data: session } = await supabase.auth.getSession();

      if (session?.session) {
        setIsAuthenticated(true);
      } else {
        // Redirect to the sign-in page if not authenticated
        router.push("/admin/signin");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Prevent rendering anything if not authenticated
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="text-white p-4">
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
