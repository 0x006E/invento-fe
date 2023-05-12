import { AxiosInstance, AxiosPromise } from "axios";
import { OmitStrict } from "../../util";
import { Supplier } from "../models/Supplier";
import { BaseService } from "./BaseService";

/**
 * A service interface for handling supplier data.
 *
 * @interface SupplierService
 * @extends {BaseService}
 */
export interface SupplierService extends BaseService {
  /**
   * Returns a promise that resolves to an array of all suppliers with minimal data.
   *
   * @returns {AxiosPromise<Supplier[]>}
   * @memberof SupplierService
   * @method
   */
  getAllShort: () => AxiosPromise<Supplier[]>;

  /**
   * Returns a promise that resolves to a supplier object with the specified ID.
   *
   * @param {string} id The ID of the supplier to retrieve.
   * @returns {AxiosPromise<Supplier>}
   * @memberof SupplierService
   * @method
   */
  get: (id: string) => AxiosPromise<Supplier>;

  /**
   * Creates a new supplier with the specified data and returns a promise that resolves to the new supplier object.
   *
   * @param {OmitStrict<Supplier, "id">} data The data for the new supplier.
   * @returns {AxiosPromise<Supplier>}
   * @memberof SupplierService
   * @method
   */
  create: (data: OmitStrict<Supplier, "id">) => AxiosPromise<Supplier>;

  /**
   * Updates the specified supplier with the provided data and returns a promise that resolves to the updated supplier object.
   *
   * @param {OmitStrict<Supplier, "id">} data The data to update the supplier with.
   * @returns {AxiosPromise<Supplier>}
   * @memberof SupplierService
   * @method
   */
  update: (data: OmitStrict<Supplier, "id">) => AxiosPromise<Supplier>;
}

export class SupplierServiceImpl implements SupplierService {
  _axios;
  _endpoint = "/api/employee/supplier";
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }

  getAll = (
    _size: number,
    _page: number,
    _sortColumn: keyof Supplier,
    _sortDirection: "asc" | "desc"
  ) => {
    throw Error("Not implemented");
  };
  getAllShort = () => {
    return this._axios.get<Supplier[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<Supplier>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<Supplier, "id">) => {
    return this._axios.post<Supplier>(this._endpoint + "/", data);
  };
  update = (data: OmitStrict<Supplier, "id">) => {
    return this._axios.put<Supplier>(this._endpoint + "/", data);
  };
  delete = (_id: string) => {
    throw Error("Not implemented");
  };
  search = (
    _size: number,
    _page: number,
    _query: string,
    _sortColumn: keyof Supplier,
    _sortDirection: "asc" | "desc"
  ) => {
    throw Error("Not implemented");
  };
}
export default SupplierServiceImpl;
