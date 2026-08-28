import Categories from "@/components/Landing/Categories";
import FAQ from "@/components/Landing/FAQ";
import FeaturedProducts from "@/components/Landing/FeaturedProducts";
import Features from "@/components/Landing/Features";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import Newsletter from "@/components/Landing/Newsletter";
import SeasonalOffers from "@/components/Landing/SeasonalOffers";
import Testimonials from "@/components/Landing/Testimonials";
import React from "react";

const Page = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <SeasonalOffers />
      <FeaturedProducts />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Page;
