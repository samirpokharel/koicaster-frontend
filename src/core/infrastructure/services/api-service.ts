import axios, { AxiosInstance, AxiosError } from "axios";

export class BaseApiService {
  protected axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  private extractData<T>(response: { success: boolean; data: T }): T | null {
    if (response.success) {
      return response.data;
    }
    console.error("API returned unsuccessful response.");
    return null;
  }

  protected async get<T>(url: string): Promise<T | null> {
    try {
      const response = await this.axios.get<{ success: boolean; data: T }>(url);
      return this.extractData(response.data);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async post<T>(url: string, data: unknown): Promise<T | null> {
    try {
      const response = await this.axios.post<{ success: boolean; data: T }>(
        url,
        data
      );
      return this.extractData(response.data);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async put<T>(url: string, data: unknown): Promise<T | null> {
    try {
      const response = await this.axios.put<{ success: boolean; data: T }>(
        url,
        data
      );
      return this.extractData(response.data);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async delete<T>(url: string): Promise<T | null> {
    try {
      const response = await this.axios.delete<{ success: boolean; data: T }>(
        url
      );
      return this.extractData(response.data);
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        `API error: ${axiosError.response?.statusText || error.message}`
      );
    } else {
      console.error("Unexpected error occurred:", error);
    }
  }
}
