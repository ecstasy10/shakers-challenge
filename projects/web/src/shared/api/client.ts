"use strict";

import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function apiRequest<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  params?: Record<string, any>,
): Promise<T> {
  try {
    const response = await axiosInstance.request<T>({
      url,
      method,
      data: data ? JSON.stringify(data) : undefined,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
