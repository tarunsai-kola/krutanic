import { MOCK_COURSES } from '../constants';
import { User, Course, CartItem } from '../types';

const API_URL = '/api';

// Helper to handle fetch with timeout and JSON parsing
async function fetchWithTimeout(resource: string, options: RequestInit = {}) {
  const { timeout = 1000 } = options as any;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

// --- Auth API ---
export const authAPI = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Login failed');
      return await res.json();
    } catch (error) {
      console.warn('Backend offline, using mock login');
      // Mock Fallback
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: 'u1',
              name: 'Mock User',
              email,
              role: email.includes('admin') ? 'admin' : 'student',
              enrolledCourses: [],
              avatar: `https://ui-avatars.com/api/?name=${email.includes('admin') ? 'Admin' : 'User'}&background=0D8ABC&color=fff`
            },
            token: 'mock-jwt-token'
          });
        }, 800);
      });
    }
  },

  register: async (name: string, email: string, password: string): Promise<{ user: User; token: string }> => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error('Registration failed');
      return await res.json();
    } catch (error) {
      console.warn('Backend offline, using mock registration');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            user: {
              id: 'u_new_' + Date.now(),
              name,
              email,
              role: 'student',
              enrolledCourses: [],
              avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`
            },
            token: 'mock-jwt-token'
          });
        }, 800);
      });
    }
  },

  getProfile: async (token: string): Promise<User> => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      return await res.json();
    } catch (error) {
      throw error;
    }
  }
};

// --- Courses API ---
export const courseAPI = {
  getAll: async (): Promise<Course[]> => {
    // Using mock courses for development
    console.log('Loading mock courses:', MOCK_COURSES.length, 'courses available');
    return MOCK_COURSES;
  },

  getById: async (id: string): Promise<Course | undefined> => {
    return MOCK_COURSES.find(c => c.id === id);
  }
};

// --- Orders API ---
export const orderAPI = {
  createOrder: async (token: string, items: CartItem[], total: number) => {
    try {
      const res = await fetchWithTimeout(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseIds: items.map(i => i.course.id),
          amount: total
        }),
      });
      if (!res.ok) throw new Error('Order failed');
      return await res.json();
    } catch (error) {
      console.warn('Backend offline, simulating order success');
      return { success: true, message: "Mock order placed" };
    }
  }
};