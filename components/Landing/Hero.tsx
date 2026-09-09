"use client";

import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import type { HeroImage, HeroProps, HeroState } from "@/types/hero.types";

const defaultProps: Partial<HeroProps> = {
  autoplayDelay: 5000,
  showControls: true,
  showIndicators: true,
  showCounter: true,
};

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

const kenBurnsVariants = {
  enter: { scale: 1 },
  center: { scale: 1.06 },
};

const Hero: React.FC<HeroProps> = (props) => {
  const {
    autoplayDelay = defaultProps.autoplayDelay!,
    showControls = defaultProps.showControls!,
    showIndicators = defaultProps.showIndicators!,
    showCounter = defaultProps.showCounter!,
    className = "",
  } = props;

  const prefersReducedMotion = useReducedMotion();

  const [state, setState] = useState<HeroState>({
    currentSlide: 0,
    direction: 1,
    isAutoPlaying: true,
    isLoading: true,
    error: null,
  });

  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const response = await axios.get(
          "https://agrocare-server.vercel.app/api/hero",
        );

        if (response.data?.success && response.data?.data?.length > 0) {
          setHeroImages(response.data.data);
          setState((prev) => ({ ...prev, isLoading: false }));
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: "No hero images found",
          }));
          setHeroImages([]);
        }
      } catch (err) {
        console.error("Failed to fetch hero images:", err);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            err instanceof Error ? err.message : "Failed to load hero images",
        }));
        setHeroImages([]);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!state.isAutoPlaying || heroImages.length === 0) return;

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        currentSlide: (prev.currentSlide + 1) % heroImages.length,
        direction: 1,
      }));
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [state.isAutoPlaying, heroImages.length, autoplayDelay]);

  const pauseAndResume = () => {
    setState((prev) => ({ ...prev, isAutoPlaying: false }));
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      setState((prev) => ({ ...prev, isAutoPlaying: true }));
    }, 3000);
  };

  const nextSlide = () => {
    if (heroImages.length === 0) return;
    setState((prev) => ({
      ...prev,
      currentSlide: (prev.currentSlide + 1) % heroImages.length,
      direction: 1,
    }));
    pauseAndResume();
  };

  const prevSlide = () => {
    if (heroImages.length === 0) return;
    setState((prev) => ({
      ...prev,
      currentSlide:
        (prev.currentSlide - 1 + heroImages.length) % heroImages.length,
      direction: -1,
    }));
    pauseAndResume();
  };

  const goToSlide = (index: number) => {
    setState((prev) => ({
      ...prev,
      currentSlide: index,
      direction: index > prev.currentSlide ? 1 : -1,
    }));
    pauseAndResume();
  };

  const { currentSlide, isLoading, error } = state;

  if (isLoading) {
    return (
      <section
        className={`relative w-full bg-[#111714] px-3 sm:px-5 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8 ${className}`}
      >
        <div className="relative w-full max-w-[1600px] mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl p-[1.5px] overflow-hidden">
            <div className="relative p-2 sm:p-3 lg:p-4 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#111714] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {/* aspect-[1920/820] matches your source banner exactly, so there's no layout jump on load */}
              <div className="relative w-full aspect-[1920/820] min-h-[280px] max-h-[680px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/[0.10] bg-[#111714] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#1D976C] border-t-transparent rounded-full animate-spin" />
                  <p className="text-[#A9B5AF]">Loading hero images...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || heroImages.length === 0) {
    return null;
  }

  const active = heroImages[currentSlide];

  return (
    <section
      className={`relative w-full bg-[#111714] px-3 sm:px-5 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8 ${className}`}
    >
      <div className="relative w-full max-w-[1600px] mx-auto">
        {/* Ambient glow — the one signature motion element for the whole hero */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-[2rem] blur-2xl opacity-60"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(147,249,185,0.35), rgba(29,151,108,0.15) 55%, transparent 80%)",
          }}
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }
          }
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
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative p-2 sm:p-3 lg:p-4 rounded-2xl sm:rounded-3xl border border-white/[0.08] bg-[#111714] shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
            {/*
              THE KEY FIX:
              aspect-[1920/820] matches your source banner's exact 2.34:1 ratio, so every
              slide gets a stable, correctly-shaped box at any viewport width — instead of
              the old fixed h-[500px]/h-[650px] values that forced object-cover to slice off
              the sides of the artwork on narrower screens. min-h/max-h just stop it getting
              unusably short or absurdly tall at extreme viewport sizes.
            */}
            <div className="relative w-full aspect-[1920/820] min-h-[280px] max-h-[680px] overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/[0.10] bg-[#111714] shadow-[inset_0_0_40px_rgba(0,0,0,0.4),0_0_30px_rgba(147,249,185,0.12)]">
              <AnimatePresence mode="wait" custom={state.direction}>
                <motion.div
                  key={active.id}
                  custom={state.direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {/*
                    Single image layer. The container is pinned to the source's exact
                    1920x820 ratio, so object-cover and object-contain are mathematically
                    identical here — nothing is cropped. Keeping only one layer (rather
                    than a sharp image over a blurred duplicate) avoids any sub-pixel
                    seam between layers, which is what was reading as soft/low-quality.
                    A slow scale gives it a subtle, premium Ken Burns drift instead of a
                    static, flat placement.
                  */}
                  <motion.div
                    className="absolute inset-0"
                    variants={kenBurnsVariants}
                    initial="enter"
                    animate="center"
                    transition={{
                      duration: autoplayDelay / 1000 + 0.7,
                      ease: "linear",
                    }}
                  >
                    <Image
                      src={active.src}
                      alt={active.alt}
                      fill
                      priority={currentSlide === 0}
                      sizes="(min-width: 1600px) 1600px, 100vw"
                      quality={100}
                      draggable={false}
                      className="object-cover object-center"
                    />
                  </motion.div>

                  {/*
                    Edge vignettes sit behind the nav arrows so they read as controls
                    floating over a soft fade, not as opaque circles cutting into the
                    artwork underneath them.
                  */}
                  {showControls && (
                    <>
                      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-36 bg-gradient-to-r from-black/35 to-transparent" />
                      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-36 bg-gradient-to-l from-black/35 to-transparent" />
                    </>
                  )}

                  {/* Overlay Text */}
                  {(active.title || active.subtitle) && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="text-center text-white px-4 max-w-4xl">
                        {active.title && (
                          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                            {active.title}
                          </h1>
                        )}
                        {active.subtitle && (
                          <p className="text-base sm:text-lg lg:text-xl text-white/85 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                            {active.subtitle}
                          </p>
                        )}
                        {active.buttonText && (
                          <a
                            href={active.buttonLink || "#"}
                            className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714] font-medium hover:from-[#167A56] hover:to-[#1D976C] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93F9B9]"
                          >
                            {active.buttonText}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              {showControls && (
                <>
                  <motion.button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 25px rgba(29,151,108,0.4)",
                    }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute left-4 sm:left-6 lg:left-8 xl:left-10 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl shadow-lg transition-colors duration-300 hover:bg-black/55 hover:border-[#93F9B9]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93F9B9]"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 25px rgba(29,151,108,0.4)",
                    }}
                    whileTap={{ scale: 0.92 }}
                    className="absolute right-4 sm:right-6 lg:right-8 xl:right-10 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-xl shadow-lg transition-colors duration-300 hover:bg-black/55 hover:border-[#93F9B9]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93F9B9]"
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
                      className="relative h-1.5 overflow-hidden rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#93F9B9]"
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
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="pointer-events-none absolute inset-0 z-30 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/[0.04]" />
            </div>

            <div className="pointer-events-none absolute inset-1 sm:inset-2 lg:inset-3 rounded-xl sm:rounded-2xl border border-[#93F9B9]/10" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.025]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
