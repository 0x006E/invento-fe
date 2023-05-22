import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { PagedResponse } from "../models/PagedResponse";
import { TakeStock } from "../models/TakeStock";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing TakeStocks.
 * @interface
 * @extends BaseService
 */
export interface TakeStockService extends BaseService {
  /**
   * Retrieves a paged response of TakeStock items.
   * @param size The number of items per page.
   * @param page The page number.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of TakeStock items.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof TakeStock,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<TakeStock>>>;

  /**
   * Retrieves a list of all TakeStock items.
   * @returns A promise that resolves to an array of TakeStock items.
   */
  getAllShort(): Promise<AxiosResponse<TakeStock[]>>;

  /**
   * Retrieves a specific TakeStock item by its ID.
   * @param id The ID of the TakeStock item to retrieve.
   * @returns A promise that resolves to the specified TakeStock item.
   */
  get(id: string): Promise<AxiosResponse<TakeStock>>;

  /**
   * Creates a new TakeStock item.
   * @param data The data for the new TakeStock item.
   * @returns A promise that resolves to the created TakeStock item.
   */
  create(
    data: OmitStrict<TakeStock, "id" | "dateTime">
  ): Promise<AxiosResponse<TakeStock>>;

  /**
   * Updates an existing TakeStock item.
   * @param data The data to update the TakeStock item with.
   * @returns A promise that resolves to the updated TakeStock item.
   */
  update(
    data: Pick<TakeStock, "items" | "id" | "fromId" | "fromType">
  ): Promise<AxiosResponse<TakeStock>>;

  /**
   * Deletes an TakeStock item by its ID.
   * @param id The ID of the TakeStock item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  delete(id: string): Promise<AxiosResponse<void>>;

  /**
   * Filters for TakeStock items based on the provided parameters.
   * @param size The number of items per page.
   * @param page The page number.
   * @param date The datetime ISO String.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of TakeStock items matching the date.
   */
  getByDate(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof TakeStock,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<TakeStock>>>;
}

export class TakeStockServiceImpl implements TakeStockService {
  _axios;
  _endpoint = "/api/stock/take";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof TakeStock,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<TakeStock>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  getAllShort = () => {
    return this._axios.get<TakeStock[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<TakeStock>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<TakeStock, "id" | "dateTime">) => {
    return this._axios.post<TakeStock>(this._endpoint + "/", data);
  };
  update = (data: Pick<TakeStock, "items" | "id" | "fromId" | "fromType">) => {
    const { id: takeId, items, fromId, fromType } = data;
    return this._axios.put<TakeStock>(this._endpoint + `/`, {
      takeId,
      items,
      fromId,
      fromType,
    });
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  getByDate = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof TakeStock,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<TakeStock>>(this._endpoint + `/date`, {
      params: { size, page, date: query, sortColumn, sortDirection },
    });
  };
}

export default TakeStockServiceImpl;
