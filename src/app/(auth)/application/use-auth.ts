import { create } from "zustand";
import { apiService } from "../infrastructure/auth-service";
import { use, useEffect } from "react";
import type { User } from "../domain/User";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  login: async () => {
    await apiService.loginWithGoogle();
  },
  logout: () => {
    apiService.logout();
    set({ user: null });
  },
  fetchUser: async () => {
    set({ loading: true });
    try {
      const userData = await apiService.getUser();
      set({ user: userData, loading: false });
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export function useAuth() {
  const { user, loading, login, logout, fetchUser } = useAuthStore();
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return { user, loading, login, logout };
}
