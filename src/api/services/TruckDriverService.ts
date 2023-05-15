import { AxiosInstance, AxiosPromise } from "axios";
import { OmitStrict } from "../../util";
import { TruckDriver } from "../models/TruckDriver";
import { BaseService } from "./BaseService";

/**
 * Interface for a service that handles truck driver data.
 * @interface
 */
export interface TruckDriverService extends BaseService {
  /**
   * Get a single truck driver by their ID.
   * @function
   * @param {string} id - The ID of the truck driver to retrieve.
   * @returns {AxiosPromise<TruckDriver>} A promise that resolves with the requested truck driver.
   */
  get: (id: string) => AxiosPromise<TruckDriver>;

  /**
   * Create a new truck driver.
   * @function
   * @param {OmitStrict<TruckDriver, "id"|"vehicleIds">} data - The truck driver data to create.
   * @returns {AxiosPromise<TruckDriver>} A promise that resolves with the newly created truck driver.
   */
  create: (
    data: OmitStrict<TruckDriver, "id" | "vehicleIds">
  ) => AxiosPromise<TruckDriver>;
}

export class TruckDriverServiceImpl implements TruckDriverService {
  _axios;
  _endpoint = "/api/employee/truck-driver";
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }
  get = (id: string) => {
    return this._axios.get<TruckDriver>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<TruckDriver, "id" | "vehicleIds">) => {
    return this._axios.post<TruckDriver>(this._endpoint + "/", data);
  };
  update = (_data: OmitStrict<TruckDriver, "id">) => {
    throw Error("Not implemented");
  };
  delete = (_id: string) => {
    throw Error("Not implemented");
  };
}
