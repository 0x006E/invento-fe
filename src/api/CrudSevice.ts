import axios from "axios";
import { PagedResponse } from "./PagedResponse";

export function CrudService<T>(url: string) {
  const axiosInstance = axios.create({
    baseURL: url,
  });
  return {
    axiosInstance: axiosInstance,
    url: url,
    getAll: (size: number, page: number) => {
      return axiosInstance.get<PagedResponse<T>>(`/?size=${size}&page=${page}`);
    },
    get: (id: string) => {
      return axiosInstance.get(`/${id}`);
    },
    create: (data: Omit<T, "id">) => {
      return axiosInstance.post<T>("/", data);
    },
    update: (id: string, data: T) => {
      return axiosInstance.put<T>(`/${id}`, data);
    },
    delete: (id: string) => {
      return axiosInstance.delete(`/${id}`);
    },
  };
}
