import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { Location } from "../models/Location";
import { PagedResponse } from "../models/PagedResponse";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing locations.
 * @interface
 * @extends BaseService
 */
export interface LocationService extends BaseService {
  /**
   * Retrieves a list of locations.
   * @function
   * @async
   * @param {number} size - The number of items to retrieve.
   * @param {number} page - The page number to retrieve.
   * @param {keyof Location} sortColumn - The column to sort by.
   * @param {"asc" | "desc"} sortDirection - The direction to sort in.
   * @returns {Promise<AxiosResponse<PagedResponse<Location>>>} - A promise that resolves to a response object containing a paged list of locations.
   */
  getAll: (
    size: number,
    page: number,
    sortColumn: keyof Location,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Location>>>;

  /**
   * Retrieves a location by ID.
   * @function
   * @async
   * @param {string} id - The ID of the location to retrieve.
   * @returns {Promise<AxiosResponse<Location>>} - A promise that resolves to a response object containing the requested location.
   */
  get: (id: string) => Promise<AxiosResponse<Location>>;

  /**
   * Creates a new location.
   * @function
   * @async
   * @param {OmitStrict<Location, "id">} data - The data for the new location.
   * @returns {Promise<AxiosResponse<Location>>} - A promise that resolves to a response object containing the newly created location.
   */
  create: (
    data: OmitStrict<Location, "id">
  ) => Promise<AxiosResponse<Location>>;

  /**
   * Updates an existing location.
   * @function
   * @async
   * @param {Location} data - The updated data for the location.
   * @returns {Promise<AxiosResponse<Location>>} - A promise that resolves to a response object containing the updated location.
   */
  update: (data: Location) => Promise<AxiosResponse<Location>>;

  /**
   * Deletes a location.
   * @function
   * @async
   * @param {string} id - The ID of the location to delete.
   * @returns {Promise<AxiosResponse<void>>} - A promise that resolves to a response object with no data.
   */
  delete: (id: string) => Promise<AxiosResponse<void>>;

  /**
   * Searches for locations by name.
   * @function
   * @async
   * @param {number} size - The number of items to retrieve.
   * @param {number} page - The page number to retrieve.
   * @param {string} query - The search query.
   * @param {"id" | "name"  | "address"} sortColumn - The column to sort by.
   * @param {"asc" | "desc"} sortDirection - The direction to sort in.
   * @returns {Promise<AxiosResponse<PagedResponse<Location>>>} - A promise that resolves to a response object containing a paged list of locations matching the search query.
   */
  search: (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Location,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Location>>>;

  /**
   * Checks whether a location with the given name already exists.
   * @param name - The name to check.
   * @returns A Promise resolving to a boolean indicating whether a location with the given phone number already exists, or an ErrorResponse if an error occurs.
   */
  isUnique: (name: string) => Promise<AxiosResponse<boolean>>;
}

export class LocationServiceImpl implements LocationService {
  _axios;
  _endpoint = "/api/location";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof Location,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Location>>(
      this._endpoint +
        `/?size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  get = (id: string) => {
    return this._axios.get<Location>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<Location, "id">) => {
    return this._axios.post<Location>(this._endpoint + "/", data);
  };
  update = (data: Location) => {
    return this._axios.put<Location>(this._endpoint + `/`, data);
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Location,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Location>>(
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

export default LocationServiceImpl;
