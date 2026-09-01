"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  color: string;
  delay?: number;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  change,
  color,
  delay = 0,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#7D8983]">{title}</p>
          <p className="text-2xl font-bold text-[#F1F5F2] mt-1">{value}</p>
          <p className="text-xs text-[#93F9B9] mt-1">{change}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-[#111714]" />
        </div>
      </div>
    </motion.div>
  );
};