import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { PagedResponse } from "../models/PagedResponse";
import { SaleReturn } from "../models/SaleReturn";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing SaleReturns.
 * @interface
 * @extends BaseService
 */
export interface SaleReturnService extends BaseService {
  /**
   * Retrieves a paged response of SaleReturn items.
   * @param size The number of items per page.
   * @param page The page number.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of SaleReturn items.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof SaleReturn,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<SaleReturn>>>;

  /**
   * Retrieves a specific SaleReturn item by its ID.
   * @param id The ID of the SaleReturn item to retrieve.
   * @returns A promise that resolves to the specified SaleReturn item.
   */
  get(id: string): Promise<AxiosResponse<SaleReturn>>;

  /**
   * Creates a new SaleReturn item.
   * @param data The data for the new SaleReturn item.
   * @returns A promise that resolves to the created SaleReturn item.
   */
  create(
    data: OmitStrict<SaleReturn, "id">
  ): Promise<AxiosResponse<SaleReturn>>;

  /**
   * Updates an existing SaleReturn item.
   * @param data The data to update the SaleReturn item with.
   * @returns A promise that resolves to the updated SaleReturn item.
   */
  update(
    data: Pick<SaleReturn, "id" | "items">
  ): Promise<AxiosResponse<SaleReturn>>;

  /**
   * Deletes an SaleReturn item by its ID.
   * @param id The ID of the SaleReturn item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  delete(id: string): Promise<AxiosResponse<void>>;

  /**
   * Filters for SaleReturn items based on the provided parameters.
   * @param size The number of items per page.
   * @param page The page number.
   * @param date The datetime ISO String.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of SaleReturn items matching the date.
   */
  getByDate(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof SaleReturn,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<SaleReturn>>>;
}

export class SaleReturnServiceImpl implements SaleReturnService {
  _axios;
  _endpoint = "/api/sale-return";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof SaleReturn,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<SaleReturn>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  getAllShort = () => {
    return this._axios.get<SaleReturn[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<SaleReturn>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<SaleReturn, "id">) => {
    return this._axios.post<SaleReturn>(this._endpoint + "/", data);
  };
  update = (data: Pick<SaleReturn, "id" | "items">) => {
    const { id: saleReturnId, items } = data;
    return this._axios.put<SaleReturn>(this._endpoint + `/`, {
      saleReturnId,
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
    sortColumn: keyof SaleReturn,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<SaleReturn>>(
      this._endpoint + `/date`,
      {
        params: { size, page, date: query, sortColumn, sortDirection },
      }
    );
  };
}

export default SaleReturnServiceImpl;
