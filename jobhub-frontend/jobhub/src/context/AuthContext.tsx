import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authService, type LoginPayload, type RegisterPayload } from '@/api/authService';
import type { AuthUser, UserRole } from '@/types';

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (payload: LoginPayload & { role?: UserRole }) => Promise<AuthUser>;
  register: (payload: RegisterPayload) => Promise<AuthUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'jobhub_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login: AuthContextValue['login'] = async (payload) => {
    const res = await authService.login(payload);
    localStorage.setItem('jobhub_token', res.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  const register: AuthContextValue['register'] = async (payload) => {
    const res = await authService.register(payload);
    localStorage.setItem('jobhub_token', res.token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user));
    setUser(res.user);
    return res.user;
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
