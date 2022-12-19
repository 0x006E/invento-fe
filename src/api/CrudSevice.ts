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
  getAll = (size: number, page: number) => {
    return this.axiosInstance.get<PagedResponse<T>>(
      `/?size=${size}&page=${page}`
    );
  };
  get = (id: string) => {
    return this.axiosInstance.get(`/${id}`);
  };
  create = (data: Omit<T, "id">) => {
    return this.axiosInstance.post<T>("/", data);
  };
  update = (id: string, data: T) => {
    return this.axiosInstance.put<T>(`/${id}`, data);
  };
  delete = (id: string) => {
    return this.axiosInstance.delete(`/${id}`);
  };
  search = (size: number, page: number, query: string) => {
    return this.axiosInstance.get<PagedResponse<T>>(
      `/search?size=${size}&page=${page}&name=${query}`
    );
  };
}
