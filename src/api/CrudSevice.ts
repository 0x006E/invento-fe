import axios, { AxiosInstance, AxiosResponse } from "axios";
import { PagedResponse } from "./PagedResponse";

export class CrudService<T> {
  #axiosInstance: AxiosInstance;
  constructor(private url: string) {
    this.#axiosInstance = axios.create({
      baseURL: url,
    });
  }

  async getAll(
    size: number,
    page: number
  ): Promise<AxiosResponse<PagedResponse<T>, any>> {
    const response = await this.#axiosInstance.get<PagedResponse<T>>(
      `/?size=${size}&page=${page}`
    );
    return response;
  }
  async get(id: string): Promise<T> {
    const response = await fetch(`${this.url}/${id}`);
    return response.json();
  }
  async create(data: T): Promise<AxiosResponse<T>> {
    const response = await this.#axiosInstance.post<T>("/", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
  async update(id: string, data: T): Promise<AxiosResponse<T>> {
    const response = await this.#axiosInstance.put<T>(`/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  }
  async delete(id: string): Promise<void> {
    await this.#axiosInstance.delete(`/${id}`, {
      method: "DELETE",
    });
  }
}
