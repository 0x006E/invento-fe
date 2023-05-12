import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { OfficeWorker } from "../models/OfficeWorker";
import { BaseService } from "./BaseService";

/**
 * OfficeWorkerService interface for handling CRUD operations related to office workers
 * @interface
 * @extends BaseService
 */
export interface OfficeWorkerService extends BaseService {
  /**
   * Get an office worker by ID
   * @function
   * @param {string} id - The ID of the office worker to retrieve
   * @returns {Promise<AxiosResponse<OfficeWorker>>} - A promise that resolves with the retrieved office worker
   */
  get: (id: string) => Promise<AxiosResponse<OfficeWorker>>;

  /**
   * Create a new office worker
   * @function
   * @param {OmitStrict<OfficeWorker, "id">} data - The data of the office worker to create
   * @returns {Promise<AxiosResponse<OfficeWorker>>} - A promise that resolves with the created office worker
   */
  create: (
    data: OmitStrict<OfficeWorker, "id">
  ) => Promise<AxiosResponse<OfficeWorker>>;
}

export class OfficeWorkerServiceImpl implements OfficeWorkerService {
  _axios;
  _endpoint = "/api/employee/office-worker";
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }
  get = (id: string) => {
    return this._axios.get<OfficeWorker>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<OfficeWorker, "id">) => {
    return this._axios.post<OfficeWorker>(this._endpoint + "/", data);
  };
  update = (_data: OmitStrict<OfficeWorker, "id">) => {
    throw Error("Not implemented");
  };
  delete = (_id: string) => {
    throw Error("Not implemented");
  };
}
