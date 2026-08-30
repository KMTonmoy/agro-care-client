"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  X,
  GraduationCap,
  BookOpen,
  Video,
  Users,
  Calendar,
  Clock,
  ArrowUpRight,
  Play,
  Star,
  User,
  MessageCircle,
  Download,
  ExternalLink,
  ChevronRight,
  Award,
  Lightbulb,
  BookMarked,
  Sparkles,
  Leaf,
  Sprout,
  Trees,
} from "lucide-react";

const categories = [
  { name: "All", icon: GraduationCap, count: 24 },
  { name: "Farming Basics", icon: Leaf, count: 8 },
  { name: "Advanced Techniques", icon: Sprout, count: 6 },
  { name: "Machinery Training", icon: Trees, count: 4 },
  { name: "Organic Farming", icon: Sparkles, count: 3 },
  { name: "Business & Marketing", icon: Award, count: 3 },
];

const courses = [
  {
    id: 1,
    title: "Modern Farming Techniques",
    description: "Learn the latest farming methods to maximize your crop yield.",
    category: "Advanced Techniques",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 24,
    students: 1240,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1472&auto=format&fit=crop",
    instructor: {
      name: "Dr. Sarah Ahmed",
      title: "Agricultural Scientist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
    },
    isFree: true,
    featured: true,
    tags: ["Practical", "Hands-on"],
  },
  {
    id: 2,
    title: "Organic Farming 101",
    description: "Complete guide to organic farming without chemical fertilizers.",
    category: "Organic Farming",
    level: "Beginner",
    duration: "4 weeks",
    lessons: 18,
    students: 840,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ce?q=80&w=1473&auto=format&fit=crop",
    instructor: {
      name: "Prof. John Smith",
      title: "Organic Agriculture Expert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
    },
    isFree: true,
    featured: true,
    tags: ["Certified", "Eco-friendly"],
  },
  {
    id: 3,
    title: "Tractor & Machinery Operation",
    description: "Safe and efficient operation of modern farm machinery.",
    category: "Machinery Training",
    level: "Beginner",
    duration: "3 weeks",
    lessons: 15,
    students: 560,
    rating: 4.7,
    image: "https://plus.unsplash.com/premium_photo-1680322756568-1f2bd881337d?q=80&w=1471&auto=format&fit=crop",
    instructor: {
      name: "Michael Chen",
      title: "Farm Equipment Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    },
    isFree: false,
    price: 49.99,
    featured: false,
    tags: ["Safety", "Practical"],
  },
  {
    id: 4,
    title: "Smart Irrigation Systems",
    description: "Design and implement efficient irrigation for better water management.",
    category: "Advanced Techniques",
    level: "Advanced",
    duration: "5 weeks",
    lessons: 20,
    students: 320,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1623492704404-9a81e5c92b22?q=80&w=1470&auto=format&fit=crop",
    instructor: {
      name: "Dr. Emily Watson",
      title: "Water Resource Engineer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
    },
    isFree: false,
    price: 39.99,
    featured: true,
    tags: ["Technology", "Water-Saving"],
  },
  {
    id: 5,
    title: "Farm Business Management",
    description: "Learn to manage your farm as a profitable business venture.",
    category: "Business & Marketing",
    level: "Intermediate",
    duration: "8 weeks",
    lessons: 32,
    students: 890,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop",
    instructor: {
      name: "Robert Johnson",
      title: "Agri-business Consultant",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
    },
    isFree: false,
    price: 59.99,
    featured: false,
    tags: ["Business", "Marketing"],
  },
  {
    id: 6,
    title: "Pest Control & Crop Protection",
    description: "Integrated pest management strategies for healthy crops.",
    category: "Farming Basics",
    level: "Beginner",
    duration: "3 weeks",
    lessons: 14,
    students: 450,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1584121396232-22c4f5d9a9f1?q=80&w=1470&auto=format&fit=crop",
    instructor: {
      name: "Dr. Maria Garcia",
      title: "Plant Protection Expert",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1471&auto=format&fit=crop",
    },
    isFree: true,
    featured: false,
    tags: ["Eco-friendly", "Practical"],
  },
];

const Academy = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFree = showFreeOnly ? course.isFree : true;
    return matchesCategory && matchesSearch && matchesFree;
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
                AgroCare Academy
              </div>
              <h1 className="text-3xl font-bold text-[#F1F5F2] sm:text-4xl lg:text-[42px]">
                Learn & <span className="gradient-text">Grow</span>
              </h1>
              <p className="mt-2 text-sm text-[#87968F]">
                {filteredCourses.length} courses available to boost your farming skills
              </p>
            </div>

            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52635B]" />
                <input
                  type="text"
                  placeholder="Search courses..."
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
            {/* View Toggle */}
            <div className="flex rounded-xl border border-white/[0.08] bg-white/[0.035] p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-1.5 transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-[#1D976C]/20 text-[#93F9B9]"
                    : "text-[#52635B] hover:text-[#82918A]"
                }`}
              >
                <BookOpen className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-1.5 transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-[#1D976C]/20 text-[#93F9B9]"
                    : "text-[#52635B] hover:text-[#82918A]"
                }`}
              >
                <Users className="h-4 w-4" />
              </button>
            </div>

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
                      Level
                    </label>
                    <div className="space-y-2">
                      {["Beginner", "Intermediate", "Advanced"].map((level) => (
                        <label key={level} className="flex items-center gap-2 text-sm text-[#82918A]">
                          <input
                            type="checkbox"
                            className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                          />
                          {level}
                        </label>
                      ))}
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
                          checked={showFreeOnly}
                          onChange={() => setShowFreeOnly(!showFreeOnly)}
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        Free Courses Only
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#82918A]">
                        <input
                          type="checkbox"
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        Featured Only
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#82918A]">
                        <input
                          type="checkbox"
                          className="rounded border-white/[0.08] bg-white/[0.035] text-[#1D976C] focus:ring-[#1D976C]/20"
                        />
                        With Certificate
                      </label>
                    </div>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setShowFreeOnly(false);
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

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#1D976C]/10">
              <GraduationCap className="h-10 w-10 text-[#52635B]" />
            </div>
            <h3 className="text-xl font-semibold text-[#F1F5F2]">No courses found</h3>
            <p className="mt-2 text-sm text-[#87968F]">
              Try adjusting your filters or search term
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-4"
            }
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111714]/40 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:border-[#1D976C]/30 hover:shadow-[0_12px_60px_rgba(29,151,108,0.15)] ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <Link href={`/academy/${course.id}`} className="block h-full w-full">
                  <div className={viewMode === "list" ? "flex w-full" : ""}>
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden bg-[#0A110E] ${
                        viewMode === "grid"
                          ? "h-48"
                          : "h-48 w-48 shrink-0 sm:h-56 sm:w-56"
                      }`}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0A110E] to-transparent" />

                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                        {course.isFree && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-500/90 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                            <Sparkles className="h-3 w-3" />
                            Free
                          </span>
                        )}
                        {course.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#1D976C]/90 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                            <Star className="h-3 w-3" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-[#F59E0B] text-[#F59E0B]" />
                        <span className="text-xs font-medium text-white">
                          {course.rating}
                        </span>
                        <span className="text-[10px] text-[#82918A]">
                          ({course.students})
                        </span>
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="rounded-full bg-[#1D976C]/90 p-4 backdrop-blur-sm">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`flex flex-1 flex-col p-4 ${viewMode === "list" ? "justify-center" : ""}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#7D8D86]">
                            {course.category}
                          </span>
                          <h3 className="mt-1 line-clamp-1 text-base font-semibold text-[#F1F5F2] transition-colors group-hover:text-[#93F9B9]">
                            {course.title}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-[#82918A]">
                        {course.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#52635B]">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {course.duration}
                        </div>
                        <span className="h-1 w-1 rounded-full bg-[#52635B]" />
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {course.lessons} lessons
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.06] pt-4">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 overflow-hidden rounded-full bg-[#0A110E]">
                            <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#F1F5F2]">
                              {course.instructor.name}
                            </p>
                            <p className="text-[10px] text-[#52635B]">
                              {course.instructor.title}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          {course.isFree ? (
                            <span className="text-sm font-bold text-[#93F9B9]">Free</span>
                          ) : (
                            <span className="text-sm font-bold text-[#93F9B9]">
                              ${course.price}
                            </span>
                          )}
                          <span className="block text-[10px] text-[#52635B]">per course</span>
                        </div>
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

export default Academy;