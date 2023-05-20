import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { PagedResponse } from "../models/PagedResponse";
import { WarehouseLoadOut } from "../models/WarehouseLoadOut";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing WarehouseLoadOuts.
 * @interface
 * @extends BaseService
 */
export interface WarehouseLoadOutService extends BaseService {
  /**
   * Retrieves a paged response of WarehouseLoadOut items.
   * @param size The number of items per page.
   * @param page The page number.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of WarehouseLoadOut items.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof WarehouseLoadOut,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<WarehouseLoadOut>>>;

  /**
   * Retrieves a list of all WarehouseLoadOut items.
   * @returns A promise that resolves to an array of WarehouseLoadOut items.
   */
  getAllShort(): Promise<AxiosResponse<WarehouseLoadOut[]>>;

  /**
   * Retrieves a specific WarehouseLoadOut item by its ID.
   * @param id The ID of the WarehouseLoadOut item to retrieve.
   * @returns A promise that resolves to the specified WarehouseLoadOut item.
   */
  get(id: string): Promise<AxiosResponse<WarehouseLoadOut>>;

  /**
   * Creates a new WarehouseLoadOut item.
   * @param data The data for the new WarehouseLoadOut item.
   * @returns A promise that resolves to the created WarehouseLoadOut item.
   */
  create(
    data: OmitStrict<WarehouseLoadOut, "id">
  ): Promise<AxiosResponse<WarehouseLoadOut>>;

  /**
   * Updates an existing WarehouseLoadOut item.
   * @param data The data to update the WarehouseLoadOut item with.
   * @returns A promise that resolves to the updated WarehouseLoadOut item.
   */
  update(
    data: OmitStrict<WarehouseLoadOut, "warehouseId" | "imageUrl">
  ): Promise<AxiosResponse<WarehouseLoadOut>>;

  /**
   * Deletes an WarehouseLoadOut item by its ID.
   * @param id The ID of the WarehouseLoadOut item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  delete(id: string): Promise<AxiosResponse<void>>;

  /**
   * Filters for WarehouseLoadOut items based on the provided parameters.
   * @param size The number of items per page.
   * @param page The page number.
   * @param date The datetime ISO String.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of WarehouseLoadOut items matching the date.
   */
  getByDate(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof WarehouseLoadOut,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<WarehouseLoadOut>>>;
}

export class WarehouseLoadOutServiceImpl implements WarehouseLoadOutService {
  _axios;
  _endpoint = "/api/warehouse/load-out";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof WarehouseLoadOut,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<WarehouseLoadOut>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  getAllShort = () => {
    return this._axios.get<WarehouseLoadOut[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<WarehouseLoadOut>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<WarehouseLoadOut, "id">) => {
    return this._axios.post<WarehouseLoadOut>(this._endpoint + "/", data);
  };
  update = (data: OmitStrict<WarehouseLoadOut, "warehouseId" | "imageUrl">) => {
    const {
      id: loadOutId,
      products,
      vehicleNumber,
      ervnumber,
      dateTime,
    } = data;
    return this._axios.put<WarehouseLoadOut>(this._endpoint + `/`, {
      loadOutId,
      products,
      ervnumber,
      vehicleNumber,
      dateTime,
    });
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  getByDate = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof WarehouseLoadOut,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<WarehouseLoadOut>>(
      this._endpoint + `/date`,
      {
        params: { size, page, query, sortColumn, sortDirection },
      }
    );
  };
}

export default WarehouseLoadOutServiceImpl;
