"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import type { HeroImage, HeroProps, HeroState } from "@/types/hero.types";

// Default props
const defaultProps: Partial<HeroProps> = {
  autoplayDelay: 5000,
  showControls: true,
  showIndicators: true,
  showCounter: true,
  height: {
    mobile: "h-[500px]",
    tablet: "sm:h-[580px]",
    desktop: "lg:h-[650px]",
    xl: "xl:h-[680px]",
  },
};

// Slide variants
const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
  }),
};

const Hero: React.FC<HeroProps> = (props) => {
  // Merge props with defaults
  const {
    autoplayDelay = defaultProps.autoplayDelay!,
    height = defaultProps.height!,
    showControls = defaultProps.showControls!,
    showIndicators = defaultProps.showIndicators!,
    showCounter = defaultProps.showCounter!,
    className = "",
  } = props;

  // State
  const [state, setState] = useState<HeroState>({
    currentSlide: 0,
    direction: 1,
    isAutoPlaying: true,
    isLoading: true,
    error: null,
  });

  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        const response = await axios.get('http://localhost:8000/api/hero');
        
        if (response.data?.success && response.data?.data?.length > 0) {
          setHeroImages(response.data.data);
          setState(prev => ({ ...prev, isLoading: false }));
        } else {
          setState(prev => ({ 
            ...prev, 
            isLoading: false, 
            error: 'No hero images found' 
          }));
          setHeroImages([]);
        }
      } catch (err) {
        console.error('Failed to fetch hero images:', err);
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: err instanceof Error ? err.message : 'Failed to load hero images' 
        }));
        setHeroImages([]);
      }
    };

    fetchImages();
  }, []);

  // Auto-play
  useEffect(() => {
    if (!state.isAutoPlaying || heroImages.length === 0) return;

    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        currentSlide: (prev.currentSlide + 1) % heroImages.length,
        direction: 1,
      }));
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [state.isAutoPlaying, heroImages.length, autoplayDelay]);

  const pauseAndResume = () => {
    setState(prev => ({ ...prev, isAutoPlaying: false }));
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      setState(prev => ({ ...prev, isAutoPlaying: true }));
    }, 3000);
  };

  const nextSlide = () => {
    if (heroImages.length === 0) return;
    setState(prev => ({
      ...prev,
      currentSlide: (prev.currentSlide + 1) % heroImages.length,
      direction: 1,
    }));
    pauseAndResume();
  };

  const prevSlide = () => {
    if (heroImages.length === 0) return;
    setState(prev => ({
      ...prev,
      currentSlide: (prev.currentSlide - 1 + heroImages.length) % heroImages.length,
      direction: -1,
    }));
    pauseAndResume();
  };

  const goToSlide = (index: number) => {
    setState(prev => ({
      ...prev,
      currentSlide: index,
      direction: index > prev.currentSlide ? 1 : -1,
    }));
    pauseAndResume();
  };

  const { currentSlide, isLoading, error } = state;

  // Loading state
  if (isLoading) {
    return (
      <section className={`relative w-full bg-[#111714] px-3 sm:px-5 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8 ${className}`}>
        <div className="relative w-full max-w-[1600px] mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl p-[1.5px] overflow-hidden">
            <div className="relative p-2 sm:p-3 lg:p-4 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#111714] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[650px] xl:h-[680px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/[0.10] bg-[#111714] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#1D976C] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[#A9B5AF]">Loading hero images...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state - show nothing
  if (error || heroImages.length === 0) {
    return null;
  }

  return (
    <section className={`relative w-full bg-[#111714] px-3 sm:px-5 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8 ${className}`}>
      <div className="relative w-full max-w-[1600px] mx-auto">
        {/* Glow layer */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-[2rem] blur-2xl opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(147,249,185,0.35), rgba(29,151,108,0.15) 55%, transparent 80%)",
          }}
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating border */}
        <div className="relative rounded-2xl sm:rounded-3xl p-[1.5px] overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute inset-[-50%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #93F9B9 15%, #1D976C 30%, transparent 45%, transparent 100%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative p-2 sm:p-3 lg:p-4 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#111714] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            <motion.div
              className={`relative w-full ${height.mobile} ${height.tablet} ${height.desktop} ${height.xl} overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/[0.10] bg-[#111714] shadow-[inset_0_0_40px_rgba(0,0,0,0.4)]`}
              animate={{
                boxShadow: [
                  "inset 0 0 40px rgba(0,0,0,0.4), 0 0 0px rgba(147,249,185,0)",
                  "inset 0 0 40px rgba(0,0,0,0.4), 0 0 30px rgba(147,249,185,0.35)",
                  "inset 0 0 40px rgba(0,0,0,0.4), 0 0 0px rgba(147,249,185,0)",
                ],
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait" custom={state.direction}>
                <motion.div
                  key={heroImages[currentSlide].id}
                  custom={state.direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[currentSlide].src}
                    alt={heroImages[currentSlide].alt}
                    fill
                    priority={currentSlide === 0}
                    sizes="100vw"
                    className="object-cover"
                  />

                  {/* Overlay Text */}
                  {(heroImages[currentSlide].title || heroImages[currentSlide].subtitle) && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center text-white px-4 max-w-4xl">
                        {heroImages[currentSlide].title && (
                          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                            {heroImages[currentSlide].title}
                          </h1>
                        )}
                        {heroImages[currentSlide].subtitle && (
                          <p className="text-base sm:text-lg lg:text-xl text-white/80">
                            {heroImages[currentSlide].subtitle}
                          </p>
                        )}
                        {heroImages[currentSlide].buttonText && (
                          <a
                            href={heroImages[currentSlide].buttonLink || "#"}
                            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714] font-medium hover:from-[#167A56] hover:to-[#1D976C] transition-all duration-300"
                          >
                            {heroImages[currentSlide].buttonText}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              {showControls && (
                <>
                  <motion.button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(29,151,108,0.4)" }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute left-4 sm:left-6 lg:left-8 xl:left-10 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl shadow-lg transition-colors duration-300 hover:bg-black/55 hover:border-[#93F9B9]/40"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(29,151,108,0.4)" }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute right-4 sm:right-6 lg:right-8 xl:right-10 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl shadow-lg transition-colors duration-300 hover:bg-black/55 hover:border-[#93F9B9]/40"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  </motion.button>
                </>
              )}

              {/* Counter */}
              {showCounter && (
                <motion.div
                  key={`counter-${currentSlide}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute top-5 sm:top-7 lg:top-8 right-5 sm:right-7 lg:right-8 z-20 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs sm:text-sm font-medium text-white/90 backdrop-blur-xl shadow-lg"
                >
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(heroImages.length).padStart(2, "0")}
                </motion.div>
              )}

              {/* Indicators */}
              {showIndicators && (
                <div className="absolute bottom-5 sm:bottom-7 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl shadow-lg">
                  {heroImages.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className="relative h-1.5 overflow-hidden rounded-full transition-all duration-300"
                    >
                      <motion.span
                        className="block h-1.5 rounded-full bg-white/40"
                        animate={{ width: index === currentSlide ? 36 : 10 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                      {index === currentSlide && (
                        <motion.span
                          layoutId="active-dot-glow"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1D976C] to-[#93F9B9] shadow-[0_0_10px_rgba(147,249,185,0.6)]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 z-30 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/[0.04]" />
            </motion.div>

            <div className="pointer-events-none absolute inset-1 sm:inset-2 lg:inset-3 rounded-xl sm:rounded-2xl border border-[#93F9B9]/10" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.025]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;