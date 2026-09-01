"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const recentOrders = [
  {
    id: "#ORD-001",
    product: "Organic Fertilizer",
    date: "2024-01-15",
    status: "Delivered",
    amount: "$45.00",
  },
  {
    id: "#ORD-002",
    product: "Seeds Pack",
    date: "2024-01-14",
    status: "Processing",
    amount: "$32.50",
  },
  {
    id: "#ORD-003",
    product: "Garden Tools",
    date: "2024-01-13",
    status: "Shipped",
    amount: "$78.00",
  },
  {
    id: "#ORD-004",
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

export const RecentOrders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden"
    >
      <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#1D976C]" />
          <h3 className="text-lg font-semibold text-[#F1F5F2]">Recent Orders</h3>
        </div>
        <Link
          href="/dashboard/orders"
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
  );
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}