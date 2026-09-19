'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '@/lib/firebase';

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
  isFirebaseActive: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  recallPassById: (passId: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateTasteProfile: (tasteData: NonNullable<UserProfile['tasteProfile']>, passId: string, dialect: string, house: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'fayrouz_active_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and listen to Firebase Auth if configured
  useEffect(() => {
    // First load from localStorage for instant offline access
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load local cached user', e);
    }

    if (!isFirebaseConfigured || !auth || !db) {
      setIsLoading(false);
      return;
    }

    // Subscribe to Firebase Auth state
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && db) {
        const userRef = doc(db, 'users', firebaseUser.uid);

        // Real-time Firestore document listener with offline/error resiliency
        const unsubscribeDoc = onSnapshot(
          userRef,
          async (snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.data();
              const profile: UserProfile = {
                id: firebaseUser.uid,
                name: data.name || firebaseUser.displayName || 'Coffee Enthusiast',
                email: firebaseUser.email || '',
                fayrouzPassId: data.fayrouzPassId || null,
                hasCompletedQuiz: Boolean(data.hasCompletedQuiz),
                assignedDialect: data.assignedDialect || null,
                assignedHouse: data.assignedHouse || null,
                tasteProfile: data.tasteProfile || null,
                createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
              };
              saveUserSession(profile);
            } else {
              // Document doesn't exist yet, initialize it
              const newProfile: UserProfile = {
                id: firebaseUser.uid,
                name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'User'),
                email: firebaseUser.email || '',
                fayrouzPassId: null,
                hasCompletedQuiz: false,
                createdAt: new Date().toISOString(),
              };
              try {
                await setDoc(userRef, {
                  ...newProfile,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                });
              } catch (err) {
                console.warn('Firestore doc creation skipped (offline or pending database):', err);
              }
              saveUserSession(newProfile);
            }
            setIsLoading(false);
          },
          (err) => {
            console.warn('Firestore realtime listener offline or uninitialized, using Auth profile:', err);
            const fallbackProfile: UserProfile = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'User'),
              email: firebaseUser.email || '',
              fayrouzPassId: null,
              hasCompletedQuiz: false,
              createdAt: new Date().toISOString(),
            };
            saveUserSession(fallbackProfile);
            setIsLoading(false);
          }
        );

        return () => unsubscribeDoc();
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribeAuth();
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

    const cleanEmail = email.trim().toLowerCase();

    // If Firebase is configured, use real Firebase Auth
    if (isFirebaseConfigured && auth) {
      try {
        await signInWithEmailAndPassword(auth, cleanEmail, pass);
        return { success: true };
      } catch (err: unknown) {
        const error = err as { code?: string; message?: string };
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          return { success: false, error: 'Invalid email or password.' };
        }
        return { success: false, error: error.message || 'Failed to sign in.' };
      }
    }

    // LocalStorage fallback for demo / offline
    await new Promise((resolve) => setTimeout(resolve, 350));
    const storedUsersJson = localStorage.getItem('fayrouz_registered_users') || '[]';
    const registeredUsers: UserProfile[] = JSON.parse(storedUsersJson);
    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      saveUserSession(existing);
      return { success: true };
    }

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

    const cleanEmail = email.trim().toLowerCase();

    // If Firebase is configured, use real Firebase Auth & Firestore
    if (isFirebaseConfigured && auth && db) {
      try {
        const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
        await updateProfile(cred.user, { displayName: name.trim() });

        // Check if user already took quiz as guest
        const existingGuestProfile = user?.hasCompletedQuiz ? user : null;

        const profileData = {
          name: name.trim(),
          email: cleanEmail,
          fayrouzPassId: existingGuestProfile?.fayrouzPassId || null,
          hasCompletedQuiz: Boolean(existingGuestProfile?.hasCompletedQuiz),
          assignedDialect: existingGuestProfile?.assignedDialect || null,
          assignedHouse: existingGuestProfile?.assignedHouse || null,
          tasteProfile: existingGuestProfile?.tasteProfile || null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(doc(db, 'users', cred.user.uid), profileData);

        return { success: true };
      } catch (err: unknown) {
        const error = err as { code?: string; message?: string };
        if (error.code === 'auth/email-already-in-use') {
          return { success: false, error: 'This email is already registered. Please sign in.' };
        }
        return { success: false, error: error.message || 'Registration failed.' };
      }
    }

    // LocalStorage fallback
    await new Promise((resolve) => setTimeout(resolve, 400));
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      fayrouzPassId: user?.fayrouzPassId || null,
      hasCompletedQuiz: Boolean(user?.hasCompletedQuiz),
      assignedDialect: user?.assignedDialect || null,
      assignedHouse: user?.assignedHouse || null,
      tasteProfile: user?.tasteProfile || null,
      createdAt: new Date().toISOString(),
    };

    const storedUsersJson = localStorage.getItem('fayrouz_registered_users') || '[]';
    const registeredUsers: UserProfile[] = JSON.parse(storedUsersJson);
    registeredUsers.push(newUser);
    localStorage.setItem('fayrouz_registered_users', JSON.stringify(registeredUsers));

    saveUserSession(newUser);
    return { success: true };
  };

  const loginWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        if (res.user) {
          // Attempt non-blocking Firestore user profile sync
          if (db) {
            try {
              const userRef = doc(db, 'users', res.user.uid);
              const existingDoc = await getDoc(userRef);
              if (!existingDoc.exists()) {
                await setDoc(userRef, {
                  name: res.user.displayName || 'Specialty Lover',
                  email: res.user.email || '',
                  fayrouzPassId: user?.fayrouzPassId || null,
                  hasCompletedQuiz: Boolean(user?.hasCompletedQuiz),
                  assignedDialect: user?.assignedDialect || null,
                  assignedHouse: user?.assignedHouse || null,
                  tasteProfile: user?.tasteProfile || null,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                });
              }
            } catch (firestoreErr) {
              console.warn('Firestore doc check failed (offline or pending database creation):', firestoreErr);
            }
          }

          // Immediate session update with authenticated Google user
          const activeUser: UserProfile = {
            id: res.user.uid,
            name: res.user.displayName || (res.user.email ? res.user.email.split('@')[0] : 'Specialty Lover'),
            email: res.user.email || '',
            fayrouzPassId: user?.fayrouzPassId || null,
            hasCompletedQuiz: Boolean(user?.hasCompletedQuiz),
            assignedDialect: user?.assignedDialect || null,
            assignedHouse: user?.assignedHouse || null,
            tasteProfile: user?.tasteProfile || null,
            createdAt: new Date().toISOString(),
          };
          saveUserSession(activeUser);
          return { success: true };
        }
        return { success: true };
      } catch (err: unknown) {
        const error = err as { message?: string };
        return { success: false, error: error.message || 'Google Sign-In failed.' };
      }
    }

    // Demo / Offline fallback
    await new Promise((resolve) => setTimeout(resolve, 400));
    const googleUser: UserProfile = {
      id: `usr_g_${Date.now()}`,
      name: 'Specialty Lover',
      email: 'specialty.lover@gmail.com',
      fayrouzPassId: user?.fayrouzPassId || null,
      hasCompletedQuiz: Boolean(user?.hasCompletedQuiz),
      assignedDialect: user?.assignedDialect || null,
      assignedHouse: user?.assignedHouse || null,
      tasteProfile: user?.tasteProfile || null,
      createdAt: new Date().toISOString(),
    };
    saveUserSession(googleUser);
    return { success: true };
  };

  const logout = async () => {
    if (isFirebaseConfigured && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.warn('Firebase signout error:', err);
      }
    }
    saveUserSession(null);
  };

  const updateTasteProfile = async (
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

    // Sync to Cloud Firestore if online & logged in
    if (isFirebaseConfigured && db && user.id && !user.id.startsWith('usr_')) {
      try {
        const userRef = doc(db, 'users', user.id);
        await updateDoc(userRef, {
          hasCompletedQuiz: true,
          fayrouzPassId: passId,
          assignedDialect: dialect,
          assignedHouse: house,
          tasteProfile: tasteData,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        console.warn('Failed to sync taste profile to Firestore:', err);
      }
    }

    // Also update directory in local storage
    const storedUsersJson = localStorage.getItem('fayrouz_registered_users') || '[]';
    const registeredUsers: UserProfile[] = JSON.parse(storedUsersJson);
    const idx = registeredUsers.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      registeredUsers[idx] = updated;
      localStorage.setItem('fayrouz_registered_users', JSON.stringify(registeredUsers));
    }
  };

  const recallPassById = async (rawInput: string) => {
    const trimmed = rawInput.trim().toUpperCase();
    if (!trimmed) {
      return { success: false, error: 'Please enter your FayrouzPass ID.' };
    }

    // Auto-normalize: if user typed "48291", format to "JO-48291"
    let normalizedId = trimmed;
    if (/^\d{5}$/.test(trimmed)) {
      normalizedId = `JO-${trimmed}`;
    } else if (/^\d{4}$/.test(trimmed)) {
      normalizedId = `FYZ-${trimmed}`;
    } else if (trimmed.startsWith('JO-') || trimmed.startsWith('FYZ-')) {
      normalizedId = trimmed;
    } else if (!trimmed.includes('-') && /^\d+$/.test(trimmed)) {
      normalizedId = `JO-${trimmed.padStart(5, '0').slice(-5)}`;
    }

    // If Firebase is configured, query Firestore by fayrouzPassId
    if (isFirebaseConfigured && db) {
      try {
        const q = query(collection(db, 'users'), where('fayrouzPassId', '==', normalizedId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          const profile: UserProfile = {
            id: docSnap.id,
            name: data.name || 'Fayrouz Member',
            email: data.email || '',
            fayrouzPassId: data.fayrouzPassId || normalizedId,
            hasCompletedQuiz: Boolean(data.hasCompletedQuiz),
            assignedDialect: data.assignedDialect || null,
            assignedHouse: data.assignedHouse || null,
            tasteProfile: data.tasteProfile || null,
            createdAt: data.createdAt ? new Date(data.createdAt.seconds * 1000).toISOString() : new Date().toISOString(),
          };
          saveUserSession(profile);
          return { success: true };
        }
      } catch (err) {
        console.warn('Firestore pass lookup error:', err);
      }
    }

    // Local / Demo lookup
    const storedUsersJson = localStorage.getItem('fayrouz_registered_users') || '[]';
    const registeredUsers: UserProfile[] = JSON.parse(storedUsersJson);
    const existing = registeredUsers.find((u) => u.fayrouzPassId?.toUpperCase() === normalizedId);

    if (existing) {
      saveUserSession(existing);
      return { success: true };
    }

    // Demo recovery profile: allows testing with any Pass ID immediately
    const cleanDisplayId = normalizedId.replace(/^(JO|FYZ)-/, '');
    const recalledGuest: UserProfile = {
      id: `usr_recalled_${Date.now()}`,
      name: `Member ${cleanDisplayId}`,
      email: `${normalizedId.toLowerCase()}@fayrouz.pass`,
      fayrouzPassId: normalizedId,
      hasCompletedQuiz: true,
      assignedDialect: 'المخملي المتوازن (Velvet Balanced)',
      assignedHouse: 'بيت التوازن الكريمي (House of Velvet Balance)',
      tasteProfile: {
        milkPreference: 'oat',
        flavorPreference: 'chocolate_nutty',
        temperature: 'hot',
        intensity: 'balanced',
        dietaryFlags: [],
      },
      createdAt: new Date().toISOString(),
    };
    saveUserSession(recalledGuest);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isFirebaseActive: isFirebaseConfigured,
        login,
        register,
        loginWithGoogle,
        recallPassById,
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
