"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  X,
  Check,
  Loader2,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { imageUpload } from "@/app/api/utils";

interface HeroImage {
  _id: string;
  src: string;
  alt: string;
  isActive: boolean;
  createdAt: string;
}

const AdminBanner = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchHeroImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/hero/all`);
      if (response.data?.success) {
        setHeroImages(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch hero images:", error);
      toast.error("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setEditingId(null);
    setImageFile(null);
    setImageName("");
    setPreviewUrl(null);
    setUploadProgress(0);
    setIsModalOpen(true);
  };

  const openEditModal = (image: HeroImage) => {
    setIsEditing(true);
    setEditingId(image._id);
    setImageName(image.alt);
    setPreviewUrl(image.src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
    setImageFile(null);
    setImageName("");
    setPreviewUrl(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageName.trim()) {
      toast.error("Please enter image name");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      let imageUrl = previewUrl || "";

      if (imageFile) {
        try {
          setUploadProgress(30);
          imageUrl = await imageUpload(imageFile);
          setUploadProgress(70);
          setPreviewUrl(imageUrl);
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error("Failed to upload image");
          setIsSubmitting(false);
          setUploadProgress(0);
          return;
        }
      }

      setUploadProgress(90);

      if (isEditing && editingId) {
        const response = await axios.put(`${API_URL}/api/hero/${editingId}`, {
          src: imageUrl,
          alt: imageName,
        });
        if (response.data?.success) {
          setUploadProgress(100);
          toast.success("Banner updated!");
          fetchHeroImages();
          closeModal();
        }
      } else {
        if (!imageUrl) {
          toast.error("Please select an image");
          setIsSubmitting(false);
          setUploadProgress(0);
          return;
        }

        const response = await axios.post(`${API_URL}/api/hero`, {
          src: imageUrl,
          alt: imageName,
        });
        if (response.data?.success) {
          setUploadProgress(100);
          toast.success("Banner created!");
          fetchHeroImages();
          closeModal();
        }
      }
    } catch (error) {
      console.error("Failed to save banner:", error);
      toast.error(isEditing ? "Failed to update" : "Failed to create");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this banner?")) return;
    try {
      await axios.delete(`${API_URL}/api/hero/${id}`);
      toast.success("Banner deleted!");
      fetchHeroImages();
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete");
    }
  };

  const toggleActive = async (id: string) => {
    try {
      const response = await axios.patch(`${API_URL}/api/hero/${id}/toggle`);
      if (response.data?.success) {
        toast.success(
          `Banner ${response.data.data.isActive ? "activated" : "deactivated"}`
        );
        fetchHeroImages();
      }
    } catch (error) {
      console.error("Failed to toggle:", error);
      toast.error("Failed to toggle status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-[#1D976C] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#F1F5F2]">
            Banner Management
          </h2>
          <p className="text-[#A9B5AF] mt-1">Manage your homepage banners</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchHeroImages}
            className="p-2 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)] text-[#7D8983] hover:text-[#F1F5F2] transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714] font-medium hover:from-[#167A56] hover:to-[#1D976C] transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add Banner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]">
          <p className="text-2xl font-bold text-[#F1F5F2]">
            {heroImages.length}
          </p>
          <p className="text-sm text-[#7D8983]">Total</p>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]">
          <p className="text-2xl font-bold text-[#93F9B9]">
            {heroImages.filter((img) => img.isActive).length}
          </p>
          <p className="text-sm text-[#7D8983]">Active</p>
        </div>
        <div className="bg-[rgba(255,255,255,0.02)] rounded-2xl p-4 border border-[rgba(255,255,255,0.06)]">
          <p className="text-2xl font-bold text-[#B85C5C]">
            {heroImages.filter((img) => !img.isActive).length}
          </p>
          <p className="text-sm text-[#7D8983]">Inactive</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {heroImages.map((image) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[rgba(255,255,255,0.02)] rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)] hover:border-[#1D976C]/30 transition-all duration-300 group"
            >
              <div className="relative h-44 w-full bg-[#111714]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {!image.isActive && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-xs font-medium px-3 py-1 rounded-full bg-red-500/80">
                      Inactive
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleActive(image._id)}
                    className="p-1.5 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                  >
                    {image.isActive ? (
                      <Eye className="w-4 h-4 text-green-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-[#F1F5F2] truncate flex-1">
                    {image.alt}
                  </p>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEditModal(image)}
                      className="p-1 rounded hover:bg-[rgba(255,255,255,0.05)] text-[#7D8983] hover:text-[#F1F5F2] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="p-1 rounded hover:bg-[rgba(255,255,255,0.05)] text-[#7D8983] hover:text-[#B85C5C] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1f1d] rounded-2xl border border-[rgba(255,255,255,0.06)] max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#F1F5F2]">
                  {isEditing ? "Edit Banner" : "Add Banner"}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#7D8983] hover:text-[#F1F5F2] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                    Image
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative h-48 w-full rounded-xl border-2 border-dashed border-[rgba(255,255,255,0.1)] hover:border-[#1D976C]/40 transition-all cursor-pointer overflow-hidden bg-[rgba(255,255,255,0.02)]"
                  >
                    {previewUrl ? (
                      <>
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewUrl(null);
                            setImageFile(null);
                            setImageName("");
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="absolute top-2 right-2 p-1 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-[#7D8983]">
                        <Upload className="w-10 h-10 mb-2" />
                        <p className="text-sm">Click to upload image</p>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#1D976C] to-[#93F9B9]"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                    Image Name <span className="text-[#B85C5C]">*</span>
                  </label>
                  <input
                    type="text"
                    value={imageName}
                    onChange={(e) => setImageName(e.target.value)}
                    placeholder="Enter image name"
                    className="w-full rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] px-4 py-2.5 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none focus:border-[#1D976C]/40 transition-all duration-300"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.06)] text-[#A9B5AF] hover:text-[#F1F5F2] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#1D976C] to-[#93F9B9] text-[#111714] font-medium hover:from-[#167A56] hover:to-[#1D976C] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {uploadProgress > 0 ? "Uploading..." : "Saving..."}
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        {isEditing ? "Update" : "Create"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBanner;