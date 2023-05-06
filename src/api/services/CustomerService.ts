import { AxiosInstance, AxiosResponse } from "axios";
import { Customer } from "../models/Customer";
import { PagedResponse } from "../models/PagedResponse";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing customers.
 * @interface
 * @extends BaseService
 */
export interface CustomerService extends BaseService {
  /**
   * Retrieves a list of customers.
   * @function
   * @async
   * @param {number} size - The number of items to retrieve.
   * @param {number} page - The page number to retrieve.
   * @param {"id" | "name" | "phoneNumber" | "address"} sortColumn - The column to sort by.
   * @param {"asc" | "desc"} sortDirection - The direction to sort in.
   * @returns {Promise<AxiosResponse<PagedResponse<Customer>>>} - A promise that resolves to a response object containing a paged list of customers.
   */
  getAll: (
    size: number,
    page: number,
    sortColumn: "id" | "name" | "phoneNumber" | "address",
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Customer>>>;

  /**
   * Retrieves a customer by ID.
   * @function
   * @async
   * @param {string} id - The ID of the customer to retrieve.
   * @returns {Promise<AxiosResponse<Customer>>} - A promise that resolves to a response object containing the requested customer.
   */
  get: (id: string) => Promise<AxiosResponse<Customer>>;

  /**
   * Creates a new customer.
   * @function
   * @async
   * @param {Omit<Customer, "id">} data - The data for the new customer.
   * @returns {Promise<AxiosResponse<Customer>>} - A promise that resolves to a response object containing the newly created customer.
   */
  create: (data: Omit<Customer, "id">) => Promise<AxiosResponse<Customer>>;

  /**
   * Updates an existing customer.
   * @function
   * @async
   * @param {Customer} data - The updated data for the customer.
   * @returns {Promise<AxiosResponse<Customer>>} - A promise that resolves to a response object containing the updated customer.
   */
  update: (data: Customer) => Promise<AxiosResponse<Customer>>;

  /**
   * Deletes a customer.
   * @function
   * @async
   * @param {string} id - The ID of the customer to delete.
   * @returns {Promise<AxiosResponse<void>>} - A promise that resolves to a response object with no data.
   */
  delete: (id: string) => Promise<AxiosResponse<void>>;

  /**
   * Searches for customers by name.
   * @function
   * @async
   * @param {number} size - The number of items to retrieve.
   * @param {number} page - The page number to retrieve.
   * @param {string} query - The search query.
   * @param {"id" | "name" | "phoneNumber" | "address"} sortColumn - The column to sort by.
   * @param {"asc" | "desc"} sortDirection - The direction to sort in.
   * @returns {Promise<AxiosResponse<PagedResponse<Customer>>>} - A promise that resolves to a response object containing a paged list of customers matching the search query.
   */
  search: (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Customer,
    sortDirection: "asc" | "desc"
  ) => Promise<AxiosResponse<PagedResponse<Customer>>>;

  /**
   * Checks whether a customer with the given phone number already exists.
   * @param number - The phone number to check.
   * @returns A Promise resolving to a boolean indicating whether a customer with the given phone number already exists, or an ErrorResponse if an error occurs.
   */
  isUnique: (number: string) => Promise<AxiosResponse<boolean>>;
}

export class CustomerServiceImpl implements CustomerService {
  _axios;
  _endpoint = "/api/customer";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof Customer,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Customer>>(
      this._endpoint +
        `/?size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  get = (id: string) => {
    return this._axios.get(this._endpoint + `/${id}`);
  };
  create = (data: Omit<Customer, "id">) => {
    return this._axios.post<Customer>(this._endpoint + "/", data);
  };
  update = (data: Customer) => {
    return this._axios.put<Customer>(this._endpoint + `/`, data);
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Customer,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Customer>>(
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

export default CustomerServiceImpl;
