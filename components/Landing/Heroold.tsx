// components/Hero.tsx
"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Truck,
  Shield,
  Star,
  ArrowRight,
  Play,
  Users,
  Award,
  Clock,
  Zap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Sun,
  Droplets,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample carousel images (replace with your actual images)
const carouselImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    alt: "Fresh vegetables",
    title: "Fresh Organic Produce",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    alt: "Farm landscape",
    title: "Sustainable Farming",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1595853035070-59a39fe84de3?w=800&h=600&fit=crop",
    alt: "Happy farmers",
    title: "Empowering Farmers",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&h=600&fit=crop",
    alt: "Organic products",
    title: "Quality Products",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const stats = [
    { icon: Users, label: "Happy Farmers", value: "500+" },
    { icon: Star, label: "Customer Rating", value: "4.9" },
    { icon: Award, label: "Organic Certified", value: "100%" },
    { icon: Clock, label: "Delivery Time", value: "24/7" },
  ];

  const trustBadges = [
    { icon: Shield, label: "100% Secure" },
    { icon: Truck, label: "Free Delivery" },
    { icon: Leaf, label: "100% Organic" },
    { icon: TrendingUp, label: "Growing Community" },
  ];

  // Particle positions - fixed for hydration
  const particlePositions = [
    { top: "10%", left: "5%" },
    { top: "20%", left: "85%" },
    { top: "35%", left: "15%" },
    { top: "50%", left: "75%" },
    { top: "65%", left: "25%" },
    { top: "80%", left: "90%" },
    { top: "90%", left: "10%" },
    { top: "15%", left: "45%" },
    { top: "45%", left: "55%" },
    { top: "70%", left: "40%" },
    { top: "30%", left: "95%" },
    { top: "85%", left: "60%" },
    { top: "55%", left: "8%" },
    { top: "5%", left: "65%" },
    { top: "95%", left: "35%" },
  ];

  return (
    <section className="relative pt-24 md:pt-28 overflow-hidden bg-[#111714]">
      {/* HERO OUTER CONTAINER — SAME WIDTH AS NAVBAR */}
      <div
        className={cn(
          "mx-4 md:mx-6 lg:mx-8",
          "rounded-2xl md:rounded-3xl",
          "overflow-hidden",
          "relative",
          "bg-[#111714]",
          "border border-[rgba(255,255,255,0.06)]",
          "shadow-[0_8px_40px_rgba(0,0,0,0.45)]",
        )}
      >
        {/* ===== BACKGROUND EFFECTS ===== */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#1D976C]/15 via-[#93F9B9]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#93F9B9]/10 via-[#1D976C]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_rgba(29,151,108,0.06)_0%,_transparent_70%)] animate-pulse-slow" />

          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#93F9B9]/15"
              style={{
                top: pos.top,
                left: pos.left,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5 + (i % 5) * 1.2,
                repeat: Infinity,
                delay: (i % 4) * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}

          <motion.div
            className="absolute top-20 right-20 w-96 h-96 bg-[#1D976C]/10 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-20 left-20 w-80 h-80 bg-[#93F9B9]/10 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        {/* GRID */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

        {/* ===== MAIN CONTENT ===== */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* LEFT */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-2 bg-[#1D976C]/10 border border-[#1D976C]/20 rounded-full px-4 py-1.5"
                >
                  <Zap className="w-4 h-4 text-[#93F9B9]" />

                  <span className="text-xs font-medium text-[#93F9B9] tracking-wider uppercase">
                    Smart Farming 2026
                  </span>

                  <span className="w-1.5 h-1.5 rounded-full bg-[#93F9B9] animate-pulse ml-1" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]"
                >
                  <span className="text-[#F1F5F2]">Grow with</span>

                  <br />

                  <span className="bg-gradient-to-r from-[#1D976C] via-[#4DCF9A] to-[#93F9B9] bg-clip-text text-transparent">
                    AgroCare
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-lg text-[#A9B5AF] max-w-lg leading-relaxed"
                >
                  Empowering farmers and feeding communities with quality
                  agricultural products, expert guidance, and sustainable
                  farming solutions.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/shop">
                    <Button className="bg-gradient-to-r from-[#1D976C] to-[#93F9B9] hover:from-[#167A56] hover:to-[#1D976C] text-[#111714] font-semibold px-8 py-6 text-lg rounded-2xl shadow-lg shadow-[#1D976C]/30 hover:shadow-[#1D976C]/50 transition-all duration-300 hover:scale-105 group">
                      Start Shopping
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="border-[rgba(255,255,255,0.15)] hover:border-[#1D976C] text-[#F1F5F2] hover:text-[#93F9B9] hover:bg-[#1D976C]/10 px-8 py-6 text-lg rounded-2xl transition-all duration-300"
                    >
                      <Play className="mr-2 w-5 h-5" />
                      Watch Story
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="glass rounded-xl p-3 text-center border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-300"
                    >
                      <stat.icon className="w-4 h-4 text-[#93F9B9] mx-auto mb-1" />

                      <div className="text-lg font-bold text-[#F1F5F2]">
                        {stat.value}
                      </div>

                      <div className="text-[10px] text-[#A9B5AF]">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="flex flex-wrap items-center gap-3 text-[#7D8983]"
                >
                  {trustBadges.map((badge, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex items-center gap-1.5">
                        <badge.icon className="w-3.5 h-3.5 text-[#1D976C]" />
                        <span className="text-xs">{badge.label}</span>
                      </div>

                      {idx < trustBadges.length - 1 && (
                        <div className="w-px h-4 bg-[rgba(255,255,255,0.06)]" />
                      )}
                    </React.Fragment>
                  ))}
                </motion.div>
              </div>

              {/* RIGHT CAROUSEL */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative"
              >
                <div className="glass rounded-3xl overflow-hidden border-[rgba(255,255,255,0.06)] relative aspect-[4/3]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full relative"
                    >
                      <Image
                        src={carouselImages[currentSlide].src}
                        alt={carouselImages[currentSlide].alt}
                        fill
                        className="object-cover"
                        priority
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#111714]/60 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium">
                          {carouselImages[currentSlide].title}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111714]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] hover:bg-[#111714]/80 transition-all duration-300 flex items-center justify-center text-white hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#111714]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] hover:bg-[#111714]/80 transition-all duration-300 flex items-center justify-center text-white hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {carouselImages.map((_, idx) => (
                      <button
                        type="button"
                        key={idx}
                        aria-label={`Go to slide ${idx + 1}`}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setCurrentSlide(idx);

                          setTimeout(() => {
                            setIsAutoPlaying(true);
                          }, 3000);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          idx === currentSlide
                            ? "w-6 bg-[#93F9B9]"
                            : "bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.5)]"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#111714]/60 backdrop-blur-sm border border-[rgba(255,255,255,0.1)] text-xs text-[#A9B5AF]">
                    {currentSlide + 1} / {carouselImages.length}
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#1D976C]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#93F9B9]/10 rounded-full blur-2xl pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
