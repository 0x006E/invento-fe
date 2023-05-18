import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { OpeningStock } from "../models/OpeningStock";
import { PagedResponse } from "../models/PagedResponse";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing OpeningStocks.
 * @interface
 * @extends BaseService
 */
export interface OpeningStockService extends BaseService {
  /**
   * Retrieves a paged response of OpeningStock items.
   * @param size The number of items per page.
   * @param page The page number.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of OpeningStock items.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof OpeningStock,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<OpeningStock>>>;

  /**
   * Retrieves a list of all OpeningStock items.
   * @returns A promise that resolves to an array of OpeningStock items.
   */
  getAllShort(): Promise<AxiosResponse<OpeningStock[]>>;

  /**
   * Retrieves a specific OpeningStock item by its ID.
   * @param id The ID of the OpeningStock item to retrieve.
   * @returns A promise that resolves to the specified OpeningStock item.
   */
  get(id: string): Promise<AxiosResponse<OpeningStock>>;

  /**
   * Creates a new OpeningStock item.
   * @param data The data for the new OpeningStock item.
   * @returns A promise that resolves to the created OpeningStock item.
   */
  create(
    data: Omit<OpeningStock, "id" | "dayEndId" | "partyType">
  ): Promise<AxiosResponse<OpeningStock>>;

  /**
   * Updates an existing OpeningStock item.
   * @param data The data to update the OpeningStock item with.
   * @returns A promise that resolves to the updated OpeningStock item.
   */
  update(
    data: Pick<OpeningStock, "items" | "id">
  ): Promise<AxiosResponse<OpeningStock>>;

  /**
   * Deletes an OpeningStock item by its ID.
   * @param id The ID of the OpeningStock item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  delete(id: string): Promise<AxiosResponse<void>>;

  /**
   * Filters for OpeningStock items based on the provided parameters.
   * @param size The number of items per page.
   * @param page The page number.
   * @param date The datetime ISO String.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of OpeningStock items matching the date.
   */
  getByDate(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof OpeningStock,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<OpeningStock>>>;
}

export class OpeningStockServiceImpl implements OpeningStockService {
  _axios;
  _endpoint = "/api/stock/opening";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof OpeningStock,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<OpeningStock>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  getAllShort = () => {
    return this._axios.get<OpeningStock[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<OpeningStock>(this._endpoint + `/${id}`);
  };
  create = (
    data: OmitStrict<OpeningStock, "id" | "dayEndId" | "partyType">
  ) => {
    return this._axios.post<OpeningStock>(this._endpoint + "/", data);
  };
  update = (data: Pick<OpeningStock, "items" | "id">) => {
    const { id: openingStockId, items } = data;
    return this._axios.put<OpeningStock>(this._endpoint + `/`, {
      openingStockId,
      items,
    });
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  getByDate = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof OpeningStock,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<OpeningStock>>(
      this._endpoint + `/date`,
      { params: { size, page, query, sortColumn, sortDirection } }
    );
  };
}

export default OpeningStockServiceImpl;
