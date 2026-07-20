import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  avatar?: { url: string };
  isEmailVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Also clear the old keys used previously for UI testing
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (data) => set((state) => {
    if (!state.user) return state;
    const updatedUser = { ...state.user, ...data };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return { user: updatedUser };
  }),

  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  }
}));

// Initialize store from local storage on mount (since this is client side)
export const initAuth = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      try {
        const user = JSON.stringify(userStr);
        useAuthStore.setState({ user: JSON.parse(userStr), token, isAuthenticated: true });
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }
};
