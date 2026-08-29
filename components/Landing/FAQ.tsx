"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Leaf, Sprout, Trees, MessageCircle } from "lucide-react";
import Image from "next/image";

const faqs = [
  {
    q: "How fast is delivery to rural areas?",
    a: "Most orders reach district-level depots within three to five days, then a further one to two days to your village depending on road access.",
  },
  {
    q: "Can I return fertilizer or seed if the batch looks off?",
    a: "Yes. Unopened bags can be returned within 48 hours of delivery, and any batch failing a lab check is replaced at no cost.",
  },
  {
    q: "Do you offer credit or seasonal payment plans?",
    a: "Select cooperatives qualify for pay-after-harvest terms. Apply from your account once you've placed two orders on the platform.",
  },
  {
    q: "How do I reach an agronomist?",
    a: "Every order includes a free consult. Message from the app or call the support line printed on your delivery receipt.",
  },
  {
    q: "Is the machinery available for rent, not just purchase?",
    a: "Power tillers, threshers and pumps are available on daily and weekly rental in most districts, listed under Machinery.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Particle positions - matching navbar
  const particlePositions = [
    { top: "10%", left: "5%" },
    { top: "85%", left: "90%" },
    { top: "45%", left: "85%" },
    { top: "20%", left: "95%" },
    { top: "75%", left: "10%" },
    { top: "95%", left: "50%" },
    { top: "5%", left: "50%" },
    { top: "50%", left: "5%" },
  ];

  return (
    <section className="relative overflow-hidden py-20 bg-transparent">
      {/* Background Glow - Same as navbar */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#1D976C]/5 via-[#93F9B9]/3 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#93F9B9]/5 via-[#1D976C]/3 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_rgba(29,151,108,0.03)_0%,_transparent_70%)] animate-pulse-slow" />

        {/* Floating Particles - Same as navbar */}
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - FAQ */}
          <div>
            <div className="mb-12 max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#93F9B9]/10 bg-[#1D976C]/5 px-3.5 py-1.5 text-xs font-medium text-[#93F9B9] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#93F9B9] shadow-[0_0_12px_#93F9B9]" />
                FAQ
              </div>
              <h2 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl lg:text-[42px]">
                Common <span className="gradient-text">questions</span>
              </h2>
              <p className="mt-3 text-sm text-[#87968F] sm:text-base">
                Cant find your answer? Reach our support line any day, 8 AM to 8 PM.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111714]/40 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.03]"
                    >
                      <span className="text-sm font-medium text-[#F1F5F2] sm:text-base">
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1D976C]/10"
                      >
                        <Plus className="h-4 w-4 text-[#93F9B9]" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-5 pt-1 border-t border-[rgba(255,255,255,0.06)]">
                            <p className="text-sm leading-6 text-[#87968F]">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="sticky top-28 lg:mt-12"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[#111714]/40 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] p-1">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1D976C]/20 to-[#93F9B9]/10">
                <Image
                  src="https://static.vecteezy.com/system/resources/previews/033/517/135/non_2x/farmer-confused-with-question-mark-vector.jpg"
                  alt="Farmer asking questions"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A110E] via-transparent to-transparent opacity-60" />
                
                {/* Floating Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-6 left-6 flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.06)] bg-[#111714]/60 backdrop-blur-xl px-3 py-1.5"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-[#93F9B9]" />
                  <span className="text-xs text-[#F1F5F2]">24/7 Support</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.06)] bg-[#111714]/60 backdrop-blur-xl px-3 py-1.5"
                >
                  <Leaf className="h-3.5 w-3.5 text-[#93F9B9]" />
                  <span className="text-xs text-[#F1F5F2]">Expert Advice</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#1D976C]/20 backdrop-blur-xl border border-[rgba(255,255,255,0.06)] flex items-center justify-center">
                      <Sprout className="h-10 w-10 text-[#93F9B9]" />
                    </div>
                    <div className="absolute -inset-4 rounded-full border border-[#1D976C]/10 animate-ping" />
                  </div>
                </motion.div>
              </div>

              {/* Bottom Info */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[#F1F5F2]">
                      Got more questions?
                    </h4>
                    <p className="text-xs text-[#87968F]">
                      Were here to help you grow
                    </p>
                  </div>
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] px-4 py-2 text-sm font-semibold text-[#0A110E] transition-all duration-300 hover:shadow-lg hover:shadow-[#1D976C]/25"
                  >
                    Contact Us
                    <MessageCircle className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Leaf, label: "Experts", value: "50+" },
                { icon: Trees, label: "Farmers", value: "10K+" },
                { icon: Sprout, label: "Products", value: "500+" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111714]/30 backdrop-blur-xl p-4 text-center"
                >
                  <stat.icon className="h-5 w-5 mx-auto text-[#93F9B9] mb-1.5" />
                  <div className="text-lg font-bold text-[#F1F5F2]">{stat.value}</div>
                  <div className="text-xs text-[#87968F]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(2deg); }
          66% { transform: translate(-5px, 5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg, #1D976C 0%, #93F9B9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}