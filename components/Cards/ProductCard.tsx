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
        whileHover={{ y: -6 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] p-3 backdrop-blur-xl transition-all duration-300 hover:border-[#1D976C]/40 hover:bg-white/[0.055] hover:shadow-[0_20px_60px_rgba(29,151,108,0.12)]"
      >
        <div className="relative h-[330px] overflow-hidden rounded-[22px] bg-[#0A110E]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,249,185,0.10),transparent_68%)]" />

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#0A110E] via-[#0A110E]/30 to-transparent" />

          <div className="absolute bottom-4 right-4 z-20 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white opacity-0 backdrop-blur-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#7D8D86]">
              {product.category}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#52635B]" />
            <span className="text-xs font-medium text-[#7D8D86]">
              {product.unit}
            </span>
          </div>

          <h3 className="line-clamp-1 text-xl font-semibold tracking-tight text-[#F1F5F2] transition-colors duration-300 group-hover:text-[#93F9B9]">
            {product.name}
          </h3>

          <p className="mt-2 min-h-[44px] line-clamp-2 text-sm leading-6 text-[#82918A]">
            {product.description || "Quality agricultural product for better farming."}
          </p>

          <div className="mt-4 flex min-h-[22px] flex-wrap items-center gap-x-5 gap-y-2">
            {product.isOrganic && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#93F9B9]">
                <Leaf className="h-4 w-4" />
                Organic
              </div>
            )}

            {product.freeDelivery && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#A7B4AE]">
                <Truck className="h-4 w-4" />
                Free Delivery
              </div>
            )}
          </div>

          <div className="my-5 h-px bg-white/[0.07]" />

          <div className="mt-auto flex items-end justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-[#93F9B9]">
                  ৳{product.price.toLocaleString()}
                </span>

                {product.oldPrice && (
                  <span className="text-sm text-[#66756E] line-through">
                    ৳{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <span className="mt-0.5 block text-xs text-[#65736D]">
                per {product.unit}
              </span>
            </div>

            <div className="flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#93F9B9] transition-all duration-300 group-hover:gap-2.5">
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#1D976C]/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.article>
    </Link>
  );
};

export default ProductCard;