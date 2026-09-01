"use client";

import { motion } from "framer-motion";
import {
  Users,
  ShoppingBag,
  Package,
  TrendingUp,
  Clock,
  ArrowRight,
  DollarSign,
  ShoppingCart,
  Store,
  BarChart,
} from "lucide-react";
import Link from "next/link";
import { StatsCard } from "./StatsCard";

const adminStats = [
  {
    title: "Total Users",
    value: "1,284",
    icon: Users,
    change: "+18%",
    color: "from-[#1D976C] to-[#93F9B9]",
  },
  {
    title: "Total Orders",
    value: "3,456",
    icon: ShoppingBag,
    change: "+24%",
    color: "from-[#4DCF9A] to-[#2BB584]",
  },
  {
    title: "Revenue",
    value: "$45,230",
    icon: DollarSign,
    change: "+32%",
    color: "from-[#93F9B9] to-[#1D976C]",
  },
  {
    title: "Products",
    value: "892",
    icon: Package,
    change: "+12%",
    color: "from-[#F59E0B] to-[#FCD34D]",
  },
];

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    product: "Organic Fertilizer",
    date: "2024-01-15",
    status: "Delivered",
    amount: "$45.00",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    product: "Seeds Pack",
    date: "2024-01-14",
    status: "Processing",
    amount: "$32.50",
  },
  {
    id: "#ORD-003",
    customer: "Robert Johnson",
    product: "Garden Tools",
    date: "2024-01-13",
    status: "Shipped",
    amount: "$78.00",
  },
  {
    id: "#ORD-004",
    customer: "Emily Davis",
    product: "Organic Pesticide",
    date: "2024-01-12",
    status: "Pending",
    amount: "$23.75",
  },
];

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Delivered: "text-green-400 bg-green-400/10 border-green-400/20",
    Processing: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Shipped: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Pending: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  };
  return colors[status] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
};

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#1D976C]/10 to-[#93F9B9]/10 rounded-2xl p-6 border border-[rgba(255,255,255,0.06)]"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#F1F5F2]">
              Admin Dashboard 🚀
            </h2>
            <p className="text-[#A9B5AF] mt-1">
              Overview of your entire agro marketplace.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-[#1D976C]/20 border border-[#1D976C]/30 text-xs font-medium text-[#93F9B9]">
              Last 30 days
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-[#1D976C]/20 to-[#93F9B9]/20 rounded-2xl p-6 border border-[rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1D976C]/20 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-[#93F9B9]" />
            </div>
            <div>
              <p className="text-sm text-[#7D8983]">Pending Orders</p>
              <p className="text-2xl font-bold text-[#F1F5F2]">18</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-r from-[#4DCF9A]/20 to-[#2BB584]/20 rounded-2xl p-6 border border-[rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4DCF9A]/20 flex items-center justify-center">
              <Store className="w-6 h-6 text-[#4DCF9A]" />
            </div>
            <div>
              <p className="text-sm text-[#7D8983]">Low Stock Items</p>
              <p className="text-2xl font-bold text-[#F1F5F2]">7</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-[#F59E0B]/20 to-[#FCD34D]/20 rounded-2xl p-6 border border-[rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/20 flex items-center justify-center">
              <BarChart className="w-6 h-6 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-sm text-[#7D8983]">Todays Revenue</p>
              <p className="text-2xl font-bold text-[#F1F5F2]">$1,234</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#1D976C]" />
            <h3 className="text-lg font-semibold text-[#F1F5F2]">Recent Orders</h3>
          </div>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 text-sm text-[#93F9B9] hover:text-[#1D976C] transition-colors duration-300"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[rgba(255,255,255,0.02)]">
              <tr>
                <th className="text-left text-xs font-medium text-[#7D8983] uppercase tracking-wider px-6 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-[#7D8983] uppercase tracking-wider px-6 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-[#7D8983] uppercase tracking-wider px-6 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-[#7D8983] uppercase tracking-wider px-6 py-3">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-[#7D8983] uppercase tracking-wider px-6 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-[#7D8983] uppercase tracking-wider px-6 py-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(255,255,255,0.04)]">
              {recentOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#F1F5F2]">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A9B5AF]">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A9B5AF]">
                    {order.product}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#7D8983]">
                    {order.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-xs font-medium px-3 py-1 rounded-full border",
                      getStatusColor(order.status)
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-[#F1F5F2] text-right">
                    {order.amount}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}