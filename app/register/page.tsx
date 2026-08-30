'use client';

import React, { useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Leaf,
  Sprout,
  ArrowRight,
  Shield,
  Truck,
  Award,
  Smartphone,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { AuthContext } from '@/AuthProvider/AuthProvider';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.892h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const Register = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const canResend = timer <= 0;
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'facebook' | null>(null);
  const [socialError, setSocialError] = useState('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer <= 0) return;
    timerRef.current = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer]);

  const particlePositions = [
    { top: '10%', left: '5%' },
    { top: '20%', left: '85%' },
    { top: '35%', left: '15%' },
    { top: '50%', left: '75%' },
    { top: '65%', left: '25%' },
    { top: '80%', left: '90%' },
    { top: '90%', left: '10%' },
    { top: '15%', left: '45%' },
    { top: '45%', left: '55%' },
    { top: '70%', left: '40%' },
    { top: '30%', left: '95%' },
    { top: '85%', left: '60%' },
    { top: '55%', left: '8%' },
    { top: '5%', left: '65%' },
    { top: '95%', left: '35%' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else if (loginMethod === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrPhone)) {
        newErrors.emailOrPhone = 'Please enter a valid email address';
      }
    } else {
      if (!/^[0-9]{10,15}$/.test(formData.emailOrPhone.replace(/[^0-9]/g, ''))) {
        newErrors.emailOrPhone = 'Please enter a valid phone number';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const detectLoginMethod = (value: string) => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'email';
    } else if (/^[0-9+\-\s]{10,15}$/.test(value.replace(/[^0-9+\-]/g, ''))) {
      return 'phone';
    }
    return loginMethod;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'emailOrPhone') {
      const detected = detectLoginMethod(value);
      setLoginMethod(detected);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const sendOTP = async () => {
    if (!formData.emailOrPhone.trim()) {
      setErrors({ ...errors, emailOrPhone: 'Please enter your email or phone number' });
      return false;
    }

    setIsLoading(true);
    setOtpError('');
    setOtpSuccess('');

    try {
      const payload = {
        contact: formData.emailOrPhone,
        method: loginMethod,
      };

      const response = await axios.post('http://localhost:8000/send-otp', payload);

      if (response.data.success) {
        setIsOtpSent(true);
        setShowOtpInput(true);
        setOtpSuccess('OTP sent successfully!');
        setTimer(60);
        return true;
      } else {
        setOtpError(response.data.message || 'Failed to send OTP');
        return false;
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      setOtpError('Failed to send OTP. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!otpInput || otpInput.length < 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    setOtpError('');
    setOtpSuccess('');

    try {
      const payload = {
        contact: formData.emailOrPhone,
        otp: otpInput,
        method: loginMethod,
      };

      const response = await axios.post('http://localhost:8000/verify-otp', payload);

      if (response.data.success) {
        setOtpSuccess('OTP verified successfully!');
        await registerUser();
      } else {
        setOtpError(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      setOtpError('Failed to verify OTP. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const registerUser = async () => {
    try {
      const payload = {
        name: formData.name,
        contact: formData.emailOrPhone,
        password: formData.password,
        method: loginMethod,
      };

      const response = await axios.post('http://localhost:8000/register', payload);

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setErrors({ submit: response.data.message || 'Registration failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!isOtpSent) {
      const otpSent = await sendOTP();
      if (!otpSent) {
        return;
      }
    } else {
      await verifyOTP();
    }
  };

  const resendOTP = async () => {
    setTimer(60);
    setOtpError('');
    setOtpSuccess('');

    try {
      const payload = {
        contact: formData.emailOrPhone,
        method: loginMethod,
      };

      const response = await axios.post('http://localhost:8000/resend-otp', payload);

      if (response.data.success) {
        setOtpSuccess('OTP resent successfully!');
      } else {
        setOtpError(response.data.message || 'Failed to resend OTP');
        setTimer(0);
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      setOtpError('Failed to resend OTP. Please try again.');
      setTimer(0);
    }
  };

  const handleGoogleSignup = async () => {
    if (!authContext) return;
    setSocialError('');
    setSocialLoading('google');
    try {
      await authContext.signInWithGoogle();
    } catch (error) {
      console.error('Google signup error:', error);
      setSocialError('Google sign in failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleFacebookSignup = async () => {
    if (!authContext) return;
    setSocialError('');
    setSocialLoading('facebook');
    try {
      await authContext.signInWithFacebook();
    } catch (error) {
      console.error('Facebook signup error:', error);
      setSocialError('Facebook sign in failed. Please try again.');
    } finally {
      setSocialLoading(null);
    }
  };

  const trustBadges = [
    { icon: Shield, label: '100% Secure' },
    { icon: Truck, label: 'Free Delivery' },
    { icon: Leaf, label: '100% Organic' },
    { icon: Award, label: 'Growing Community' },
  ];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-[#111714]">
      <div className={cn('mx-4 md:mx-6 lg:mx-8', 'rounded-2xl md:rounded-3xl', 'overflow-hidden', 'relative', 'bg-[#111714]', 'border border-[rgba(255,255,255,0.06)]', 'shadow-[0_8px_40px_rgba(0,0,0,0.45)]')}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#1D976C]/15 via-[#93F9B9]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#93F9B9]/10 via-[#1D976C]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

          {particlePositions.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#93F9B9]/15"
              style={{
                top: pos.top,
                left: pos.left,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 5 + (i % 5) * 1.2,
                repeat: Infinity,
                delay: (i % 4) * 0.8,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="inline-flex items-center gap-2 bg-[#1D976C]/10 border border-[#1D976C]/20 rounded-full px-4 py-1.5">
                    <Sprout className="w-4 h-4 text-[#93F9B9]" />
                    <span className="text-xs font-medium text-[#93F9B9] tracking-wider uppercase">
                      Join AgroCare
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#93F9B9] animate-pulse ml-1" />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1]"
                >
                  <span className="text-[#F1F5F2]">Create your</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#1D976C] via-[#4DCF9A] to-[#93F9B9] bg-clip-text text-transparent">
                    Account
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-lg text-[#A9B5AF] max-w-lg leading-relaxed"
                >
                  Join thousands of farmers and agriculture enthusiasts in
                  building a sustainable future with AgroCare.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex flex-wrap items-center gap-3 text-[#7D8983]"
                >
                  {trustBadges.map((badge, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex items-center gap-1.5">
                        <badge.icon className="w-3.5 h-3.5 text-[#1D976C]" />
                        <span className="text-xs">{badge.label}</span>
                      </div>
                      {idx < trustBadges.length - 1 && (
                        <div className="w-px h-4 bg-[rgba(255,255,255,0.06)]" />
                      )}
                    </React.Fragment>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="glass rounded-2xl p-6 border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#1D976C]/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#93F9B9]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F1F5F2]">Access to Premium Products</p>
                        <p className="text-xs text-[#7D8983]">Get quality agricultural products at best prices</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#1D976C]/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#93F9B9]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F1F5F2]">Expert Guidance</p>
                        <p className="text-xs text-[#7D8983]">Connect with agriculture experts and advisors</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#1D976C]/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 text-[#93F9B9]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#F1F5F2]">Community Support</p>
                        <p className="text-xs text-[#7D8983]">Join a growing community of passionate farmers</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="text-sm text-[#7D8983]"
                >
                  Already have an account?{' '}
                  <Link href="/login" className="text-[#93F9B9] hover:text-[#1D976C] transition-colors font-medium">
                    Sign in instead
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="glass rounded-3xl p-8 border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-xl">
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 rounded-full bg-[#1D976C]/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-10 h-10 text-[#93F9B9]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#F1F5F2] mb-2">Registration Successful!</h3>
                        <p className="text-[#A9B5AF]">Welcome to AgroCare family. Redirecting...</p>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <div>
                          <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                            Full Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52635B]" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe"
                              className={cn(
                                'w-full rounded-xl border bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10',
                                errors.name
                                  ? 'border-red-500/50 focus:border-red-500/50'
                                  : 'border-white/[0.08]'
                              )}
                            />
                          </div>
                          {errors.name && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                            Email or Phone Number
                          </label>
                          <div className="relative">
                            {loginMethod === 'email' ? (
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52635B]" />
                            ) : (
                              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52635B]" />
                            )}
                            <input
                              type="text"
                              name="emailOrPhone"
                              value={formData.emailOrPhone}
                              onChange={handleChange}
                              placeholder="Enter your email or phone number"
                              className={cn(
                                'w-full rounded-xl border bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10',
                                errors.emailOrPhone
                                  ? 'border-red-500/50 focus:border-red-500/50'
                                  : 'border-white/[0.08]'
                              )}
                            />
                          </div>
                          {errors.emailOrPhone && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.emailOrPhone}
                            </p>
                          )}
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-[10px] text-[#52635B]">Detected:</span>
                            <span className={cn(
                              'text-[10px] font-medium px-2 py-0.5 rounded-full',
                              loginMethod === 'email'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-green-500/10 text-green-400'
                            )}>
                              {loginMethod === 'email' ? 'Email' : 'Phone'}
                            </span>
                          </div>
                        </div>

                        <AnimatePresence>
                          {showOtpInput && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div>
                                <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                                  Enter OTP Code
                                </label>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52635B]" />
                                  <input
                                    type="text"
                                    value={otpInput}
                                    onChange={(e) => {
                                      setOtpInput(e.target.value.replace(/\D/g, ''));
                                      setOtpError('');
                                    }}
                                    placeholder="Enter 6-digit OTP"
                                    maxLength={6}
                                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] py-3 pl-10 pr-4 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10"
                                  />
                                </div>
                                {otpError && (
                                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {otpError}
                                  </p>
                                )}
                                {otpSuccess && (
                                  <p className="mt-1 text-xs text-green-400 flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    {otpSuccess}
                                  </p>
                                )}
                                <div className="mt-2 flex items-center justify-between">
                                  <span className="text-xs text-[#7D8983]">
                                    {canResend ? (
                                      <button
                                        type="button"
                                        onClick={resendOTP}
                                        className="text-[#93F9B9] hover:text-[#1D976C] transition-colors"
                                      >
                                        Resend OTP
                                      </button>
                                    ) : (
                                      `Resend in ${timer}s`
                                    )}
                                  </span>
                                  <span className="text-xs text-[#52635B]">
                                    OTP sent to {loginMethod === 'email' ? 'email' : 'phone'}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div>
                          <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52635B]" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="••••••••"
                              className={cn(
                                'w-full rounded-xl border bg-white/[0.035] py-3 pl-10 pr-12 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10',
                                errors.password
                                  ? 'border-red-500/50 focus:border-red-500/50'
                                  : 'border-white/[0.08]'
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52635B] hover:text-[#F1F5F2] transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#F1F5F2] mb-1.5">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52635B]" />
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="••••••••"
                              className={cn(
                                'w-full rounded-xl border bg-white/[0.035] py-3 pl-10 pr-12 text-sm text-[#F1F5F2] placeholder-[#52635B] outline-none backdrop-blur-xl transition-all focus:border-[#1D976C]/40 focus:ring-2 focus:ring-[#1D976C]/10',
                                errors.confirmPassword
                                  ? 'border-red-500/50 focus:border-red-500/50'
                                  : 'border-white/[0.08]'
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52635B] hover:text-[#F1F5F2] transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>

                        {errors.submit && (
                          <p className="text-sm text-red-400 text-center">{errors.submit}</p>
                        )}

                        <Button
                          type="submit"
                          disabled={isLoading || isVerifying}
                          className="w-full bg-gradient-to-r from-[#1D976C] to-[#93F9B9] hover:from-[#167A56] hover:to-[#1D976C] text-[#111714] font-semibold py-6 text-lg rounded-2xl shadow-lg shadow-[#1D976C]/30 hover:shadow-[#1D976C]/50 transition-all duration-300 hover:scale-[1.02] group"
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending OTP...
                            </div>
                          ) : isVerifying ? (
                            <div className="flex items-center gap-3">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Verifying...
                            </div>
                          ) : (
                            <span className="flex items-center gap-2">
                              {showOtpInput ? 'Verify & Register' : 'Continue'}
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                          )}
                        </Button>

                        <div className="flex items-center gap-3">
                          <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
                          <span className="text-xs text-[#7D8983]">Or continue with</span>
                          <div className="h-px flex-1 bg-[rgba(255,255,255,0.08)]" />
                        </div>

                        {socialError && (
                          <p className="text-sm text-red-400 text-center">{socialError}</p>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={handleGoogleSignup}
                            disabled={socialLoading !== null}
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] py-3 px-4 text-sm font-medium text-[#F1F5F2] backdrop-blur-xl transition-all hover:bg-white/[0.06] hover:border-white/[0.15] disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {socialLoading === 'google' ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <GoogleIcon />
                            )}
                            Google
                          </button>

                          <button
                            type="button"
                            onClick={handleFacebookSignup}
                            disabled={socialLoading !== null}
                            className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.035] py-3 px-4 text-sm font-medium text-[#F1F5F2] backdrop-blur-xl transition-all hover:bg-white/[0.06] hover:border-white/[0.15] disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {socialLoading === 'facebook' ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <FacebookIcon />
                            )}
                            Facebook
                          </button>
                        </div>

                        <p className="text-xs text-center text-[#7D8983]">
                          By creating an account, you agree to our{' '}
                          <Link href="/terms" className="text-[#93F9B9] hover:underline">
                            Terms of Service
                          </Link>
                          {' '}and{' '}
                          <Link href="/privacy" className="text-[#93F9B9] hover:underline">
                            Privacy Policy
                          </Link>
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent" />
      </div>
    </section>
  );
};

export default Register;