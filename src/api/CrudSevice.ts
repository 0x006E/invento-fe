import { PagedResponse } from "./PagedResponse";

export class CrudService<T> {
  constructor(private url: string) {}

  async getAll(): Promise<PagedResponse<T>> {
    const response = await fetch(this.url);
    return response.json();
  }
  async get(id: string): Promise<T> {
    const response = await fetch(`${this.url}/${id}`);
    return response.json();
  }
  async create(data: T): Promise<T> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async update(id: string, data: T): Promise<T> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  async delete(id: string): Promise<void> {
    await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
  }
}
