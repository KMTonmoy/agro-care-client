"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBasket, PackageCheck, Sprout } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse by need",
    desc: "Filter by crop, season or category to find exactly what your land needs.",
  },
  {
    icon: ShoppingBasket,
    step: "02",
    title: "Order in minutes",
    desc: "Add to cart, choose a delivery window, and pay by mobile banking or cash.",
  },
  {
    icon: PackageCheck,
    step: "03",
    title: "Track to your door",
    desc: "Follow your order from depot to delivery with live status updates.",
  },
  {
    icon: Sprout,
    step: "04",
    title: "Grow with support",
    desc: "Get agronomist check-ins and reminders timed to your crop cycle.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-[#1D976C]/8 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl">
            From browsing to <span className="gradient-text">harvest</span>
          </h2>
          <p className="mt-3 text-sm text-[#87968F] sm:text-base">
            A simple, four-step path from your first click to a fuller yield.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-11 hidden h-px bg-gradient-to-r from-transparent via-[#1D976C]/30 to-transparent lg:block" />

          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 flex h-22 w-22 items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#1D976C]/25 bg-[#111714] shadow-dark-md">
                  <item.icon className="h-7 w-7 text-[#93F9B9]" />
                </div>
              </div>

              <span className="mt-5 block text-xs font-semibold tracking-[0.2em] text-[#1D976C]">
                STEP {item.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-[#F1F5F2]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#87968F]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
