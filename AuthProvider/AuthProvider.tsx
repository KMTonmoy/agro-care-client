'use client';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import axios from 'axios';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  sendPhoneOTP: (phoneNumber: string) => Promise<ConfirmationResult>;
  verifyPhoneOTP: (confirmationResult: ConfirmationResult, code: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
  sendOTP: (contact: string, method: 'email' | 'phone') => Promise<void>;
  verifyOTP: (contact: string, otp: string, method: 'email' | 'phone') => Promise<void>;
  registerWithOTP: (name: string, email: string, password: string) => Promise<void>;
}

interface UserData {
  email: string;
  name: string;
  photo: string;
  role: string;
  phone?: string;
  firebaseUid?: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const router = useRouter();

  // Register with email and password (Firebase + MongoDB)
  const createUser = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // 2. Update Firebase profile with name
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: '',
      });

      // 3. Save user to MongoDB via your backend
      await saveUserToBackend({
        ...firebaseUser,
        displayName: name,
      });

      // 4. Send email verification
      await sendEmailVerification(firebaseUser);

      // 5. Update local state with the new user
      const updatedUser = { ...firebaseUser, displayName: name };
      setUser(updatedUser);

      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register with OTP flow (Custom backend + Firebase)
  const registerWithOTP = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // 1. First, register the user in your backend
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Registration failed');
      }

      // 2. If registration successful, also create in Firebase
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // Update Firebase profile with name
        await updateProfile(firebaseUser, {
          displayName: name,
          photoURL: '',
        });

        // Send email verification
        await sendEmailVerification(firebaseUser);

        // Update local state
        const updatedUser = { ...firebaseUser, displayName: name };
        setUser(updatedUser);

        console.log('✅ User created in both MongoDB and Firebase');
      } catch (firebaseError) {
        console.warn('⚠️ User created in MongoDB but failed in Firebase:', firebaseError);
        // Continue - user is already in MongoDB
      }

      router.push('/');
    } catch (error) {
      console.error('Error registering with OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Save user to backend (MongoDB) - Enhanced version
  const saveUserToBackend = async (user: User) => {
    try {
      const userData: UserData = {
        email: user?.email || '',
        name: user?.displayName || 'User',
        photo: user?.photoURL || '',
        role: 'user',
        phone: user?.phoneNumber || '',
        firebaseUid: user?.uid || '',
      };

      const response = await axios.put('http://localhost:8000/api/user', userData);
      console.log('✅ User saved to MongoDB:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error saving user to backend:', error);
      throw error;
    }
  };

  // Login with email (Firebase + MongoDB)
  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Save/update user in MongoDB
      await saveUserToBackend(userCredential.user);
      
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUserToBackend(result.user);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Facebook
  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await saveUserToBackend(result.user);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Send OTP (Custom - via your backend)
  const sendOTP = async (contact: string, method: 'email' | 'phone') => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/send-otp', {
        contact,
        method,
      });

      if (response.data.success) {
        console.log('OTP sent successfully');
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  // Verify OTP (Custom - via your backend)
  const verifyOTP = async (contact: string, otp: string, method: 'email' | 'phone') => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/verify-otp', {
        contact,
        otp,
        method,
      });

      if (response.data.success) {
        console.log('OTP verified successfully');
        return response.data;
      } else {
        throw new Error(response.data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  // Send phone OTP (Firebase)
  const sendPhoneOTP = async (phoneNumber: string): Promise<ConfirmationResult> => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      setConfirmationResult(result);
      return result;
    } catch (error) {
      console.error('Error sending phone OTP:', error);
      throw error;
    }
  };

  // Verify phone OTP (Firebase)
  const verifyPhoneOTP = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      const result = await confirmationResult.confirm(code);
      const user = result.user;
      setUser(user);

      if (user) {
        await saveUserToBackend(user);
      }

      router.push('/');
    } catch (error) {
      console.error('Error verifying phone OTP:', error);
      throw error;
    }
  };

  // Sign in with phone (Firebase)
  const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptcha);
      setConfirmationResult(result);
      return result;
    } catch (error) {
      console.error('Error signing in with phone:', error);
      throw error;
    }
  };

  // Send email verification (Firebase)
  const sendEmailVerificationCode = async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      }
    } catch (error) {
      console.error('Error sending email verification:', error);
      throw error;
    }
  };

  // Reset password (Firebase)
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  // Update user profile (Firebase + MongoDB)
  const updateUserProfile = async (name: string, photo: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
        
        // Update in MongoDB as well
        await saveUserToBackend({
          ...auth.currentUser,
          displayName: name,
          photoURL: photo,
        });
        
        // Update local state
        const updatedUser = { ...auth.currentUser, displayName: name, photoURL: photo };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    try {
      await axios.get('http://localhost:8000/api/auth/logout', {
        withCredentials: true,
      });
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Auth state listener - Sync Firebase user with MongoDB
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          // Auto-save to MongoDB whenever Firebase auth state changes
          await saveUserToBackend(currentUser);
        } catch (error) {
          console.error('Error saving user on auth change:', error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    logOut,
    updateUserProfile,
    sendPhoneOTP,
    verifyPhoneOTP,
    sendEmailVerification: sendEmailVerificationCode,
    resetPassword,
    signInWithPhone,
    sendOTP,
    verifyOTP,
    registerWithOTP,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <div id="recaptcha-container"></div>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;