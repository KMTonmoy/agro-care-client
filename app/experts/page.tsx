"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  X,
  User,
  Star,
  MessageCircle,
  Calendar,
  Clock,
  ArrowUpRight,
  Leaf,
  Sprout,
  Trees,
  Award,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Video,
  Users,
  BookOpen,
  GraduationCap,
  ThumbsUp,
  Briefcase,
  Plus,
} from "lucide-react";

const categories = [
  { name: "All", icon: Users, count: 24 },
  { name: "Agronomists", icon: Leaf, count: 8 },
  { name: "Veterinarians", icon: Sprout, count: 6 },
  { name: "Soil Scientists", icon: Trees, count: 4 },
  { name: "Farm Consultants", icon: Briefcase, count: 3 },
  { name: "Hydroponics Experts", icon: GraduationCap, count: 3 },
];

const experts = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    title: "Senior Agronomist",
    category: "Agronomists",
    expertise: ["Crop Management", "Pest Control", "Soil Health"],
    rating: 4.9,
    reviews: 127,
    experience: "15 years",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
    bio: "Specializing in sustainable farming practices and crop yield optimization.",
    available: true,
    responseTime: "2 hours",
    price: 49,
    certifications: ["PhD Agriculture", "Certified Crop Advisor"],
    languages: ["English", "Bengali"],
    featured: true,
  },
  {
    id: 2,
    name: "Prof. John Smith",
    title: "Soil Scientist",
    category: "Soil Scientists",
    expertise: ["Soil Analysis", "Fertilizer Management", "Composting"],
    rating: 4.8,
    reviews: 95,
    experience: "20 years",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
    bio: "Expert in soil health improvement and sustainable fertilizer solutions.",
    available: true,
    responseTime: "1 hour",
    price: 59,
    certifications: ["PhD Soil Science", "Master Composter"],
    languages: ["English", "French"],
    featured: true,
  },
  {
    id: 3,
    name: "Dr. Maria Garcia",
    title: "Plant Pathologist",
    category: "Agronomists",
    expertise: ["Disease Control", "Plant Health", "Crop Protection"],
    rating: 4.7,
    reviews: 84,
    experience: "12 years",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1471&auto=format&fit=crop",
    bio: "Specializing in plant disease identification and integrated pest management.",
    available: false,
    responseTime: "4 hours",
    price: 45,
    certifications: ["PhD Plant Pathology", "IPM Specialist"],
    languages: ["English", "Spanish"],
    featured: false,
  },
  {
    id: 4,
    name: "Michael Chen",
    title: "Farm Business Consultant",
    category: "Farm Consultants",
    expertise: ["Business Planning", "Marketing", "Financial Management"],
    rating: 4.9,
    reviews: 156,
    experience: "18 years",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    bio: "Helping farmers build profitable and sustainable agricultural businesses.",
    available: true,
    responseTime: "2 hours",
    price: 69,
    certifications: ["MBA", "Certified Agri-business Professional"],
    languages: ["English", "Mandarin"],
    featured: true,
  },
  {
    id: 5,
    name: "Dr. Emily Watson",
    title: "Hydroponics Expert",
    category: "Hydroponics Experts",
    expertise: ["Hydroponic Systems", "Nutrient Management", "Vertical Farming"],
    rating: 4.6,
    reviews: 73,
    experience: "10 years",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
    bio: "Expert in modern hydroponic and aquaponic farming systems.",
    available: true,
    responseTime: "3 hours",
    price: 55,
    certifications: ["MSc Hydroponics", "Certified Hydroponic Farmer"],
    languages: ["English", "German"],
    featured: false,
  },
  {
    id: 6,
    name: "Dr. Robert Johnson",
    title: "Livestock Specialist",
    category: "Veterinarians",
    expertise: ["Animal Health", "Breeding", "Livestock Management"],
    rating: 4.8,
    reviews: 112,
    experience: "16 years",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
    bio: "Specializing in livestock health management and breeding programs.",
    available: false,
    responseTime: "5 hours",
    price: 65,
    certifications: ["DVM", "Certified Animal Health Specialist"],
    languages: ["English"],
    featured: true,
  },
];

const Experts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<typeof experts[0] | null>(null);

  const filteredExperts = experts.filter((expert) => {
    const matchesCategory =
      selectedCategory === "All" || expert.category === selectedCategory;
    const matchesSearch =
      expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expert.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesAvailability = showAvailableOnly ? expert.available : true;
    const matchesFeatured = showFeaturedOnly ? expert.featured : true;
    return matchesCategory && matchesSearch && matchesAvailability && matchesFeatured;
  });

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

  return (
    <section className="relative min-h-screen py-24">
      {/* Background Particles */}
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#93F9B9]/10 bg-[#1D976C]/5 px-3.5 py-1.5 text-xs font-medium text-[#93F9B9] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#93F9B9] shadow-[0_0_12px_#93F9B9]" />
                Meet Our Experts
              </div>
              <h1 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl lg:text-[42px]">
                Agricultural <span className="gradient-text">Experts</span>
              </h1>
              <p className="mt-2 text-sm text-[#87968F]">
                {filteredExperts.length} experts ready to help you grow
              </p>
            </div>

            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52635B]" />
                <input
                  type="text"
                  placeholder="Search experts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-2.5 pl-9 pr-4 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories & Filters */}
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
                  <span className="ml-1 text-[10px] opacity-50">{category.count}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Button */}
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

        {/* Filter Panel */}
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#F1F5F2]">
                      Filters
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-[#82918A]">
                        <input
                          type="checkbox"
                          checked={showAvailableOnly}
                          onChange={() => setShowAvailableOnly(!showAvailableOnly)}
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        Available Now
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#82918A]">
                        <input
                          type="checkbox"
                          checked={showFeaturedOnly}
                          onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        Featured Experts
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#F1F5F2]">
                      Rating
                    </label>
                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 text-sm text-[#82918A]">
                          <input
                            type="radio"
                            name="rating"
                            className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                          />
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                            <span>{rating}+</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setShowAvailableOnly(false);
                        setShowFeaturedOnly(false);
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

        {/* Experts Grid */}
        {filteredExperts.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1D976C]/10">
              <Users className="h-10 w-10 text-[#52635B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#F1F5F2]">No experts found</h3>
            <p className="mt-2 text-sm text-[#87968F]">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredExperts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111714]/40 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:border-[#1D976C]/30 hover:shadow-[0_12px_60px_rgba(29,151,108,0.15)]"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-[#0A110E] ring-2 ring-[#1D976C]/30">
                        <img
                          src={expert.avatar}
                          alt={expert.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {expert.available && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 ring-2 ring-[#111714]">
                          <div className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-75"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-base font-semibold text-[#F1F5F2]">
                            {expert.name}
                          </h3>
                          <p className="text-xs text-[#93F9B9]">{expert.title}</p>
                        </div>
                        {expert.featured && (
                          <div className="rounded-full bg-[#1D976C]/20 px-2 py-0.5">
                            <span className="text-[8px] font-medium text-[#93F9B9]">Featured</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mt-3 text-sm leading-relaxed text-[#82918A] line-clamp-2">
                    {expert.bio}
                  </p>

                  {/* Expertise */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {expert.expertise.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/[0.06] bg-white/[0.035] px-2.5 py-1 text-[10px] text-[#82918A]"
                      >
                        {skill}
                      </span>
                    ))}
                    {expert.expertise.length > 3 && (
                      <span className="rounded-full border border-white/[0.06] bg-white/[0.035] px-2.5 py-1 text-[10px] text-[#52635B]">
                        +{expert.expertise.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-4 text-xs text-[#52635B]">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-[#F1F5F2]">{expert.rating}</span>
                      <span>({expert.reviews})</span>
                    </div>
                    <span className="h-1 w-1 rounded-full bg-[#52635B]" />
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      <span>{expert.experience}</span>
                    </div>
                    <span className="h-1 w-1 rounded-full bg-[#52635B]" />
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{expert.responseTime}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {expert.languages.slice(0, 2).map((lang) => (
                          <span
                            key={lang}
                            className="rounded-full border border-[#111714] bg-[#0A110E] px-2 py-0.5 text-[10px] text-[#82918A]"
                          >
                            {lang}
                          </span>
                        ))}
                        {expert.languages.length > 2 && (
                          <span className="rounded-full border border-[#111714] bg-[#0A110E] px-2 py-0.5 text-[10px] text-[#52635B]">
                            +{expert.languages.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#93F9B9]">
                        ${expert.price}
                      </span>
                      <span className="text-[10px] text-[#52635B]">/hr</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] px-3 py-1.5 text-xs font-semibold text-[#0A110E] transition-all duration-300 hover:shadow-lg hover:shadow-[#1D976C]/25"
                      >
                        <span className="hidden sm:inline">Contact</span>
                        <span className="sm:hidden">
                          <MessageCircle className="h-4 w-4" />
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {filteredExperts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 rounded-3xl border border-[rgba(255,255,255,0.06)] bg-gradient-to-r from-[#1D976C]/10 to-[#93F9B9]/5 p-8 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1D976C]/20">
                  <Users className="h-6 w-6 text-[#93F9B9]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#F1F5F2]">
                    Need expert advice?
                  </h3>
                  <p className="text-sm text-[#82918A]">
                    Connect with our agricultural experts today
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] px-6 py-3 text-sm font-semibold text-[#0A110E] transition-all duration-300 hover:shadow-lg hover:shadow-[#1D976C]/25"
              >
                <MessageCircle className="h-4 w-4" />
                Get Expert Help
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
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

export default Experts;