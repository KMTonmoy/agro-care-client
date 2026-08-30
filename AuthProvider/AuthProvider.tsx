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
  createUser: (email: string, password: string) => Promise<void>;
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
}

interface UserData {
  email: string;
  name: string;
  photo: string;
  role: string;
  phone?: string;
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

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await saveUser(result.user);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await saveUser(result.user);
      router.push('/');
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await axios.get(`http://localhost:8000/logout`, {
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

  const updateUserProfile = async (name: string, photo: string) => {
    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        });
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

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

  const verifyPhoneOTP = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
      const result = await confirmationResult.confirm(code);
      const user = result.user;
      setUser(user);

      if (user) {
        await saveUser(user);
      }

      router.push('/');
    } catch (error) {
      console.error('Error verifying phone OTP:', error);
      throw error;
    }
  };

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

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  const saveUser = async (user: User) => {
    try {
      const existingUserResponse = await axios.get(
        `http://localhost:8000/users/${user?.email || user?.phoneNumber}`
      );
      const existingUser = existingUserResponse.data;

      if (existingUser) {
        return existingUser;
      }

      const currentUser: UserData = {
        email: user?.email || '',
        name: user?.displayName || '',
        photo: user?.photoURL || '',
        role: 'user',
        phone: user?.phoneNumber || '',
      };
      const { data } = await axios.put(
        `http://localhost:8000/user`,
        currentUser
      );
      return data;
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setTimeout(async () => {
          try {
            await saveUser(currentUser);
          } catch (error) {
            console.error('Error handling auth state change:', error);
          }
        }, 5000);
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
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <div id="recaptcha-container"></div>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;