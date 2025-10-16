'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Language } from './types';
import { users } from './data';
import { translations } from './translations';

// --- Language Context ---
type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: keyof typeof translations): string => {
    return translations[key]?.[lang] || (translations[key]?.['en'] ?? String(key));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};

// --- Auth Context ---
type AuthContextType = {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('agri-connect-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string) => {
    // First check registered users in localStorage
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('agri-connect-users') || '[]');
      const foundUser = registeredUsers.find((u: User) => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('agri-connect-user', JSON.stringify(foundUser));
        return true;
      }
    } catch (error) {
      console.error("Failed to load registered users", error);
    }
    
    // Fallback to default users
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('agri-connect-user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agri-connect-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// --- App Providers Wrapper ---
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  );
};
