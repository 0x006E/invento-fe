import { AxiosInstance, AxiosResponse } from "axios";
import { PagedResponse } from "../models/PagedResponse";
import { Vehicle } from "../models/Vehicle";
import { BaseService } from "./BaseService";

/**
 * The VehicleService interface extends the BaseService interface and defines methods
 * for performing CRUD operations and searching for Vehicle entities.
 * @interface
 * @extends BaseService
 */
export interface VehicleService extends BaseService {
  /**
   * Retrieves a paginated list of vehicles.
   * @function
   * @param {number} size - The number of items per page.
   * @param {number} page - The page number to retrieve.
   * @param {keyof Vehicle} sortColumn - The column to sort by.
   * @param {"asc" | "desc"} sortDirection - The sort direction.
   * @returns {Promise<AxiosResponse<PagedResponse<Vehicle>>>} - A Promise that resolves with the paginated response of vehicles.
   */
  getAll: (
    size: number,
    page: number,
    sortColumn: keyof Vehicle,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Vehicle>>>;

  /**
   * Retrieves a single vehicle entity.
   * @function
   * @param {string} id - The ID of the vehicle to retrieve.
   * @returns {Promise<AxiosResponse<Vehicle>>} - A Promise that resolves with the vehicle entity.
   */
  get: (id: string) => Promise<AxiosResponse<Vehicle>>;

  /**
   * Creates a new vehicle entity.
   * @function
   * @param {Omit<Vehicle, "id">} data - The vehicle entity to create.
   * @returns {Promise<AxiosResponse<Vehicle>>} - A Promise that resolves with the created vehicle entity.
   */
  create: (data: Omit<Vehicle, "id">) => Promise<AxiosResponse<Vehicle>>;

  /**
   * Updates an existing vehicle entity.
   * @function
   * @param {Vehicle} data - The vehicle entity to update.
   * @returns {Promise<AxiosResponse<Vehicle>>} - A Promise that resolves with the updated vehicle entity.
   */
  update: (data: Vehicle) => Promise<AxiosResponse<Vehicle>>;

  /**
   * Deletes an existing vehicle entity.
   * @function
   * @param {string} id - The ID of the vehicle entity to delete.
   * @returns {Promise<AxiosResponse<void>>} - A Promise that resolves when the delete operation completes.
   */
  delete: (id: string) => Promise<AxiosResponse<void>>;

  /**
   * Searches for vehicle entities that match the specified query.
   * @function
   * @param {number} size - The number of items per page.
   * @param {number} page - The page number to retrieve.
   * @param {string} query - The query string to search for.
   * @param {keyof Vehicle} sortColumn - The column to sort by.
   * @param {"asc" | "desc"} sortDirection - The sort direction.
   * @returns {Promise<AxiosResponse<PagedResponse<Vehicle>>>} - A Promise that resolves with the paginated response of matching vehicle entities.
   */
  search: (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Vehicle,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Vehicle>>>;

  /**
   * Checks whether a vehicle with the given number already exists in the database.
   *
   * @param {string} number The number to check for uniqueness.
   * @returns {Promise<AxiosResponse<boolean>>} A Promise that resolves to a boolean indicating whether the number is unique or not.
   */
  isUnique: (number: string) => Promise<AxiosResponse<boolean>>;
}

export class VehicleServiceImpl implements VehicleService {
  _axios;
  _endpoint = "/api/vehicle";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof Vehicle,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Vehicle>>(
      this._endpoint +
        `/?size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  get = (id: string) => {
    return this._axios.get(this._endpoint + `/${id}`);
  };
  create = (data: Omit<Vehicle, "id">) => {
    return this._axios.post<Vehicle>(this._endpoint + "/", data);
  };
  update = (data: Vehicle) => {
    return this._axios.put<Vehicle>(this._endpoint + `/`, data);
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Vehicle,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Vehicle>>(
      this._endpoint +
        `/search?name=${query}&size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  isUnique = (number: string) => {
    return this._axios.get<boolean>(
      this._endpoint + `/number-exists/${number}`
    );
  };
}

export default VehicleServiceImpl;
