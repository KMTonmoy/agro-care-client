"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import AIFloatingButton from "@/components/ai/AIFloatingButton";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard") || pathname?.startsWith("/admin");

  return (
    <>
      {!isDashboardRoute && <Navbar />}
      <main className={!isDashboardRoute ? "pt-16 md:pt-20" : ""}>
        <div className={!isDashboardRoute ? "mx-4 md:mx-6 lg:mx-8" : ""}>
          {children}
        </div>
      </main>
      {!isDashboardRoute && <Footer />}
      <AIFloatingButton />
    </>
  );
}