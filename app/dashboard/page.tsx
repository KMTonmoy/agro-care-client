"use client";

import { useUser } from "@/hooks/useUser";
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { userData, loading } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-[#1D976C] animate-spin" />
      </div>
    );
  }

  // Check role directly from userData
  const isAdmin = userData?.role === "admin";

  // Log user data for debugging
  console.log("User Data:", userData);
  console.log("User ID:", userData?.id);
  console.log("User Name:", userData?.name);
  console.log("User Email:", userData?.email);
  console.log("User Role:", userData?.role);
  console.log("Is Admin:", isAdmin);

  return isAdmin ? <AdminDashboard /> : <UserDashboard />;
}