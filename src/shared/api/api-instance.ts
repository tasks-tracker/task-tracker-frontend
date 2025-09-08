import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const apiInstance = axios.create({
  baseURL: process.env.BASE_API_URL || "http://localhost:8001",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function createInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
}

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
