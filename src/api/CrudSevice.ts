import axios, { AxiosInstance } from "axios";
import { PagedResponse } from "./PagedResponse";

export class CrudService<T> {
  #axiosInstance: AxiosInstance;
  constructor(private url: string) {
    this.#axiosInstance = axios.create({
      baseURL: url,
    });
  }

  getAll(size: number, page: number) {
    return this.#axiosInstance.get<PagedResponse<T>>(
      `/?size=${size}&page=${page}`
    );
  }
  get(id: string) {
    return this.#axiosInstance.get(`${this.url}/${id}`);
  }
  create(data: T) {
    return this.#axiosInstance.post<T>("/", data);
  }
  update(id: string, data: T) {
    return this.#axiosInstance.put<T>(`/${id}`, data);
  }
  delete(id: string) {
    return this.#axiosInstance.delete(`/${id}`);
  }
}
