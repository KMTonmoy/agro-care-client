"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

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

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <h2 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl">
            Common <span className="gradient-text">questions</span>
          </h2>
          <p className="mt-3 text-sm text-[#87968F] sm:text-base">
            Can't find your answer? Reach our support line any day, 8 AM to 8 PM.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-[#F1F5F2] sm:text-base">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1D976C]/10 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4 text-[#93F9B9]" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-5 text-sm leading-6 text-[#87968F]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
