import axios, { AxiosInstance } from "axios";
import { PagedResponse } from "./PagedResponse";

export class CrudService<T> {
  axiosInstance: AxiosInstance;
  url: string;

  constructor(url: string) {
    this.axiosInstance = axios.create({
      baseURL: url,
    });
    this.url = url;
  }
  getAll = (
    size: number,
    page: number,
    sortColumn: keyof T,
    sortDirection: "asc" | "desc"
  ) => {
    return this.axiosInstance.get<PagedResponse<T>>(
      `/?size=${size}&page=${page}&sortColumn=${String(
        sortColumn
      )}&sortDirection=${sortDirection}`
    );
  };
  get = (id: string) => {
    return this.axiosInstance.get(`/${id}`);
  };
  create = (data: Omit<T, "id">) => {
    return this.axiosInstance.post<T>("/", data);
  };
  update = (data: T) => {
    return this.axiosInstance.put<T>(`/`, data);
  };
  delete = (id: string) => {
    return this.axiosInstance.delete(`/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof T,
    sortDirection: "asc" | "desc"
  ) => {
    return this.axiosInstance.get<PagedResponse<T>>(
      `/search?name=${query}&size=${size}&page=${page}&sortColumn=${String(
        sortColumn
      )}&sortDirection=${sortDirection}`
    );
  };
}
