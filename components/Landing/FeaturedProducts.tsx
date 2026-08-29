"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import ProductCard from "../Cards/ProductCard";
import { Product } from "@/types/product.types";

export default function FeaturedProducts() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>("/data/product.json");
        setProductsData(response.data);
      } catch (error) {
        console.error("Failed to load products:", error);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const displayedProducts = useMemo(() => {
    const featuredProducts = productsData.filter(
      (product) => product.isFeatured === true,
    );
    const sorted = [...featuredProducts];

    switch (sortBy) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => a.id - b.id);
        break;
    }

    return viewAll ? sorted : sorted.slice(0, 6);
  }, [productsData, sortBy, viewAll]);

  if (loading) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center text-[#87968F]">
            Loading products...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center text-red-400">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-[#1D976C]/10 blur-[130px]" />
      <div className="pointer-events-none absolute right-[-120px] top-[35%] h-72 w-72 rounded-full bg-[#93F9B9]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#93F9B9]/10 bg-[#1D976C]/5 px-3.5 py-1.5 text-xs font-medium text-[#93F9B9] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#93F9B9] shadow-[0_0_12px_#93F9B9]" />
              Featured Products
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#F1F5F2] sm:text-4xl lg:text-[42px]">
              Everything your <span className="gradient-text">farm needs</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#87968F] sm:text-base">
              Quality agricultural products, carefully selected to help you grow
              better, faster, and smarter.
            </p>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto">
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#71817A]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] py-2.5 pl-9 pr-9 text-xs font-medium text-[#C9D5D0] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10"
              >
                <option value="featured" className="bg-[#111714]">
                  Featured
                </option>
                <option value="price-low" className="bg-[#111714]">
                  Price: Low → High
                </option>
                <option value="price-high" className="bg-[#111714]">
                  Price: High → Low
                </option>
                <option value="name" className="bg-[#111714]">
                  Alphabetical
                </option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => setViewAll(!viewAll)}
              className="group flex h-11 items-center gap-2 rounded-xl border border-[#1D976C]/20 bg-[#1D976C]/5 px-4 text-xs font-semibold text-[#93F9B9] transition-all duration-300 hover:border-[#1D976C]/40 hover:bg-[#1D976C]/10"
            >
              {viewAll ? "Show Less" : "View All"}
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  viewAll ? "-rotate-90" : ""
                } group-hover:translate-x-1`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {displayedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="py-20 text-center text-[#87968F]">
            No featured products found.
          </div>
        )}

        {!viewAll &&
          productsData.filter((product) => product.isFeatured).length > 6 && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setViewAll(true)}
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-7 py-3.5 text-sm font-medium text-[#C9D5D0] backdrop-blur-xl transition-all duration-300 hover:border-[#1D976C]/35 hover:bg-[#1D976C]/5 hover:text-[#93F9B9]"
              >
                Explore more products
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          )}
      </div>
    </section>
  );
}
