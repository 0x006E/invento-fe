import { AxiosInstance, AxiosResponse } from "axios";
import { OmitStrict } from "../../util";
import { Employee, EmployeeRoles } from "../models/Employee";
import { PagedResponse } from "../models/PagedResponse";
import { BaseService } from "./BaseService";
import { OfficeWorkerService } from "./OfficeWorkerService";
import { SupplierService } from "./SupplierService";
import { TruckDriverService } from "./TruckDriverService";
import { WarehouseWorkerService } from "./WarehouseWorkerService";

export interface EmployeeService extends BaseService {
  _supplierService: SupplierService;
  _officeWorkerService: OfficeWorkerService;
  _truckDriverService: TruckDriverService;
  _warehouseWorkerService: WarehouseWorkerService;
  getAll(
    size: number,
    page: number,
    sortColumn: keyof Employee,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<Employee>>>;
  getAllShort(): Promise<AxiosResponse<Employee[]>>;
  get(id: string): Promise<AxiosResponse<Employee>>;
  create(
    data: OmitStrict<Employee, "id">
  ): Promise<AxiosResponse<OmitStrict<Employee, "role">>>;
  update(data: Employee): Promise<AxiosResponse<Employee>>;
  delete(id: string): Promise<AxiosResponse<void>>;
  search(
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Employee,
    sortDirection: "asc" | "desc"
  ): Promise<AxiosResponse<PagedResponse<Employee>>>;
}

export class EmployeeServiceImpl implements EmployeeService {
  _axios;
  _endpoint = "/api/employee";
  _supplierService;
  _officeWorkerService;
  _truckDriverService;
  _warehouseWorkerService;

  constructor(
    axios: AxiosInstance,
    supplierService: SupplierService,
    officerWorkerService: OfficeWorkerService,
    truckDriverService: TruckDriverService,
    warehouseWorkerService: WarehouseWorkerService
  ) {
    this._axios = axios;
    this._supplierService = supplierService;
    this._officeWorkerService = officerWorkerService;
    this._truckDriverService = truckDriverService;
    this._warehouseWorkerService = warehouseWorkerService;
  }

  getAll = (
    size: number,
    page: number,
    sortColumn: keyof Employee,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Employee>>(
      this._endpoint +
        `/?size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
  getAllShort = () => {
    return this._axios.get<Employee[]>(this._endpoint + `/all`);
  };
  get = (id: string) => {
    return this._axios.get<Employee>(this._endpoint + `/${id}`);
  };
  create = ({ role, name }: OmitStrict<Employee, "id">) => {
    switch (role) {
      case EmployeeRoles.OfficeWorker:
        return this._officeWorkerService.create({ name });
      case EmployeeRoles.Supplier:
        return this._supplierService.create({ name });
      case EmployeeRoles.TruckDriver:
        return this._truckDriverService.create({ name });
      case EmployeeRoles.WarehouseWorker:
        return this._warehouseWorkerService.create({ name });
    }
  };
  update = (data: Employee) => {
    return this._axios.put<Employee>(this._endpoint + `/`, data);
  };
  delete = (id: string) => {
    return this._axios.delete(this._endpoint + `/${id}`);
  };
  search = (
    size: number,
    page: number,
    query: string,
    sortColumn: keyof Employee,
    sortDirection: "asc" | "desc"
  ) => {
    return this._axios.get<PagedResponse<Employee>>(
      this._endpoint +
        `/search?name=${query}&size=${size}&page=${page}&sortColumn=${String(
          sortColumn
        )}&sortDirection=${sortDirection}`
    );
  };
}
