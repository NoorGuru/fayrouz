'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  fayrouzPassId?: string | null;
  hasCompletedQuiz: boolean;
  assignedDialect?: string | null;
  assignedHouse?: string | null;
  tasteProfile?: {
    milkPreference: string;
    flavorPreference: string;
    temperature: string;
    intensity: string;
    dietaryFlags: string[];
  } | null;
  createdAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateTasteProfile: (tasteData: NonNullable<UserProfile['tasteProfile']>, passId: string, dialect: string, house: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'fayrouz_active_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load stored user session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUserSession = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string, pass: string) => {
    if (!email || !pass) {
      return { success: false, error: 'Please enter both email and password.' };
    }
    // Simulate auth latency for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Try finding existing users or create profile for demo credentials
    const cleanEmail = email.trim().toLowerCase();
    const storedUsersJson = localStorage.getItem('fayrouz_registered_users') || '[]';
    const registeredUsers: UserProfile[] = JSON.parse(storedUsersJson);
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      saveUserSession(existing);
      return { success: true };
    }

    // Default fast onboarding profile
    const userName = cleanEmail.split('@')[0];
    const loggedUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: cleanEmail,
      fayrouzPassId: null,
      hasCompletedQuiz: false,
      createdAt: new Date().toISOString(),
    };

    saveUserSession(loggedUser);
    return { success: true };
  };

  const register = async (name: string, email: string, pass: string) => {
    if (!name.trim()) return { success: false, error: 'Please provide your name.' };
    if (!email.trim() || !email.includes('@')) return { success: false, error: 'Please provide a valid email.' };
    if (pass.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

    await new Promise((resolve) => setTimeout(resolve, 400));

    const cleanEmail = email.trim().toLowerCase();
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      fayrouzPassId: null,
      hasCompletedQuiz: false,
      createdAt: new Date().toISOString(),
    };

    // Store in registered users directory
    const storedUsersJson = localStorage.getItem('fayrouz_registered_users') || '[]';
    const registeredUsers: UserProfile[] = JSON.parse(storedUsersJson);
    registeredUsers.push(newUser);
    localStorage.setItem('fayrouz_registered_users', JSON.stringify(registeredUsers));

    saveUserSession(newUser);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const googleUser: UserProfile = {
      id: `usr_g_${Date.now()}`,
      name: 'Specialty Lover',
      email: 'specialty.lover@gmail.com',
      fayrouzPassId: null,
      hasCompletedQuiz: false,
      createdAt: new Date().toISOString(),
    };
    saveUserSession(googleUser);
    return { success: true };
  };

  const logout = () => {
    saveUserSession(null);
  };

  const updateTasteProfile = (
    tasteData: NonNullable<UserProfile['tasteProfile']>,
    passId: string,
    dialect: string,
    house: string
  ) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      hasCompletedQuiz: true,
      fayrouzPassId: passId,
      assignedDialect: dialect,
      assignedHouse: house,
      tasteProfile: tasteData,
    };
    saveUserSession(updated);

    // Also update directory
    const storedUsersJson = localStorage.getItem('fayrouz_registered_users') || '[]';
    const registeredUsers: UserProfile[] = JSON.parse(storedUsersJson);
    const idx = registeredUsers.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      registeredUsers[idx] = updated;
      localStorage.setItem('fayrouz_registered_users', JSON.stringify(registeredUsers));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateTasteProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
