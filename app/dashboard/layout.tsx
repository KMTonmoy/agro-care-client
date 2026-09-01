"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useUser } from "@/hooks/useUser";
import { Loader2, Menu, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Get user data from hook
  const { userData, loading, refetch } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is admin from userData
  const isAdmin = userData?.role === "admin";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0F0D] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#1D976C] animate-spin" />
          <p className="text-[#A9B5AF]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F0D]">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isAdmin={isAdmin}
        userData={userData}
      />

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        )}
      >
        {/* Top Header */}
        <header
          className={cn(
            "sticky top-0 z-30 bg-[#111714]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] transition-all duration-300",
            isScrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : ""
          )}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-[#F1F5F2]">
                  {isAdmin ? "Admin Dashboard" : "Dashboard"}
                </h1>
                {isAdmin && (
                  <span className="text-xs text-[#93F9B9] bg-[#1D976C]/20 px-2 py-0.5 rounded-full">
                    Admin Access
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#1D976C] rounded-full ring-2 ring-[#111714]" />
              </button>
              <button
                onClick={refetch}
                className="p-2 rounded-xl hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300"
                title="Refresh user data"
              >
                <Loader2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;