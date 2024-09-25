import axios, { type AxiosInstance } from "axios";
import type { User } from "../domain/User";

class AuthService {
  private readonly axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });
  }
  async loginWithGoogle(): Promise<void> {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  }
  async logout(): Promise<void> {
    await this.axios.get("/auth/logout");
  }

  async getUser(): Promise<User | null> {
    try {
      const response = await this.axios.get<User>("/auth/me");
      return response.data;
    } catch (error) {
      return null;
    }
  }
}

export const apiService = new AuthService();
