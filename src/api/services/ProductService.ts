import { AxiosInstance, AxiosResponse } from "axios";
import { PagedResponse } from "../models/PagedResponse";
import { Product } from "../models/Product";
import { BaseService } from "./BaseService";

/**
 * Service interface for CRUD operations on Product objects
 */
export interface ProductService extends BaseService {
  /**
   * Retrieve a paged list of products with the given parameters
   * @param size - The number of items to retrieve in a single page
   * @param page - The page number to retrieve
   * @param sortColumn - The column to sort the results by
   * @param sortDirection - The direction to sort the results by ("asc" or "desc")
   * @returns A promise that resolves to an AxiosResponse containing a PagedResponse of Product objects
   */
  getAll: (
    size: number,
    page: number,
    sortColumn: keyof Product,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Product>>>;

  /**
   * Retrieve a single product by its ID
   * @param id - The ID of the product to retrieve
   * @returns A promise that resolves to an AxiosResponse containing the retrieved Product object
   */
  get: (id: string) => Promise<AxiosResponse<Product>>;

  /**
   * Create a new product with the given data
   * @param data - The data to use for creating the new product
   * @returns A promise that resolves to an AxiosResponse containing the newly created Product object
   */
  create: (data: Omit<Product, "id">) => Promise<AxiosResponse<Product>>;

  /**
   * Update an existing product with the given data
   * @param data - The data to use for updating the product
   * @returns A promise that resolves to an AxiosResponse containing the updated Product object
   */
  update: (data: Product) => Promise<AxiosResponse<Product>>;

  /**
   * Delete a product with the given ID
   * @param id - The ID of the product to delete
   * @returns A promise that resolves to an AxiosResponse with no response data on success
   */
  delete: (id: string) => Promise<AxiosResponse<void>>;

  /**
   * Search for products matching the given query string
   * @param size - The number of items to retrieve in a single page
   * @param page - The page number to retrieve
   * @param query - The query string to search for in the product names
   * @param sortColumn - The column to sort the results by
   * @param sortDirection - The direction to sort the results by ("asc" or "desc")
   * @returns A promise that resolves to an AxiosResponse containing a PagedResponse of Product objects
   */
  search: (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Product,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Product>>>;

  /**
   * Check if a product with the given name already exists
   * @param name - The name to check for uniqueness
   * @returns A promise that resolves to an AxiosResponse containing a boolean indicating whether the name is unique
   */
  isUnique: (name: string) => Promise<AxiosResponse<boolean>>;
}

export class ProductServiceImpl implements ProductService {
  _axios;
  _endpoint = "/api/product";
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof Product,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Product>>(
      this._endpoint +
        `/?size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  get = (id: string) => {
    return this._axios.get(this._endpoint + `/${id}`);
  };
  create = (data: Omit<Product, "id">) => {
    return this._axios.post<Product>(this._endpoint + "/", data);
  };
  update = (data: Product) => {
    return this._axios.put<Product>(this._endpoint + `/`, data);
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Product,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Product>>(
      this._endpoint +
        `/search?name=${query}&size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  isUnique = (name: string) => {
    return this._axios.get<boolean>(this._endpoint + `/name-exists/${name}`);
  };
}

export default ProductServiceImpl;
