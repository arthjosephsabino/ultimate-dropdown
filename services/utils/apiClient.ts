import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const apiRequest = async <T>(
  config: AxiosRequestConfig,
  signal?: AbortSignal
): Promise<T> => {
  const finalConfig: AxiosRequestConfig = {
    ...config,
    signal,
  };

  const { data } = await apiClient.request<T>(finalConfig);
  return data;
};

export default apiClient;
