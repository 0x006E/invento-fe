import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { PagedResponse } from "../models/PagedResponse";
import { ReplaceDefective } from "../models/ReplaceDefective";
import { BaseService } from "./BaseService";

/**
 * Represents a service for managing ReplaceDefectives.
 * @interface
 * @extends BaseService
 */
export interface ReplaceDefectiveService extends BaseService {
  /**
   * Retrieves a paged response of ReplaceDefective items.
   * @param size The number of items per page.
   * @param page The page number.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of ReplaceDefective items.
   */
  getAll(
    size: number,
    page: number,
    sortColumn: keyof ReplaceDefective,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<ReplaceDefective>>>;

  /**
   * Retrieves a specific ReplaceDefective item by its ID.
   * @param id The ID of the ReplaceDefective item to retrieve.
   * @returns A promise that resolves to the specified ReplaceDefective item.
   */
  get(id: string): Promise<AxiosResponse<ReplaceDefective>>;

  /**
   * Creates a new ReplaceDefective item.
   * @param data The data for the new ReplaceDefective item.
   * @returns A promise that resolves to the created ReplaceDefective item.
   */
  create(
    data: OmitStrict<ReplaceDefective, "id">
  ): Promise<AxiosResponse<ReplaceDefective>>;

  /**
   * Updates an existing ReplaceDefective item.
   * @param data The data to update the ReplaceDefective item with.
   * @returns A promise that resolves to the updated ReplaceDefective item.
   */
  update(
    data: Pick<ReplaceDefective, "id" | "items">
  ): Promise<AxiosResponse<ReplaceDefective>>;

  /**
   * Deletes an ReplaceDefective item by its ID.
   * @param id The ID of the ReplaceDefective item to delete.
   * @returns A promise that resolves when the deletion is successful.
   */
  delete(id: string): Promise<AxiosResponse<void>>;

  /**
   * Filters for ReplaceDefective items based on the provided parameters.
   * @param size The number of items per page.
   * @param page The page number.
   * @param date The datetime ISO String.
   * @param sortColumn The column to sort by.
   * @param sortDirection The sort direction, either "asc" or "desc".
   * @returns A promise that resolves to a PagedResponse of ReplaceDefective items matching the date.
   */
  getByDate(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof ReplaceDefective,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<ReplaceDefective>>>;
}

export class ReplaceDefectiveServiceImpl implements ReplaceDefectiveService {
  _axios;
  _endpoint = "/api/defect-replace";

  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof ReplaceDefective,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<ReplaceDefective>>(this._endpoint, {
      params: { size, page, sortColumn, sortDirection },
    });
  };
  getAllShort = () => {
    return this._axios.get<ReplaceDefective[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<ReplaceDefective>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<ReplaceDefective, "id">) => {
    return this._axios.post<ReplaceDefective>(this._endpoint + "/", data);
  };
  update = (data: Pick<ReplaceDefective, "id" | "items">) => {
    const { id: defectReplaceId, items } = data;
    return this._axios.put<ReplaceDefective>(this._endpoint + `/`, {
      defectReplaceId,
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
    sortColumn: keyof ReplaceDefective,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<ReplaceDefective>>(
      this._endpoint + `/date`,
      {
        params: { size, page, date: query, sortColumn, sortDirection },
      }
    );
  };
}

export default ReplaceDefectiveServiceImpl;
