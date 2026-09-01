"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "@/AuthProvider/AuthProvider";

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  photo: string;
  isVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UseUserReturn {
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUser = (): UseUserReturn => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.email) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const email = encodeURIComponent(user.email);

        const response = await axios.get(
          `http://localhost:8000/api/user/email/${email}`
        );

        if (response.data?.success) {
          setUserData(response.data.data);
        } else {
          setUserData(null);
          setError("Failed to fetch user data");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setUserData(null);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.email, refresh]);

  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };

  return {
    userData,
    loading,
    error,
    refetch,
  };
};