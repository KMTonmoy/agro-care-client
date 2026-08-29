"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Leaf,
  Sprout,
  Trees,
  ShoppingBag,
  ArrowUpRight,
  Send,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Products: [
      { name: "Seeds", href: "/products/seeds" },
      { name: "Fertilizers", href: "/products/fertilizers" },
      { name: "Machinery", href: "/products/machinery" },
      { name: "Aquaculture", href: "/products/aquaculture" },
      { name: "Tools & Equipment", href: "/products/tools" },
    ],
    Resources: [
      { name: "Blog & Guides", href: "/blog" },
      { name: "Farming Tips", href: "/blog/tips" },
      { name: "Seasonal Calendar", href: "/calendar" },
      { name: "Success Stories", href: "/stories" },
      { name: "Help Center", href: "/help" },
    ],
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Partners", href: "/partners" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  };

  const socialLinks = [
    { icon: FaFacebook, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

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
    <footer className="relative overflow-hidden bg-transparent border-t border-[rgba(255,255,255,0.06)]">
      {/* Enhanced Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#1D976C]/10 via-[#93F9B9]/5 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#93F9B9]/10 via-[#1D976C]/5 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,_rgba(29,151,108,0.05)_0%,_transparent_70%)] animate-pulse-slow" />

        {/* Floating Particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#93F9B9]/30"
            style={{
              top: pos.top,
              left: pos.left,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.3, 0.7, 0.3],
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
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1D976C] via-[#2BB584] to-[#93F9B9] flex items-center justify-center shadow-lg shadow-[#1D976C]/40">
                      <Sprout className="w-6 h-6 text-[#0A110E]" />
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-br from-[#1D976C] to-[#93F9B9] rounded-2xl opacity-30 blur-2xl"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#93F9B9] rounded-full border-2 border-[#0A110E] animate-pulse" />
                  </motion.div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-2xl font-extrabold tracking-tight">
                      <span className="bg-gradient-to-r from-[#1D976C] via-[#4DCF9A] to-[#93F9B9] bg-clip-text text-transparent">
                        Agro
                      </span>
                      <span className="bg-gradient-to-r from-[#93F9B9] via-[#4DCF9A] to-[#1D976C] bg-clip-text text-transparent">
                        Care
                      </span>
                    </span>
                    <span className="text-[10px] font-medium text-[#93F9B9]/50 tracking-[0.2em] uppercase hidden sm:block">
                      Smart Farming
                    </span>
                  </div>
                </motion.div>
              </Link>

              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#82918A]">
                Empowering farmers with quality agricultural products,
                sustainable solutions, and expert guidance for better harvests.
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm text-[#82918A] transition-colors hover:text-[#93F9B9] group"
                >
                  <Mail className="h-4 w-4 text-[#1D976C] group-hover:text-[#93F9B9] transition-colors" />
                  <a href="mailto:support@agrocare.com">support@agrocare.com</a>
                </motion.div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm text-[#82918A] transition-colors hover:text-[#93F9B9] group"
                >
                  <Phone className="h-4 w-4 text-[#1D976C] group-hover:text-[#93F9B9] transition-colors" />
                  <a href="tel:+8801234567890">+880 1234 567890</a>
                </motion.div>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 text-sm text-[#82918A] transition-colors hover:text-[#93F9B9] group"
                >
                  <MapPin className="h-4 w-4 text-[#1D976C] group-hover:text-[#93F9B9] transition-colors" />
                  <span>Dhaka, Bangladesh</span>
                </motion.div>
              </div>

              {/* Social Links - Enhanced Glass */}
              <div className="mt-8 flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.08] text-[#82918A] backdrop-blur-2xl transition-all duration-300 hover:border-[#1D976C]/50 hover:bg-[#1D976C]/20 hover:text-[#93F9B9] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                {Object.entries(footerLinks).map(([title, links]) => (
                  <div key={title}>
                    <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#93F9B9]">
                      {title}
                    </h4>
                    <ul className="space-y-3">
                      {links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="group flex items-center gap-1.5 text-sm text-[#82918A] transition-all duration-200 hover:text-[#F1F5F2]"
                          >
                            <span className="h-1 w-1 rounded-full bg-[#1D976C] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                            {link.name}
                            <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Section - Enhanced Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 rounded-3xl border border-white/[0.12] bg-white/[0.06] backdrop-blur-2xl shadow-[0_8px_60px_rgba(0,0,0,0.5)] p-8 lg:p-10 hover:border-white/[0.18] transition-all duration-300"
          >
            <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1D976C]/20 to-[#93F9B9]/20 border border-[#1D976C]/30 backdrop-blur-xl"
                >
                  <Leaf className="h-6 w-6 text-[#93F9B9]" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold text-[#F1F5F2]">
                    Stay Updated with AgroCare
                  </h3>
                  <p className="text-sm text-[#82918A]">
                    Get the latest farming tips, product updates, and exclusive offers.
                  </p>
                </div>
              </div>

              <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-white/[0.12] bg-white/[0.08] backdrop-blur-xl px-4 py-3 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none transition-all focus:border-[#1D976C]/60 focus:ring-2 focus:ring-[#1D976C]/20 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] px-6 py-3 text-sm font-semibold text-[#0A110E] transition-all duration-300 hover:shadow-xl hover:shadow-[#1D976C]/30"
                >
                  Subscribe
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Enhanced Glass */}
        <div className="border-t border-white/[0.08] py-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-xs text-[#52635B]">
              © {currentYear} AgroCare. All rights reserved. Made with{" "}
              <span className="text-[#93F9B9] animate-pulse">❤</span> for farmers.
            </p>

            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-xs text-[#52635B] transition-colors hover:text-[#82918A] hover:underline underline-offset-2"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-32 opacity-20">
          <Trees className="h-full w-full text-[#1D976C]/15" />
        </div>
        <div className="pointer-events-none absolute right-0 top-1/2 h-24 w-24 opacity-20">
          <ShoppingBag className="h-full w-full text-[#93F9B9]/15" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -10px) rotate(2deg); }
          66% { transform: translate(-5px, 5px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}