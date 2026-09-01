"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  Leaf,
  Headphones,
  Shield,
  Package,
  Users,
  Store,
  BarChart,
  FileText,
  MessageCircle,
  Calendar,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import { UserData } from "@/hooks/useUser";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
  isAdmin: boolean;
  userData: UserData | null;
}

const userLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: ClipboardList },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const adminLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/dashboard/orders", icon: ClipboardList },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Admin Panel", href: "/admin", icon: Shield },
  { name: "Manage Products", href: "/admin/products", icon: Package },
  { name: "Manage Orders", href: "/admin/orders", icon: ClipboardList },
  { name: "Manage Users", href: "/admin/users", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Inventory", href: "/admin/inventory", icon: Store },
  { name: "Messages", href: "/admin/messages", icon: MessageCircle },
  { name: "Calendar", href: "/admin/calendar", icon: Calendar },
];

export const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isAdmin,
  userData,
}: SidebarProps) => {
  const authContext = useContext(AuthContext);
  const firebaseUser = authContext?.user;
  const logOut = authContext?.logOut;
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;
  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = async () => {
    if (logOut) {
      await logOut();
      router.push("/login");
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Get user info from userData or Firebase
  const getUserName = () => {
    if (userData?.name) return userData.name;
    if (firebaseUser?.displayName) return firebaseUser.displayName;
    return "User";
  };

  const getUserEmail = () => {
    if (userData?.email) return userData.email;
    if (firebaseUser?.email) return firebaseUser.email;
    return "No email";
  };

  const getUserPhoto = () => {
    if (userData?.photo) return userData.photo;
    if (firebaseUser?.photoURL) return firebaseUser.photoURL;
    return "/avatar.jpg";
  };

  const getInitial = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 h-full bg-[#111714] border-r border-[rgba(255,255,255,0.06)] z-50",
          "flex flex-col transition-all duration-300",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 px-4 border-b border-[rgba(255,255,255,0.06)]",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1D976C] to-[#93F9B9] flex items-center justify-center shadow-lg shadow-[#1D976C]/30 flex-shrink-0">
              <Leaf className="w-5 h-5 text-[#111714]" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-[#1D976C] via-[#4DCF9A] to-[#93F9B9] bg-clip-text text-transparent">
                  Agro
                </span>
                <span className="bg-gradient-to-r from-[#93F9B9] via-[#4DCF9A] to-[#1D976C] bg-clip-text text-transparent">
                  Care
                </span>
              </span>
            )}
          </Link>
          {!isCollapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.06)] text-[#7D8983] hover:text-[#F1F5F2] transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* User Profile */}
        <div className={cn(
          "p-4 border-b border-[rgba(255,255,255,0.06)]",
          isCollapsed ? "flex justify-center" : ""
        )}>
          <div className={cn(
            "flex items-center gap-3 rounded-xl p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]",
            isCollapsed ? "justify-center" : ""
          )}>
            <Avatar className="h-10 w-10 ring-2 ring-[#1D976C]/30 flex-shrink-0">
              <AvatarImage src={getUserPhoto()} alt={getUserName()} />
              <AvatarFallback className="bg-gradient-to-br from-[#1D976C] to-[#93F9B9] text-[#111714] font-bold">
                {getInitial()}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-[#F1F5F2] truncate">
                  {getUserName()}
                </p>
                <p className="text-xs text-[#7D8983] truncate">
                  {getUserEmail()}
                </p>
                {isAdmin && !isCollapsed && (
                  <span className="text-[10px] font-medium text-[#93F9B9] bg-[#1D976C]/20 px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Admin
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                  isCollapsed ? "justify-center" : "",
                  active
                    ? "bg-gradient-to-r from-[#1D976C]/20 to-[#93F9B9]/10 text-[#F1F5F2] border border-[rgba(255,255,255,0.06)]"
                    : "text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.04)]"
                )}
              >
                <Icon className={cn("w-5 h-5", active ? "text-[#93F9B9]" : "")} />
                {!isCollapsed && <span>{link.name}</span>}
                {!isCollapsed && active && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1 h-6 bg-gradient-to-b from-[#1D976C] to-[#93F9B9] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.06)] space-y-1">
          <Link
            href="/help"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              isCollapsed ? "justify-center" : "",
              "text-[#7D8983] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.04)]"
            )}
          >
            <Headphones className="w-5 h-5" />
            {!isCollapsed && <span>Help & Support</span>}
          </Link>

          <button
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              isCollapsed ? "justify-center" : "",
              "text-[#B85C5C] hover:bg-[#B85C5C]/10"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
};