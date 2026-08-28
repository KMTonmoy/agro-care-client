"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass-strong relative overflow-hidden rounded-[32px] px-8 py-14 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#1D976C]/15 blur-[110px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#93F9B9]/10 blur-[110px]" />

          <div className="relative mx-auto max-w-xl">
            <h2 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl">
              Get seasonal alerts before your{" "}
              <span className="gradient-text">neighbors do</span>
            </h2>
            <p className="mt-3 text-sm text-[#A7B4AE] sm:text-base">
              Price drops, restocks and planting-window reminders, sent to your
              inbox. No spam, unsubscribe anytime.
            </p>

            {submitted ? (
              <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-[#1D976C]/25 bg-[#1D976C]/10 px-6 py-4 text-sm font-medium text-[#93F9B9]">
                <CheckCircle2 className="h-5 w-5" />
                You're subscribed. Watch your inbox.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-dark flex-1"
                />
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#2BB584] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(29,151,108,0.25)] transition-all duration-300 hover:shadow-[0_16px_50px_rgba(29,151,108,0.4)]"
                >
                  Subscribe
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
