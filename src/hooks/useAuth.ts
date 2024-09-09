import { User } from "@/interfaces/User.js";
import { apiService } from "@/services/api_service";
import { useEffect, useState } from "react";

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => apiService.loginWithGoogle();
  const logout = () => apiService.logout();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await apiService.getUser();
      setUser(userData);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return { user, loading, login, logout };
}
