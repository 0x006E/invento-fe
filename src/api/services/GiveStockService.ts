import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { GiveStock } from "../models/GiveStock";
import { PagedResponse } from "../models/PagedResponse";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing GiveStocks.
 * @interface
 * @extends BaseService
 */
export interface GiveStockService extends BaseService {
  /**
   * Retrieves a paged response of GiveStock items.
   * @param size The number of items per page.
   * @param page The page number.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of GiveStock items.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof GiveStock,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<GiveStock>>>;

  /**
   * Retrieves a list of all GiveStock items.
   * @returns A promise that resolves to an array of GiveStock items.
   */
  getAllShort(): Promise<AxiosResponse<GiveStock[]>>;

  /**
   * Retrieves a specific GiveStock item by its ID.
   * @param id The ID of the GiveStock item to retrieve.
   * @returns A promise that resolves to the specified GiveStock item.
   */
  get(id: string): Promise<AxiosResponse<GiveStock>>;

  /**
   * Creates a new GiveStock item.
   * @param data The data for the new GiveStock item.
   * @returns A promise that resolves to the created GiveStock item.
   */
  create(
    data: OmitStrict<GiveStock, "id" | "dateTime">
  ): Promise<AxiosResponse<GiveStock>>;

  /**
   * Updates an existing GiveStock item.
   * @param data The data to update the GiveStock item with.
   * @returns A promise that resolves to the updated GiveStock item.
   */
  update(
    data: Pick<GiveStock, "items" | "id" | "fromId" | "fromType">
  ): Promise<AxiosResponse<GiveStock>>;

  /**
   * Deletes an GiveStock item by its ID.
   * @param id The ID of the GiveStock item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  delete(id: string): Promise<AxiosResponse<void>>;

  /**
   * Filters for GiveStock items based on the provided parameters.
   * @param size The number of items per page.
   * @param page The page number.
   * @param date The datetime ISO String.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of GiveStock items matching the date.
   */
  getByDate(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof GiveStock,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<GiveStock>>>;
}

export class GiveStockServiceImpl implements GiveStockService {
  _axios;
  _endpoint = "/api/stock/give";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof GiveStock,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<GiveStock>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  getAllShort = () => {
    return this._axios.get<GiveStock[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<GiveStock>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<GiveStock, "id" | "dateTime">) => {
    return this._axios.post<GiveStock>(this._endpoint + "/", data);
  };
  update = (data: Pick<GiveStock, "items" | "id" | "fromId" | "fromType">) => {
    const { id: giveId, items, fromId, fromType } = data;
    return this._axios.put<GiveStock>(this._endpoint + `/`, {
      giveId,
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
    sortColumn: keyof GiveStock,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<GiveStock>>(this._endpoint + `/date`, {
      params: { size, page, date: query, sortColumn, sortDirection },
    });
  };
}

export default GiveStockServiceImpl;
