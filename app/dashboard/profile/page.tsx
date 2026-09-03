"use client";

import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle,
  AlertCircle,
  Loader2,
  LogOut,
  ShoppingBag,
  Package,
  Heart,
  Settings,
  Shield,
  Award,
  Leaf,
  Truck,
  Clock,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
  const { user, loading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  // Stats data
  const stats = [
    { label: "Total Orders", value: "24", icon: ShoppingBag, color: "from-[#1D976C] to-[#93F9B9]" },
    { label: "Products", value: "156", icon: Package, color: "from-[#4DCF9A] to-[#2BB584]" },
    { label: "Wishlist", value: "12", icon: Heart, color: "from-[#F59E0B] to-[#FCD34D]" },
    { label: "Reviews", value: "8", icon: Award, color: "from-[#1D976C] to-[#93F9B9]" },
  ];

  // Activity data
  const activities = [
    { action: "Ordered Organic Compost", time: "2 hours ago", icon: Package },
    { action: "Added to wishlist: Power Tiller", time: "5 hours ago", icon: Heart },
    { action: "Reviewed: Hybrid Paddy Seeds", time: "1 day ago", icon: Star },
    { action: "Ordered NPK Fertilizer", time: "3 days ago", icon: ShoppingBag },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSaved(true);
    setIsEditing(false);
    setIsSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#1D976C] animate-spin" />
          <p className="text-[#A9B5AF]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-[#F1F5F2]">Profile</h2>
          <p className="text-[#A9B5AF] mt-1">Manage your personal information and preferences</p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(255,255,255,0.15)] text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714] font-medium hover:from-[#167A56] hover:to-[#1D976C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </motion.div>

      {/* Success Toast */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Profile updated successfully!</span>
        </motion.div>
      )}

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-gradient-to-r from-[#1D976C]/10 to-[#93F9B9]/10 rounded-2xl p-6 border border-[rgba(255,255,255,0.06)]"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#1D976C] to-[#93F9B9] flex items-center justify-center shadow-lg shadow-[#1D976C]/30">
              <span className="text-3xl font-bold text-[#111714]">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-[#1D976C] text-[#111714] hover:bg-[#167A56] transition-all duration-300 shadow-lg"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-bold text-[#F1F5F2]">
                {user?.name || "User"}
              </h3>
              {user?.role === "admin" && (
                <span className="text-xs font-medium text-[#93F9B9] bg-[#1D976C]/20 px-3 py-1 rounded-full flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              )}
              {user?.isVerified && (
                <span className="text-xs font-medium text-green-400 bg-green-400/10 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <p className="text-[#A9B5AF] mt-1 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#7D8983]" />
              {user?.email || "No email"}
            </p>
            <p className="text-[#7D8983] mt-0.5 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#7D8983]" />
              Joined {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300">
              <Truck className="w-4 h-4" />
              Orders
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300">
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-[#111714]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#F1F5F2]">{stat.value}</p>
                <p className="text-xs text-[#7D8983]">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Form */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-6 border border-[rgba(255,255,255,0.06)] space-y-4">
            <h4 className="text-lg font-semibold text-[#F1F5F2]">Edit Profile</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || user?.name || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-4 py-2.5 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none focus:border-[#1D976C]/40 transition-all duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || user?.email || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-4 py-2.5 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none focus:border-[#1D976C]/40 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || user?.phone || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-4 py-2.5 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none focus:border-[#1D976C]/40 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-4 py-2.5 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none focus:border-[#1D976C]/40 transition-all duration-300"
                  placeholder="Enter your address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-4 py-2.5 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none focus:border-[#1D976C]/40 transition-all duration-300 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-[rgba(255,255,255,0.02)] rounded-2xl border border-[rgba(255,255,255,0.06)] overflow-hidden"
      >
        <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#1D976C]" />
            <h3 className="text-lg font-semibold text-[#F1F5F2]">Recent Activity</h3>
          </div>
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.04)]">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
              className="flex items-center gap-4 p-4 hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1D976C]/10 flex items-center justify-center">
                <activity.icon className="w-5 h-5 text-[#93F9B9]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#F1F5F2]">{activity.action}</p>
                <p className="text-xs text-[#7D8983]">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;