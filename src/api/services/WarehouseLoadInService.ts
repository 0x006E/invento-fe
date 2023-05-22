import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { PagedResponse } from "../models/PagedResponse";
import { WarehouseLoadIn } from "../models/WarehouseLoadIn";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing WarehouseLoadIns.
 * @interface
 * @extends BaseService
 */
export interface WarehouseLoadInService extends BaseService {
  /**
   * Retrieves a paged response of WarehouseLoadIn items.
   * @param size The number of items per page.
   * @param page The page number.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of WarehouseLoadIn items.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof WarehouseLoadIn,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<WarehouseLoadIn>>>;

  /**
   * Retrieves a list of all WarehouseLoadIn items.
   * @returns A promise that resolves to an array of WarehouseLoadIn items.
   */
  getAllShort(): Promise<AxiosResponse<WarehouseLoadIn[]>>;

  /**
   * Retrieves a specific WarehouseLoadIn item by its ID.
   * @param id The ID of the WarehouseLoadIn item to retrieve.
   * @returns A promise that resolves to the specified WarehouseLoadIn item.
   */
  get(id: string): Promise<AxiosResponse<WarehouseLoadIn>>;

  /**
   * Creates a new WarehouseLoadIn item.
   * @param data The data for the new WarehouseLoadIn item.
   * @returns A promise that resolves to the created WarehouseLoadIn item.
   */
  create(
    data: OmitStrict<WarehouseLoadIn, "id">
  ): Promise<AxiosResponse<WarehouseLoadIn>>;

  /**
   * Updates an existing WarehouseLoadIn item.
   * @param data The data to update the WarehouseLoadIn item with.
   * @returns A promise that resolves to the updated WarehouseLoadIn item.
   */
  update(
    data: OmitStrict<WarehouseLoadIn, "warehouseId">
  ): Promise<AxiosResponse<WarehouseLoadIn>>;

  /**
   * Deletes an WarehouseLoadIn item by its ID.
   * @param id The ID of the WarehouseLoadIn item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  delete(id: string): Promise<AxiosResponse<void>>;

  /**
   * Filters for WarehouseLoadIn items based on the provided parameters.
   * @param size The number of items per page.
   * @param page The page number.
   * @param date The datetime ISO String.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of WarehouseLoadIn items matching the date.
   */
  getByDate(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof WarehouseLoadIn,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<WarehouseLoadIn>>>;
}

export class WarehouseLoadInServiceImpl implements WarehouseLoadInService {
  _axios;
  _endpoint = "/api/warehouse/load-in";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof WarehouseLoadIn,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<WarehouseLoadIn>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  getAllShort = () => {
    return this._axios.get<WarehouseLoadIn[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<WarehouseLoadIn>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<WarehouseLoadIn, "id">) => {
    return this._axios.post<WarehouseLoadIn>(this._endpoint + "/", data);
  };
  update = (data: OmitStrict<WarehouseLoadIn, "warehouseId">) => {
    const {
      id: loadInId,
      products,
      vehicleNumber,
      invoiceNumber,
      dateTime,
    } = data;
    return this._axios.put<WarehouseLoadIn>(this._endpoint + `/`, {
      loadInId,
      products,
      invoiceNumber,
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
    sortColumn: keyof WarehouseLoadIn,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<WarehouseLoadIn>>(
      this._endpoint + `/date`,
      {
        params: { size, page, date: query, sortColumn, sortDirection },
      }
    );
  };
}

export default WarehouseLoadInServiceImpl;
