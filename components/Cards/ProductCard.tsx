"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Leaf, Truck } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product.types";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay: index * 0.06,
        }}
        whileHover={{ y: -4 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-2 transition-all duration-300 hover:border-[#1D976C]/30 hover:bg-white/[0.04] hover:shadow-[0_12px_40px_rgba(29,151,108,0.08)]"
      >
        {/* Always-on Glowing Border */}
        <div className="absolute -inset-[1px] rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            aria-hidden
            className="absolute inset-[-50%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #93F9B9 12%, #1D976C 25%, transparent 40%, transparent 100%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Inner Content */}
        <div className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl bg-[#0A110E] border border-white/[0.05]">
          {/* Image Container - Slimmer */}
          <div className="relative h-[240px] overflow-hidden rounded-lg bg-[#0A110E]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,249,185,0.08),transparent_70%)]" />

            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-[#0A110E] via-[#0A110E]/20 to-transparent" />

            <div className="absolute bottom-3 right-3 z-20 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Content - Slimmer padding */}
          <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#7D8D86]">
                {product.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-[#52635B]" />
              <span className="text-[10px] font-medium text-[#7D8D86]">
                {product.unit}
              </span>
            </div>

            <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-[#F1F5F2] transition-colors duration-300 group-hover:text-[#93F9B9]">
              {product.name}
            </h3>

            <p className="mt-1.5 min-h-[36px] line-clamp-2 text-xs leading-5 text-[#82918A]">
              {product.description || "Quality agricultural product for better farming."}
            </p>

            <div className="mt-3 flex min-h-[18px] flex-wrap items-center gap-x-4 gap-y-1.5">
              {product.isOrganic && (
                <div className="flex items-center gap-1 text-[10px] font-medium text-[#93F9B9]">
                  <Leaf className="h-3.5 w-3.5" />
                  Organic
                </div>
              )}

              {product.freeDelivery && (
                <div className="flex items-center gap-1 text-[10px] font-medium text-[#A7B4AE]">
                  <Truck className="h-3.5 w-3.5" />
                  Free Delivery
                </div>
              )}
            </div>

            <div className="my-3 h-px bg-white/[0.06]" />

            <div className="mt-auto flex items-end justify-between gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold tracking-tight text-[#93F9B9]">
                    ৳{product.price.toLocaleString()}
                  </span>

                  {product.oldPrice && (
                    <span className="text-xs text-[#66756E] line-through">
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <span className="mt-0.5 block text-[10px] text-[#65736D]">
                  per {product.unit}
                </span>
              </div>

              <div className="flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-[#93F9B9] transition-all duration-300 group-hover:gap-2">
                View
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Bottom Glow Effect */}
          <div className="pointer-events-none absolute -bottom-20 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[#1D976C]/8 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Always-on Ambient Glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-3 rounded-2xl blur-xl opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(147,249,185,0.12), rgba(29,151,108,0.05) 60%, transparent 80%)",
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.article>
    </Link>
  );
};

export default ProductCard;