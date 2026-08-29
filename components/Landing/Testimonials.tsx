"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Abdul Karim",
    role: "Paddy grower, Rangpur",
    quote:
      "Delivery used to take two weeks through my local dealer. Now hybrid seed reaches my field in three days, and the price is printed right on the app.",
    rating: 5,
  },
  {
    name: "Nasrin Akter",
    role: "Vegetable farmer, Jessore",
    quote:
      "The agronomist team helped me switch fertilizer mix mid-season and saved my tomato crop. That kind of support is worth more than any discount.",
    rating: 5,
  },
  {
    name: "Mizanur Rahman",
    role: "Fish farmer, Mymensingh",
    quote:
      "I manage three ponds and reorder feed every ten days. Having order history and auto reminders means I never run short anymore.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl">
            Trusted by farmers who <span className="gradient-text">cant afford delays</span>
          </h2>
          <p className="mt-3 text-sm text-[#87968F] sm:text-base">
            Real stories from growers using the platform this season.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass relative flex h-full flex-col rounded-3xl p-7"
            >
              <Quote className="h-8 w-8 text-[#1D976C]/30" />

              <p className="mt-4 flex-1 text-sm leading-7 text-[#C9D5D0]">
                {t.quote}
              </p>

              <div className="mt-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${
                      idx < t.rating
                        ? "fill-[#93F9B9] text-[#93F9B9]"
                        : "fill-transparent text-[#3A453F]"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1D976C] to-[#93F9B9] text-sm font-bold text-[#0A110E]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F1F5F2]">{t.name}</div>
                  <div className="text-xs text-[#7D8D86]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
