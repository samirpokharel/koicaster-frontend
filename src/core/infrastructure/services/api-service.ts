import axios, { AxiosInstance, AxiosError } from "axios";

export class BaseApiService {
  protected axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      withCredentials: true,
    });

    // Optionally set up interceptors here if needed
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string): Promise<T | null> {
    try {
      const response = await this.axios.get<T>(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async post<T>(url: string, data: unknown): Promise<T | null> {
    try {
      const response = await this.axios.post<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async put<T>(url: string, data: unknown): Promise<T | null> {
    try {
      const response = await this.axios.put<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected async delete<T>(url: string): Promise<T | null> {
    try {
      const response = await this.axios.delete<T>(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  protected handleError(error: unknown): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        `API error occurred: ${
          axiosError.response?.statusText || error.message
        }`
      );
    } else {
      console.error("Unexpected error occurred:", error);
    }
  }
}
