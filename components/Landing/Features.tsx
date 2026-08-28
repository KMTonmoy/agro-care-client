"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Wallet, Headset } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified quality",
    desc: "Every seed lot and fertilizer batch is lab-tested before it reaches your cart.",
  },
  {
    icon: Truck,
    title: "Same-week delivery",
    desc: "Regional depots mean most orders reach your field within three to five days.",
  },
  {
    icon: Wallet,
    title: "Fair, transparent pricing",
    desc: "No middleman markup. See the mill price and our margin on every listing.",
  },
  {
    icon: Headset,
    title: "Agronomist support",
    desc: "Call or message our field experts for crop-specific guidance, at no cost.",
  },
];

export default function Features() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-dark rounded-2xl p-6"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D976C]/10">
                <feature.icon className="h-6 w-6 text-[#93F9B9]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F1F5F2]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#87968F]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
