"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Grid3x3,
  LayoutList,
  ChevronDown,
  Filter,
  X,
  Leaf,
  Sprout,
  Trees,
  ShoppingBag,
  Truck,
  Package,
} from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product.types";

const fuzzySearch = (text: string, query: string): boolean => {
  if (!query.trim()) return true;
  
  const normalizedText = text.toLowerCase().trim();
  const normalizedQuery = query.toLowerCase().trim();
  
  if (normalizedText.includes(normalizedQuery)) return true;
  
  const queryWords = normalizedQuery.split(/\s+/);
  const textWords = normalizedText.split(/\s+/);
  
  const allWordsPresent = queryWords.every((qWord) => {
    return textWords.some((tWord) => {
      if (tWord.includes(qWord)) return true;
      return levenshteinDistance(tWord, qWord) <= 2;
    });
  });
  
  if (allWordsPresent) return true;
  
  return textWords.some((tWord) => {
    return queryWords.some((qWord) => {
      return levenshteinDistance(tWord, qWord) <= 2;
    });
  });
};

const levenshteinDistance = (a: string, b: string): number => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  
  const matrix = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
};

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, onSearchChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex-1 md:w-64">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52635B]" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-2.5 pl-9 pr-4 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52635B] hover:text-[#F1F5F2]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
};

const categories = [
  { name: "All", icon: ShoppingBag },
  { name: "Seeds", icon: Sprout },
  { name: "Fertilizers", icon: Leaf },
  { name: "Machinery", icon: Trees },
  { name: "Aquaculture", icon: Package },
  { name: "Tools", icon: Package },
  { name: "Irrigation", icon: Package },
  { name: "Saplings", icon: Sprout },
  { name: "Pest Control", icon: Package },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Name: A to Z", value: "name" },
];

const Shop = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showOrganicOnly, setShowOrganicOnly] = useState(false);
  const [showFreeDelivery, setShowFreeDelivery] = useState(false);
  const [showInStock, setShowInStock] = useState(true);
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && isFirstRender.current) {
      setSearchQuery(q);
    }
    isFirstRender.current = false;
  }, [searchParams]);

  useEffect(() => {
    if (isFirstRender.current) {
      return;
    }
    
    const currentParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      currentParams.set("q", searchQuery);
    } else {
      currentParams.delete("q");
    }
    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, router, searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Product[]>("/data/product.json");
        setProducts(response.data);
        setError("");
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          fuzzySearch(p.name, query) ||
          fuzzySearch(p.category, query) ||
          fuzzySearch(p.description || "", query)
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (showOrganicOnly) {
      filtered = filtered.filter((p) => p.isOrganic === true);
    }

    if (showFreeDelivery) {
      filtered = filtered.filter((p) => p.freeDelivery === true);
    }

    if (showInStock) {
      filtered = filtered.filter((p) => p.inStock !== false);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => a.id - b.id);
        break;
    }

    return filtered;
  }, [
    products,
    selectedCategory,
    searchQuery,
    priceRange,
    showOrganicOnly,
    showFreeDelivery,
    showInStock,
    sortBy,
  ]);

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

  const getSearchSuggestion = () => {
    if (!searchQuery || filteredProducts.length > 0) return null;
    
    const query = searchQuery.toLowerCase().trim();
    const allProducts = [...products];
    
    const suggestions = allProducts
      .filter((p) => {
        const name = p.name.toLowerCase();
        const desc = p.description?.toLowerCase() || "";
        return fuzzySearch(name, query) || fuzzySearch(desc, query);
      })
      .slice(0, 3);
    
    if (suggestions.length > 0) {
      return suggestions;
    }
    return null;
  };

  if (loading) {
    return (
      <section className="relative min-h-screen py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#1D976C]/30 border-t-[#93F9B9]"></div>
            <p className="text-[#87968F]">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative min-h-screen py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
              <X className="h-10 w-10 text-red-400" />
            </div>
            <p className="text-red-400">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-[#1D976C] px-6 py-2 text-sm font-medium text-white transition-all hover:bg-[#167A56]"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const suggestions = getSearchSuggestion();

  return (
    <section className="relative min-h-screen py-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#93F9B9]/20"
            style={{ top: pos.top, left: pos.left }}
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
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#93F9B9]/10 bg-[#1D976C]/5 px-3.5 py-1.5 text-xs font-medium text-[#93F9B9] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#93F9B9] shadow-[0_0_12px_#93F9B9]" />
                Shop
              </div>
              <h1 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl lg:text-[42px]">
                Browse Our <span className="gradient-text">Collection</span>
              </h1>
              <p className="mt-2 text-sm text-[#87968F]">
                {filteredProducts.length} products available
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            <div className="flex w-full md:w-auto gap-2">
              <SearchInput 
                searchQuery={searchQuery} 
                onSearchChange={setSearchQuery} 
              />
            </div>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111714]/40 p-4 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-1 flex-wrap gap-1.5">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.name;
              return (
                <motion.button
                  key={category.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#1D976C]/30 to-[#93F9B9]/20 text-[#93F9B9] border border-[#1D976C]/30"
                      : "text-[#82918A] hover:text-[#F1F5F2] hover:bg-white/[0.05]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.name}
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-white/[0.08] bg-white/[0.035] py-2 pl-4 pr-8 text-xs text-[#C9D5D0] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-[#111714]">
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52635B]" />
            </div>

            <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.035] p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-1.5 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-[#1D976C]/20 text-[#93F9B9]"
                    : "text-[#52635B] hover:text-[#82918A]"
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-1.5 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-[#1D976C]/20 text-[#93F9B9]"
                    : "text-[#52635B] hover:text-[#82918A]"
                }`}
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 rounded-xl bg-[#1D976C]/10 px-4 py-2 text-xs font-medium text-[#93F9B9] transition-all duration-300 hover:bg-[#1D976C]/20"
            >
              <Filter className="h-4 w-4" />
              Filters
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 overflow-hidden"
            >
              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111714]/40 p-6 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#F1F5F2]">
                      Price Range
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([Number(e.target.value), priceRange[1]])
                        }
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm text-[#F1F5F2] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], Number(e.target.value)])
                        }
                        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-sm text-[#F1F5F2] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#F1F5F2]">
                      Filters
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-[#82918A]">
                        <input
                          type="checkbox"
                          checked={showOrganicOnly}
                          onChange={() => setShowOrganicOnly(!showOrganicOnly)}
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        Organic Only
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#82918A]">
                        <input
                          type="checkbox"
                          checked={showFreeDelivery}
                          onChange={() => setShowFreeDelivery(!showFreeDelivery)}
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        Free Delivery
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#82918A]">
                        <input
                          type="checkbox"
                          checked={showInStock}
                          onChange={() => setShowInStock(!showInStock)}
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        In Stock Only
                      </label>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setPriceRange([0, 50000]);
                        setShowOrganicOnly(false);
                        setShowFreeDelivery(false);
                        setShowInStock(true);
                        setSelectedCategory("All");
                        setSearchQuery("");
                      }}
                      className="w-full rounded-xl border border-[#1D976C]/20 px-4 py-2 text-sm text-[#93F9B9] transition-all duration-300 hover:bg-[#1D976C]/10"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1D976C]/10">
              <ShoppingBag className="h-10 w-10 text-[#52635B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#F1F5F2]">
              {searchQuery ? `No results for "${searchQuery}"` : "No products found"}
            </h3>
            <p className="mt-2 text-sm text-[#87968F]">
              {searchQuery 
                ? "Try adjusting your search term or filters" 
                : "Try adjusting your filters"}
            </p>
            
            {suggestions && suggestions.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-[#87968F] mb-3">Did you mean?</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => setSearchQuery(product.name)}
                      className="rounded-xl border border-[#1D976C]/20 bg-[#1D976C]/10 px-4 py-2 text-sm text-[#93F9B9] transition-all hover:bg-[#1D976C]/20"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111714]/40 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:border-[#1D976C]/30 hover:shadow-[0_12px_60px_rgba(29,151,108,0.15)] ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <Link href={`/product/${product.id}`} className="block h-full w-full">
                  <div className={viewMode === "list" ? "flex w-full" : ""}>
                    <div
                      className={`relative overflow-hidden bg-[#0A110E] ${
                        viewMode === "grid"
                          ? "h-32 sm:h-40 md:h-48 lg:h-56"
                          : "h-48 w-48 shrink-0 sm:h-56 sm:w-56"
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 sm:h-14 md:h-16 bg-gradient-to-t from-[#0A110E] to-transparent" />
                      
                      <div className="absolute left-2 sm:left-3 top-2 sm:top-3 flex flex-col gap-1">
                        {product.isOrganic && (
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-[#1D976C]/90 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium text-white backdrop-blur-sm">
                            <Leaf className="h-2 w-2 sm:h-3 sm:w-3" />
                            <span className="hidden xs:inline">Organic</span>
                          </span>
                        )}
                        {product.freeDelivery && (
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 rounded-full bg-blue-500/90 px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-medium text-white backdrop-blur-sm">
                            <Truck className="h-2 w-2 sm:h-3 sm:w-3" />
                            <span className="hidden xs:inline">Free Delivery</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`flex flex-1 flex-col p-2 sm:p-3 md:p-4 ${viewMode === "list" ? "justify-center" : ""}`}>
                      <div className="flex items-start justify-between gap-1 sm:gap-2">
                        <div className="min-w-0 flex-1">
                          <span className="text-[8px] sm:text-[10px] md:text-xs font-medium uppercase tracking-[0.08em] sm:tracking-[0.12em] text-[#7D8D86]">
                            {product.category}
                          </span>
                          <h3 className="mt-0.5 sm:mt-1 line-clamp-1 text-xs sm:text-sm md:text-base font-semibold text-[#F1F5F2] transition-colors group-hover:text-[#93F9B9]">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      <div className="mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[#82918A]">
                        <span>{product.unit}</span>
                      </div>

                      <p className="hidden sm:block mt-1 sm:mt-2 line-clamp-2 text-[10px] sm:text-xs md:text-sm text-[#82918A]">
                        {product.description || "Quality agricultural product for better farming."}
                      </p>

                      <div className="mt-2 sm:mt-3 flex items-end justify-between gap-1 sm:gap-2">
                        <div>
                          <div className="flex items-baseline gap-1 sm:gap-2">
                            <span className="text-xs sm:text-base md:text-xl font-bold text-[#93F9B9]">
                              ৳{product.price.toLocaleString()}
                            </span>
                            {product.oldPrice && (
                              <span className="text-[8px] sm:text-xs md:text-sm text-[#52635B] line-through">
                                ৳{product.oldPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <span className="text-[8px] sm:text-[10px] md:text-xs text-[#52635B]">
                            per {product.unit}
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-lg sm:rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] px-1.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-[8px] sm:text-xs md:text-sm font-semibold text-[#0A110E] transition-all duration-300 hover:shadow-lg hover:shadow-[#1D976C]/25 whitespace-nowrap"
                        >
                          <span className="hidden xs:inline">Add to Cart</span>
                          <span className="xs:hidden">Cart</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #1D976C 0%, #93F9B9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
};

export default Shop;