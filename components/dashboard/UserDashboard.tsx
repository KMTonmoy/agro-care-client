"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Package,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { StatsCard } from "./StatsCard";
import { RecentOrders } from "./RecentOrders";

const stats = [
  {
    title: "Total Orders",
    value: "24",
    icon: ShoppingBag,
    change: "+12%",
    color: "from-[#1D976C] to-[#93F9B9]",
  },
  {
    title: "Products",
    value: "156",
    icon: Package,
    change: "+8%",
    color: "from-[#4DCF9A] to-[#2BB584]",
  },
  {
    title: "Revenue",
    value: "$12,430",
    icon: TrendingUp,
    change: "+23%",
    color: "from-[#93F9B9] to-[#1D976C]",
  },
  {
    title: "Rating",
    value: "4.8",
    icon: Award,
    change: "+0.2",
    color: "from-[#F59E0B] to-[#FCD34D]",
  },
];

export const UserDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#1D976C]/10 to-[#93F9B9]/10 rounded-2xl p-6 border border-[rgba(255,255,255,0.06)]"
      >
        <h2 className="text-2xl font-bold text-[#F1F5F2]">
          Welcome back! 👋
        </h2>
        <p className="text-[#A9B5AF] mt-1">
          Heres whats happening with your agro store today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
};