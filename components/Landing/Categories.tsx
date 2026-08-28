"use client";

import {
  Sprout,
  Syringe,
  Wrench,
  Fish,
  Droplets,
  Trees,
  Package,
  Shield,
  Gauge,
  Leaf,
  Bug,
  Tractor,
} from "lucide-react";

const categories = [
  {
    icon: Sprout,
    title: "Seeds & Saplings",
    desc: "High-quality seeds & fruit saplings",
    count: 48,
  },
  {
    icon: Droplets,
    title: "Fertilizers",
    desc: "Organic & chemical fertilizers",
    count: 35,
  },
  {
    icon: Wrench,
    title: "Farming Tools",
    desc: "Hand tools & farm equipment",
    count: 42,
  },
  {
    icon: Fish,
    title: "Fish & Aquaculture",
    desc: "Fish feed, fingerlings & equipment",
    count: 28,
  },
  {
    icon: Bug,
    title: "Pest Control",
    desc: "Pesticides & crop protection",
    count: 22,
  },
  {
    icon: Tractor,
    title: "Farm Machinery",
    desc: "Tractors & farm implements",
    count: 15,
  },
  {
    icon: Gauge,
    title: "Irrigation Systems",
    desc: "Pumps & irrigation equipment",
    count: 18,
  },
  {
    icon: Shield,
    title: "Animal Health",
    desc: "Veterinary supplies & feed",
    count: 24,
  },
];

export default function Categories() {
  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#F1F5F2]">
            Shop by <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-[#D0DCD6] mt-2">
            Everything you need for modern farming and aquaculture
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="glass rounded-2xl p-6 text-center hover:border-[#1D976C]/30 transition-all cursor-pointer group hover:-translate-y-1 duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1D976C]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#1D976C]/20 transition-all">
                <category.icon className="w-7 h-7 text-[#93F9B9]" />
              </div>
              <h3 className="text-sm font-medium text-[#F1F5F2]">
                {category.title}
              </h3>
              <p className="text-xs text-[#8A9A93] mt-1">{category.desc}</p>
              <span className="text-xs text-[#1D976C] mt-2 inline-block">
                {category.count} products
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
