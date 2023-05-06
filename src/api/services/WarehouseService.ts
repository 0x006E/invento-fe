import { AxiosInstance, AxiosResponse } from "axios";
import { PagedResponse } from "../models/PagedResponse";
import { Warehouse } from "../models/Warehouse";
import { BaseService } from "./BaseService";

/**
 * Interface for WarehouseService, extends BaseService
 * @extends BaseService
 */
export interface WarehouseService extends BaseService {
  /**
   * Get all warehouses with pagination, sorting and filtering
   * @async
   * @param {number} size - The number of warehouses to retrieve in a page
   * @param {number} page - The page of warehouses to retrieve
   * @param {keyof Warehouse} sortColumn - The column to sort the warehouses by
   * @param {"asc" | "desc"} sortDirection - The direction to sort the warehouses by
   * @return {Promise<AxiosResponse<PagedResponse<Warehouse>>>} The warehouses with pagination data
   */
  getAll: (
    size: number,
    page: number,
    sortColumn: keyof Warehouse,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Warehouse>>>;

  /**
   * Get a specific warehouse by ID
   * @async
   * @param {string} id - The ID of the warehouse to retrieve
   * @return {Promise<AxiosResponse<Warehouse>>} The warehouse data
   */
  get: (id: string) => Promise<AxiosResponse<Warehouse>>;

  /**
   * Create a new warehouse
   * @async
   * @param {Omit<Warehouse, "id">} data - The warehouse data to create
   * @return {Promise<AxiosResponse<Warehouse>>} The created warehouse data
   */
  create: (data: Omit<Warehouse, "id">) => Promise<AxiosResponse<Warehouse>>;

  /**
   * Update an existing warehouse
   * @async
   * @param {Warehouse} data - The warehouse data to update
   * @return {Promise<AxiosResponse<Warehouse>>} The updated warehouse data
   */
  update: (data: Warehouse) => Promise<AxiosResponse<Warehouse>>;

  /**
   * Delete an existing warehouse
   * @async
   * @param {string} id - The ID of the warehouse to delete
   * @return {Promise<AxiosResponse<void>>} An empty response on successful deletion
   */
  delete: (id: string) => Promise<AxiosResponse<void>>;

  /**
   * Search for warehouses with pagination, sorting and filtering
   * @async
   * @param {number} size - The number of warehouses to retrieve in a page
   * @param {number} page - The page of warehouses to retrieve
   * @param {string} query - The search query to filter warehouses by name
   * @param {keyof Warehouse} sortColumn - The column to sort the warehouses by
   * @param {"asc" | "desc"} sortDirection - The direction to sort the warehouses by
   * @return {Promise<AxiosResponse<PagedResponse<Warehouse>>>} The warehouses with pagination data
   */
  search: (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Warehouse,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Warehouse>>>;

  /**
   * Check if a warehouse name is unique
   * @async
   * @param {string} name - The name to check for uniqueness
   * @return {Promise<AxiosResponse<boolean>>} A boolean indicating if the name is unique or not
   */
  isUnique: (name: string) => Promise<AxiosResponse<boolean>>;
}
export class WarehouseServiceImpl implements WarehouseService {
  _axios;
  _endpoint = "/api/warehouse";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof Warehouse,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Warehouse>>(
      this._endpoint +
        `/?size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  get = (id: string) => {
    return this._axios.get(this._endpoint + `/${id}`);
  };
  create = (data: Omit<Warehouse, "id">) => {
    return this._axios.post<Warehouse>(this._endpoint + "/", data);
  };
  update = (data: Warehouse) => {
    return this._axios.put<Warehouse>(this._endpoint + `/`, data);
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Warehouse,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Warehouse>>(
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

export default WarehouseServiceImpl;
