import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { WarehouseWorker } from "../models/WarehouseWorker";
import { BaseService } from "./BaseService";

export interface WarehouseWorkerService extends BaseService {
  get: (id: string) => Promise<AxiosResponse<WarehouseWorker>>;
  create: (
    data: OmitStrict<WarehouseWorker, "id" | "warehouseIds">
  ) => Promise<AxiosResponse<WarehouseWorker>>;
}
export class WarehouseWorkerServiceImpl implements WarehouseWorkerService {
  _axios;
  _endpoint = "/api/employee/warehouse-worker";
  constructor(axios: AxiosInstance) {
    this._axios = axios;
  }
  get = (id: string) => {
    return this._axios.get<WarehouseWorker>(this._endpoint + `/${id}`);
  };
  create = (data: OmitStrict<WarehouseWorker, "id" | "warehouseIds">) => {
    return this._axios.post<WarehouseWorker>(this._endpoint + "/", data);
  };
  update = (_data: OmitStrict<WarehouseWorker, "id">) => {
    throw Error("Not implemented");
  };
  delete = (_id: string) => {
    throw Error("Not implemented");
  };
}
