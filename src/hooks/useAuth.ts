import { User } from "@/interfaces/User.js";
import { apiService } from "@/services/api_service";
import { useEffect, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(true); // Set loading to true initially
  const [user, setUser] = useState<User | null>(null); // Initialize user to null

  const login = () => apiService.loginWithGoogle();
  const logout = () => {
    apiService.logout();
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await apiService.getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, login, logout };
}
