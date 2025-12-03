import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Course } from './types';
import { authAPI } from './services/api';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('krutanic_token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('krutanic_token');
      if (storedToken) {
        try {
          const userData = await authAPI.getProfile(storedToken);
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          console.error("Session expired or invalid");
          localStorage.removeItem('krutanic_token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authAPI.login(email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('krutanic_token', data.token);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authAPI.register(name, email, password);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('krutanic_token', data.token);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('krutanic_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

// --- Cart Context ---
interface CartContextType {
  items: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (course: Course) => {
    if (!items.find(i => i.course.id === course.id)) {
      setItems([...items, { course }]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setItems(items.filter(i => i.course.id !== courseId));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.course.price, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};