'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import apiClient from '@/lib/axios';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  name: string;
  user_id: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkAuth: () => Promise<void>;
  setAuthToken: (token: string , role: string , user_id: string) => void;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Public paths that don't need authentication
const publicPaths = ['/', '/signin', '/signup', '/about'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const setAuthToken = (token: string , role: string , user_id: string) => {
    // Set token in cookie (expires in 30 days)
    // console.log("token", token);
    // console.log("role", role);
    Cookies.set('authToken', token, { expires: 1, secure: true });
    Cookies.set('role', role, { expires: 1, secure: true });
    Cookies.set('user_id', user_id, { expires: 1, secure: true });
    // Update axios default headers
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('authToken');

      if (!token) {
        setUser(null);
        return false;
      }
      return true
      // Set token in axios headers
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await apiClient.post('/api/auth/verify');
      
      if (response.data.valid) {
        setUser(response.data.user);
        return true;
      } else {
        setUser(null);
        Cookies.remove('authToken');
        delete apiClient.defaults.headers.common['Authorization'];
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      Cookies.remove('authToken');
      delete apiClient.defaults.headers.common['Authorization'];
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    try {
      // Clear user state first
      setUser(null);

      // Clear all cookies
      Object.keys(Cookies.get()).forEach(cookieName => {
        Cookies.remove(cookieName, { path: '/' }); // Add path to ensure cookie is removed
      });

      // Clear API headers if you're using them
      if (apiClient.defaults.headers.common['Authorization']) {
        delete apiClient.defaults.headers.common['Authorization'];
      }

      // Show success message
      toast.success('Successfully signed out');

      // Navigate to signin page
      await router.replace('/signin');
      
      // Optional: Force reload only if necessary
      window.location.href = '/signin';
    } catch (error) {
      console.error('Signout error:', error);
      toast.error('Error signing out');
    }
  };

  // Check auth on mount and URL changes
  useEffect(() => {
    const handleRouteChange = async () => {
      const isPublicPath = ['/signin', '/signup', '/', '/about'].includes(pathname);
      const isAuthenticated = await checkAuth();

      if (!isPublicPath && !isAuthenticated) {
        router.push(`/`);
      } else if (isPublicPath && isAuthenticated) {
        
      }
    };

    handleRouteChange();
  }, [pathname]);
  return (
    <AuthContext.Provider value={{ user, loading, checkAuth: async () => { await checkAuth(); }, setAuthToken, signout }}>
      {loading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="spinner">Loading...</div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 