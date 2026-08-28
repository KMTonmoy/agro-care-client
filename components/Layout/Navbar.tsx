"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  Leaf,
  Package,
  GraduationCap,
  MessageCircle,
  Calendar,
  Home,
  LogOut,
  Settings,
  HelpCircle,
  Shield,
  Truck,
  Award,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: Package },
  { name: "Academy", href: "/academy", icon: GraduationCap },
  { name: "Experts", href: "/experts", icon: MessageCircle },
  { name: "My Farm", href: "/farm", icon: Calendar },
];

const particlePositions = [
  { top: "15.84%", left: "2.72%" },
  { top: "95.21%", left: "62.16%" },
  { top: "47.35%", left: "78.74%" },
  { top: "8.15%", left: "64.69%" },
  { top: "77.33%", left: "60.41%" },
  { top: "95.71%", left: "90.96%" },
  { top: "65.90%", left: "65.30%" },
  { top: "63.80%", left: "72.87%" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const isActive = (href: string) => pathname === href;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
    hidden: {
      y: -120,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial="visible"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarVariants}
        className="fixed top-0 left-0 right-0 w-full z-50"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "mx-4 md:mx-6 lg:mx-8 mt-3 md:mt-4 transition-all duration-700",
            "rounded-2xl md:rounded-3xl overflow-hidden",
            isScrolled || isHovered
              ? "bg-[#111714]/70 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-[rgba(255,255,255,0.06)]"
              : "bg-[#111714]/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.04)]",
          )}
        >
          {/* Steam / Smoke / Water Background Effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#1D976C]/5 via-[#93F9B9]/3 to-transparent rounded-full blur-3xl animate-float" />

            <div
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#93F9B9]/5 via-[#1D976C]/3 to-transparent rounded-full blur-3xl animate-float"
              style={{ animationDelay: "2s" }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_rgba(29,151,108,0.03)_0%,_transparent_70%)] animate-pulse-slow" />

            {particlePositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#93F9B9]/20"
                style={{
                  top: pos.top,
                  left: pos.left,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4 + (i % 4) * 1,
                  repeat: Infinity,
                  delay: (i % 3) * 0.8,
                }}
              />
            ))}
          </div>

          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-[72px] max-w-7xl mx-auto">
              {/* LEFT: LOGO */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href="/" className="flex items-center gap-2.5 group">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-[#1D976C] via-[#2BB584] to-[#93F9B9] flex items-center justify-center shadow-lg shadow-[#1D976C]/40">
                      <Leaf className="w-5 h-5 md:w-6 md:h-6 text-white" />

                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-br from-[#1D976C] to-[#93F9B9] rounded-2xl opacity-20 blur-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>

                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#93F9B9] rounded-full border-2 border-[#111714] animate-pulse" />
                  </motion.div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-lg md:text-2xl font-extrabold tracking-tight">
                      <span className="bg-gradient-to-r from-[#1D976C] via-[#4DCF9A] to-[#93F9B9] bg-clip-text text-transparent">
                        Agro
                      </span>

                      <span className="bg-gradient-to-r from-[#93F9B9] via-[#4DCF9A] to-[#1D976C] bg-clip-text text-transparent">
                        Care
                      </span>
                    </span>

                    <span className="text-[8px] md:text-[10px] font-medium text-[#93F9B9]/50 tracking-[0.2em] uppercase hidden sm:block">
                      Smart Farming
                    </span>
                  </div>
                </Link>
              </div>

              {/* CENTER: NAVIGATION LINKS */}
              <nav className="hidden lg:flex items-center justify-center gap-0.5 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                        active
                          ? "text-white bg-gradient-to-r from-[#1D976C]/30 to-[#93F9B9]/20 border border-[rgba(255,255,255,0.08)] shadow-lg shadow-[#1D976C]/10"
                          : "text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.04)]",
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {link.name}
                      </span>

                      {active && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#1D976C] to-[#93F9B9] rounded-full"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* RIGHT: ACTIONS */}
              <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                {/* SEARCH */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300 w-9 h-9 md:w-10 md:h-10"
                  >
                    <Search className="w-5 h-5" />
                    <span className="sr-only">Search</span>
                  </Button>
                </motion.div>

                {/* CART */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-xl hover:bg-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] transition-all duration-300 w-9 h-9 md:w-10 md:h-10"
                  >
                    <ShoppingCart className="w-5 h-5" />

                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-[#1D976C]/40 ring-2 ring-[#111714]">
                      3
                    </span>

                    <span className="sr-only">Cart</span>
                  </Button>
                </motion.div>

                {/* PROFILE DROPDOWN */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="cursor-pointer rounded-xl hover:bg-[rgba(255,255,255,0.06)] p-0.5 transition-all duration-300 outline-none">
                    <Avatar className="h-9 w-9 md:h-10 md:w-10 ring-2 ring-[#1D976C]/30 hover:ring-[#1D976C]/60 transition-all duration-300">
                      <AvatarImage src="/avatar.jpg" alt="User" />

                      <AvatarFallback className="bg-gradient-to-br from-[#1D976C] to-[#93F9B9] text-[#111714] font-bold text-sm">
                        FA
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-64 p-2 rounded-2xl border border-[rgba(255,255,255,0.06)] shadow-2xl shadow-black/50 bg-[#111714]/95 backdrop-blur-2xl"
                  >
                    {/* PROFILE HEADER
                        IMPORTANT:
                        DropdownMenuLabel removed because Base UI
                        requires Menu.Group context.
                    */}
                    <div className="font-medium text-[#F1F5F2] px-3 py-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 ring-2 ring-[#1D976C]/30">
                          <AvatarFallback className="bg-gradient-to-br from-[#1D976C] to-[#93F9B9] text-[#111714] font-bold">
                            FA
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="font-semibold text-sm">Farmer Ahmed</p>

                          <p className="text-xs text-[#7D8983]">
                            Premium Member
                          </p>
                        </div>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />

                    {/* PROFILE */}
                    <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200">
                      <User className="mr-2 h-4 w-4 text-[#1D976C]" />
                      <span>Profile</span>
                    </DropdownMenuItem>

                    {/* MY ORDERS */}
                    <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200">
                      <Package className="mr-2 h-4 w-4 text-[#1D976C]" />
                      <span>My Orders</span>
                    </DropdownMenuItem>

                    {/* MY FARM */}
                    <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200">
                      <Leaf className="mr-2 h-4 w-4 text-[#1D976C]" />
                      <span>My Farm</span>
                    </DropdownMenuItem>

                    {/* SETTINGS */}
                    <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200">
                      <Settings className="mr-2 h-4 w-4 text-[#1D976C]" />
                      <span>Settings</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.06)]" />

                    {/* LOGOUT */}
                    <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-[#B85C5C] hover:bg-[#B85C5C]/10 transition-all duration-200">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* MOBILE MENU */}
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger className="lg:hidden cursor-pointer rounded-xl hover:bg-[rgba(255,255,255,0.06)] p-2 transition-all duration-300 outline-none">
                    <Menu className="w-6 h-6 text-[#A9B5AF] hover:text-[#F1F5F2]" />
                    <span className="sr-only">Open menu</span>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-[320px] sm:w-[400px] p-0 bg-[#111714] border-l border-[rgba(255,255,255,0.06)]"
                  >
                    <div className="flex flex-col h-full relative overflow-hidden">
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-[#1D976C]/10 via-[#93F9B9]/5 to-transparent rounded-full blur-3xl" />
                      </div>

                      {/* MOBILE HEADER */}
                      <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.06)] bg-gradient-to-r from-[#1D976C]/5 to-[#93F9B9]/5 relative z-10">
                        <Link
                          href="/"
                          className="flex items-center gap-2.5"
                          onClick={closeMobileMenu}
                        >
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1D976C] to-[#93F9B9] flex items-center justify-center shadow-lg shadow-[#1D976C]/30">
                            <Leaf className="w-5 h-5 text-[#111714]" />
                          </div>

                          <span className="text-xl font-extrabold tracking-tight">
                            <span className="bg-gradient-to-r from-[#1D976C] via-[#4DCF9A] to-[#93F9B9] bg-clip-text text-transparent">
                              Agro
                            </span>

                            <span className="bg-gradient-to-r from-[#93F9B9] via-[#4DCF9A] to-[#1D976C] bg-clip-text text-transparent">
                              Care
                            </span>
                          </span>
                        </Link>

                        <button
                          type="button"
                          onClick={closeMobileMenu}
                          className="rounded-xl hover:bg-[rgba(255,255,255,0.06)] p-2 transition-all duration-300 text-[#A9B5AF]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* MOBILE NAVIGATION */}
                      <nav className="flex-1 p-4 space-y-1 overflow-y-auto relative z-10">
                        {navLinks.map((link) => {
                          const Icon = link.icon;
                          const active = isActive(link.href);

                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={closeMobileMenu}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300",
                                active
                                  ? "bg-gradient-to-r from-[#1D976C]/20 to-[#93F9B9]/10 text-[#F1F5F2] border border-[rgba(255,255,255,0.06)] shadow-inner"
                                  : "text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.04)]",
                              )}
                            >
                              <Icon className="w-5 h-5" />
                              {link.name}
                            </Link>
                          );
                        })}

                        <div className="my-4 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent" />

                        <div className="space-y-1">
                          <Link
                            href="/help"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#7D8983] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                          >
                            <HelpCircle className="w-5 h-5" />
                            Help & Support
                          </Link>

                          <Link
                            href="/about"
                            onClick={closeMobileMenu}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[#7D8983] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300"
                          >
                            <Shield className="w-5 h-5" />
                            About AgroCare
                          </Link>
                        </div>
                      </nav>

                      {/* MOBILE FOOTER */}
                      <div className="p-6 border-t border-[rgba(255,255,255,0.06)] bg-gradient-to-r from-[#1D976C]/5 to-[#93F9B9]/5 space-y-3 relative z-10">
                        <Button className="w-full bg-gradient-to-r from-[#1D976C] to-[#93F9B9] hover:from-[#167A56] hover:to-[#1D976C] text-[#111714] font-semibold rounded-xl shadow-lg shadow-[#1D976C]/30 transition-all duration-300 h-12">
                          <User className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full border border-[#1D976C]/30 text-[#A9B5AF] hover:bg-[#1D976C] hover:text-[#111714] font-medium rounded-xl transition-all duration-300 h-12"
                        >
                          Create Account
                        </Button>

                        <div className="flex items-center justify-center gap-3 pt-2">
                          <div className="flex items-center gap-1.5 text-xs text-[#7D8983]">
                            <Truck className="w-3.5 h-3.5 text-[#1D976C]" />
                            Free Delivery
                          </div>

                          <div className="w-px h-4 bg-[rgba(255,255,255,0.06)]" />

                          <div className="flex items-center gap-1.5 text-xs text-[#7D8983]">
                            <Award className="w-3.5 h-3.5 text-[#1D976C]" />
                            100% Organic
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
};
