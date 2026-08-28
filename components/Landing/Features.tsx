// components/Features.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Sprout, 
  Fish, 
  Leaf, 
  Wrench, 
  Shield, 
  Gauge, 
  Package, 
  Truck,
  Droplets,
  Trees,
  Bug,
  Tractor,
  Apple,
  Wheat,
  Flower,
  Syringe,
  ShieldCheck,
  Clock,
  Users,
  Award,
  TrendingUp,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Premium Seeds",
    description: "High-yield hybrid & certified organic seeds for maximum harvest",
    color: "#1D976C",
    category: "Seeds & Saplings"
  },
  {
    icon: Leaf,
    title: "Quality Fertilizers",
    description: "Organic compost, chemical fertilizers & soil conditioners",
    color: "#2BB584",
    category: "Fertilizers"
  },
  {
    icon: Fish,
    title: "Aquaculture Solutions",
    description: "Fish feed, fingerlings, pond equipment & aeration systems",
    color: "#2196F3",
    category: "Aquaculture"
  },
  {
    icon: Tractor,
    title: "Farm Machinery",
    description: "Tractors, power tillers, harvesters & farm implements",
    color: "#FF9800",
    category: "Machinery"
  },
  {
    icon: Wrench,
    title: "Farming Tools",
    description: "Hand tools, sprayers, pruning shears & garden equipment",
    color: "#9C27B0",
    category: "Tools"
  },
  {
    icon: Bug,
    title: "Crop Protection",
    description: "Safe pesticides, insecticides & organic pest control solutions",
    color: "#F44336",
    category: "Pest Control"
  },
  {
    icon: Gauge,
    title: "Irrigation Systems",
    description: "Drip irrigation, sprinklers, pumps & water management systems",
    color: "#00BCD4",
    category: "Irrigation"
  },
  {
    icon: Shield,
    title: "Animal Health",
    description: "Veterinary supplies, animal feed & health care products",
    color: "#4CAF50",
    category: "Animal Care"
  },
];

const stats = [
  { icon: Users, value: "500+", label: "Happy Farmers" },
  { icon: Award, value: "100%", label: "Organic Certified" },
  { icon: TrendingUp, value: "10K+", label: "Products Sold" },
  { icon: Clock, value: "24/7", label: "Expert Support" },
];

export default function Features() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects - Only decorative, no bg color */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#1D976C]/5 via-[#93F9B9]/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#93F9B9]/5 via-[#1D976C]/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-[#1D976C]/10 border border-[#1D976C]/20 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-[#93F9B9]" />
            <span className="text-xs font-medium text-[#93F9B9] tracking-wider uppercase">
              Complete Agricultural Solutions
            </span>
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F1F5F2]">
            Everything You Need for
            <br />
            <span className="gradient-text">Modern Farming</span>
          </h2>
          <p className="text-[#D0DCD6] text-lg mt-4 max-w-2xl mx-auto">
            From seeds to harvest, we provide all the agricultural inputs and
            equipment you need to grow more and grow better.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="glass rounded-2xl p-6 h-full hover:border-[rgba(255,255,255,0.12)] transition-all duration-300 hover:-translate-y-1">
                {/* Category Badge */}
                <span className="text-[10px] font-medium text-[#8A9A93] uppercase tracking-wider">
                  {feature.category}
                </span>

                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mt-3 mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${feature.color}15` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#F1F5F2] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#D0DCD6] leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <div className="mt-4 flex items-center gap-2 text-[#93F9B9] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Learn More</span>
                  <svg 
                    className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Hover Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ 
                    background: `radial-gradient(circle at center, ${feature.color}08, transparent 70%)`,
                    zIndex: -1
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass rounded-2xl p-6 text-center border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)] transition-all duration-300"
            >
              <stat.icon className="w-6 h-6 text-[#93F9B9] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#F1F5F2]">{stat.value}</div>
              <div className="text-sm text-[#8A9A93]">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-3xl p-8 md:p-12 border-[rgba(255,255,255,0.06)]">
            <h3 className="text-2xl font-bold text-[#F1F5F2] mb-3">
              Ready to Transform Your Farm?
            </h3>
            <p className="text-[#D0DCD6] mb-6">
              Join thousands of farmers who trust AgroCare for their agricultural needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="bg-gradient-to-r from-[#1D976C] to-[#93F9B9] hover:from-[#167A56] hover:to-[#1D976C] text-[#111714] font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-[#1D976C]/30 hover:shadow-[#1D976C]/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Start Shopping
              </button>
              <button className="border-[rgba(255,255,255,0.15)] hover:border-[#1D976C] text-[#F1F5F2] hover:text-[#93F9B9] hover:bg-[#1D976C]/10 px-8 py-3 rounded-2xl transition-all duration-300 border">
                <ShieldCheck className="w-5 h-5 inline mr-2" />
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}