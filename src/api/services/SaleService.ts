import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { PagedResponse } from "../models/PagedResponse";
import { Sale } from "../models/Sale";
import { BaseService } from "./BaseService";

/**
 * Interface for SaleService.
 * Extends BaseService.
 */
export interface SaleService extends BaseService {
  /**
   * Get all sales.
   * @param size The number of sales to get in one page.
   * @param page The page number of sales.
   * @param sortColumn The column to sort the sales by.
   * @param sortDirection The direction to sort the sales in.
   * @returns A promise that resolves to an AxiosResponse of PagedResponse of Sale.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof Sale,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<Sale>>>;

  /**
   * Get a sale by ID.
   * @param id The ID of the sale to get.
   * @returns A promise that resolves to an AxiosResponse of Sale.
   */
  get(id: string): Promise<AxiosResponse<Sale>>;

  /**
   * Create a new sale.
   * @param data The sale data to create.
   * @returns A promise that resolves to an AxiosResponse of Sale.
   */
  create(
    data: OmitStrict<
      Sale,
      "id" | "invoiceNumber" | "retailSailPrice" | "netAmount" | "paid"
    >
  ): Promise<AxiosResponse<Sale>>;

  /**
   * Update a sale.
   * @param data The sale data to update.
   * @returns A promise that resolves to an AxiosResponse of Sale.
   */
  update(
    data: Pick<Sale, "saleItems" | "id" | "discount">
  ): Promise<AxiosResponse<Sale>>;

  /**
   * Delete a sale by ID.
   * @param id The ID of the sale to delete.
   * @returns A promise that resolves to an AxiosResponse.
   */
  delete(id: string): Promise<AxiosResponse<any>>;

  /**
   * Search for sales.
   * @param size The number of sales to get in one page.
   * @param page The page number of sales.
   * @param query The search query to match the sales against.
   * @param sortColumn The column to sort the sales by.
   * @param sortDirection The direction to sort the sales in.
   * @returns A promise that resolves to an AxiosResponse of PagedResponse of Sale.
   */
  search(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Sale,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<Sale>>>;
}

export class SaleServiceImpl implements SaleService {
  _axios;
  _endpoint = "/api/sale";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof Sale,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Sale>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  get = (id: string) => {
    return this._axios.get<Sale>(this._endpoint + `/id/${id}`);
  };
  create = (
    data: OmitStrict<
      Sale,
      "id" | "invoiceNumber" | "retailSailPrice" | "netAmount" | "paid"
    >
  ) => {
    return this._axios.post<Sale>(this._endpoint + "/", data);
  };
  update = (data: Pick<Sale, "saleItems" | "id" | "discount">) => {
    const { id: saleId, saleItems, discount } = data;
    return this._axios.put<Sale>(this._endpoint + `/`, {
      saleId,
      saleItems,
      discount,
    });
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Sale,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Sale>>(this._endpoint + `/search`, {
      params: {
        size,
        page,
        name: query,
        sortColumn,
        sortDirection,
      },
    });
  };
}

export default SaleServiceImpl;
