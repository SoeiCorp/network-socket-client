"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
// import { User } from "@/drizzle/schemas/users";
import toast from "react-hot-toast";

type ContextType = {
  userId: number;
  name: string;
};

const defaultContext: ContextType = {
  userId: 0,
  name: "กำลังโหลด...",
};

const AppContext = createContext<ContextType>(defaultContext);

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [context, setContext] = useState<ContextType>(defaultContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const res = await response.json();
          setContext({
            userId: res.data.id,
            name: res.data.name,
          });
        } else {
          throw new Error("Registration failed");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
      }
    };

    fetchData();
  }, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
