"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

import ProductCard, {
  Product,
} from "../Cards/ProductCard";

/* ============================================
   PRODUCTS DATA
============================================ */

const productsData: Product[] = [
  {
    id: 1,
    name: "Hybrid Paddy Seeds",
    price: 450,
    oldPrice: 520,
    category: "Seeds",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxbeQ7LaBvSfyMro_mW3zAAqG4Lq599ctEU6iRsDuF8NyyLGz-m2-l6g3I&s=10",
    unit: "5 kg",
    description:
      "High-yield hybrid paddy seeds designed for maximum harvest.",
    isOrganic: false,
    freeDelivery: true,
  },

  {
    id: 2,
    name: "Organic Compost",
    price: 320,
    category: "Fertilizers",
    image: "https://images.unsplash.com/photo-1681722478053-1aa3edd0f7f6?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    unit: "5 kg",
    description:
      "100% organic compost that improves soil health and plant growth.",
    isOrganic: true,
    freeDelivery: false,
  },

  {
    id: 3,
    name: "Power Tiller",
    price: 45000,
    oldPrice: 52000,
    category: "Machinery",
    image: "https://plus.unsplash.com/premium_photo-1680322756568-1f2bd881337d?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    unit: "1 unit",
    description:
      "Heavy-duty power tiller built for efficient farm cultivation.",
    isOrganic: false,
    freeDelivery: true,
  },

  {
    id: 4,
    name: "Premium Fish Feed",
    price: 2800,
    category: "Aquaculture",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSYsDHOJa7ViFWNXx__dK2huP7WG2XVh43OssJuSbIQwe6SNQyoQXlQOck&s=10",
    unit: "50 kg",
    description:
      "High-protein fish feed formulated for healthy and faster growth.",
    isOrganic: false,
    freeDelivery: true,
  },

  {
    id: 5,
    name: "Organic Pesticide",
    price: 280,
    oldPrice: 350,
    category: "Pest Control",
    image: "🧪",
    unit: "2 L",
    description:
      "Plant-friendly organic pest control solution for everyday farming.",
    isOrganic: true,
    freeDelivery: false,
  },

  {
    id: 6,
    name: "Drip Irrigation Kit",
    price: 5400,
    category: "Irrigation",
    image: "💧",
    unit: "1 set",
    description:
      "Complete drip irrigation system designed to save water and improve crop growth.",
    isOrganic: false,
    freeDelivery: true,
  },

  {
    id: 7,
    name: "Pruning Shears",
    price: 850,
    oldPrice: 1000,
    category: "Tools",
    image: "✂️",
    unit: "1 piece",
    description:
      "Professional-grade pruning shears for clean and precise cutting.",
    isOrganic: false,
    freeDelivery: false,
  },

  {
    id: 8,
    name: "Fruit Saplings Bundle",
    price: 1200,
    category: "Saplings",
    image: "🌳",
    unit: "5 pieces",
    description:
      "A collection of five healthy fruit saplings ready for plantation.",
    isOrganic: true,
    freeDelivery: true,
  },

  {
    id: 9,
    name: "Mango Saplings (Amrapali)",
    price: 850,
    oldPrice: 1000,
    category: "Saplings",
    image: "🥭",
    unit: "1 piece",
    description:
      "Premium Amrapali mango sapling with excellent yield potential.",
    isOrganic: true,
    freeDelivery: true,
  },

  {
    id: 10,
    name: "NPK Fertilizer (19:19:19)",
    price: 650,
    oldPrice: 780,
    category: "Fertilizers",
    image: "🧪",
    unit: "5 kg",
    description:
      "Balanced NPK fertilizer providing essential nutrients for crop growth.",
    isOrganic: false,
    freeDelivery: false,
  },
];

/* ============================================
   FEATURED PRODUCTS
============================================ */

export default function FeaturedProducts() {
  const [sortBy, setSortBy] =
    useState<string>("featured");

  const [viewAll, setViewAll] =
    useState<boolean>(false);

  /* ==========================================
     SORT PRODUCTS
  ========================================== */

  const displayedProducts = useMemo(() => {
    const sorted = [...productsData];

    switch (sortBy) {
      case "price-low":
        sorted.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        sorted.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "name":
        sorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      default:
        sorted.sort(
          (a, b) => a.id - b.id
        );
    }

    return viewAll
      ? sorted
      : sorted.slice(0, 6);
  }, [sortBy, viewAll]);

  /* ==========================================
     RETURN
  ========================================== */

  return (
    <section
      className="
        relative
        overflow-hidden
        py-20
      "
    >
      {/* ======================================
          BACKGROUND GLOW
      ======================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-20
          h-80
          w-80
          -translate-x-1/2
          rounded-full
          bg-[#1D976C]/10
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-[-120px]
          top-[35%]
          h-72
          w-72
          rounded-full
          bg-[#93F9B9]/5
          blur-[120px]
        "
      />

      {/* ======================================
          CONTAINER
      ======================================= */}

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* ====================================
            HEADER
        ===================================== */}

        <div
          className="
            mb-10
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          {/* Heading */}
          <div className="max-w-2xl">
            {/* Small Label */}
            <div
              className="
                mb-4
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#93F9B9]/10
                bg-[#1D976C]/5
                px-3.5
                py-1.5
                text-xs
                font-medium
                text-[#93F9B9]
                backdrop-blur-md
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#93F9B9]
                  shadow-[0_0_12px_#93F9B9]
                "
              />

              Trusted Farm Essentials
            </div>

            {/* Heading */}
            <h2
              className="
                text-3xl
                font-bold
                leading-tight
                tracking-tight
                text-[#F1F5F2]
                sm:text-4xl
                lg:text-[42px]
              "
            >
              Everything your farm{" "}
              <span className="gradient-text">
                needs
              </span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-[#87968F]
                sm:text-base
              "
            >
              Quality agricultural products,
              carefully selected to help you
              grow better, faster, and smarter.
            </p>
          </div>

          {/* ==================================
              CONTROLS
          =================================== */}

          <div
            className="
              flex
              w-full
              flex-wrap
              items-center
              gap-2
              lg:w-auto
            "
          >
            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  z-10
                  h-4
                  w-4
                  -translate-y-1/2
                  text-[#71817A]
                "
              />

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="
                  h-11
                  appearance-none
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  py-2.5
                  pl-9
                  pr-9
                  text-xs
                  font-medium
                  text-[#C9D5D0]
                  outline-none
                  backdrop-blur-xl
                  transition-all
                  focus:border-[#1D976C]/40
                  focus:ring-2
                  focus:ring-[#1D976C]/10
                "
              >
                <option
                  value="featured"
                  className="bg-[#111714]"
                >
                  Featured
                </option>

                <option
                  value="price-low"
                  className="bg-[#111714]"
                >
                  Price: Low → High
                </option>

                <option
                  value="price-high"
                  className="bg-[#111714]"
                >
                  Price: High → Low
                </option>

                <option
                  value="name"
                  className="bg-[#111714]"
                >
                  Alphabetical
                </option>
              </select>
            </div>

            {/* View All */}
            <button
              type="button"
              onClick={() =>
                setViewAll(!viewAll)
              }
              className="
                group
                flex
                h-11
                items-center
                gap-2
                rounded-xl
                border
                border-[#1D976C]/20
                bg-[#1D976C]/5
                px-4
                text-xs
                font-semibold
                text-[#93F9B9]
                transition-all
                duration-300
                hover:border-[#1D976C]/40
                hover:bg-[#1D976C]/10
              "
            >
              {viewAll
                ? "Show Less"
                : "View All"}

              <ArrowRight
                className={`
                  h-4 w-4
                  transition-transform
                  duration-300
                  ${
                    viewAll
                      ? "-rotate-90"
                      : ""
                  }
                  group-hover:translate-x-1
                `}
              />
            </button>
          </div>
        </div>

        {/* ====================================
            PRODUCTS GRID
        ===================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-7
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {displayedProducts.map(
            (product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            )
          )}
        </div>

        {/* ====================================
            EMPTY STATE
        ===================================== */}

        {displayedProducts.length === 0 && (
          <div
            className="
              py-20
              text-center
              text-[#87968F]
            "
          >
            No products found.
          </div>
        )}

        {/* ====================================
            LOAD MORE
        ===================================== */}

        {!viewAll &&
          productsData.length > 6 && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() =>
                  setViewAll(true)
                }
                className="
                  group
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  px-7
                  py-3.5
                  text-sm
                  font-medium
                  text-[#C9D5D0]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#1D976C]/35
                  hover:bg-[#1D976C]/5
                  hover:text-[#93F9B9]
                "
              >
                Explore more products

                <ArrowRight
                  className="
                    h-4 w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>
            </div>
          )}
      </div>
    </section>
  );
}