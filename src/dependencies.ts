import axios from "axios";
import { useContext } from "react";
import {
  CustomerService,
  CustomerServiceImpl,
  EmployeeService,
  EmployeeServiceImpl,
  GiveStockService,
  GiveStockServiceImpl,
  LocationService,
  LocationServiceImpl,
  OfficeWorkerServiceImpl,
  OpeningStockService,
  OpeningStockServiceImpl,
  ProductService,
  ProductServiceImpl,
  SaleReturnService,
  SaleReturnServiceImpl,
  SaleService,
  SaleServiceImpl,
  SupplierService,
  SupplierServiceImpl,
  TakeStockService,
  TakeStockServiceImpl,
  TruckDriverServiceImpl,
  VehicleService,
  VehicleServiceImpl,
  WarehouseLoadInService,
  WarehouseLoadInServiceImpl,
  WarehouseLoadOutService,
  WarehouseLoadOutServiceImpl,
  WarehouseService,
  WarehouseServiceImpl,
  WarehouseWorkerServiceImpl,
} from "./api/services";
import dependencyContext from "./store";

export function setupDependencies() {
  const axiosInstance = axios.create({
    baseURL: "/",
  });
  const CustomerService = new CustomerServiceImpl(axiosInstance);
  const LocationService = new LocationServiceImpl(axiosInstance);
  const VehicleService = new VehicleServiceImpl(axiosInstance);
  const ProductService = new ProductServiceImpl(axiosInstance);
  const WarehouseService = new WarehouseServiceImpl(axiosInstance);
  const SupplierService = new SupplierServiceImpl(axiosInstance);
  const OfficeWorkerService = new OfficeWorkerServiceImpl(axiosInstance);
  const WarehouseWorkerService = new WarehouseWorkerServiceImpl(axiosInstance);
  const TruckDriverService = new TruckDriverServiceImpl(axiosInstance);
  const SaleService = new SaleServiceImpl(axiosInstance);
  const OpeningStockService = new OpeningStockServiceImpl(axiosInstance);
  const TakeStockService = new TakeStockServiceImpl(axiosInstance);
  const GiveStockService = new GiveStockServiceImpl(axiosInstance);
  const SaleReturnService = new SaleReturnServiceImpl(axiosInstance);
  const WarehouseLoadInService = new WarehouseLoadInServiceImpl(axiosInstance);
  const WarehouseLoadOutService = new WarehouseLoadOutServiceImpl(
    axiosInstance
  );
  const EmployeeService = new EmployeeServiceImpl(
    axiosInstance,
    SupplierService,
    OfficeWorkerService,
    TruckDriverService,
    WarehouseWorkerService
  );

  const context = useContext(dependencyContext);
  context.registerDependency<ProductService>("productService", ProductService);
  context.registerDependency<LocationService>(
    "locationService",
    LocationService
  );
  context.registerDependency<EmployeeService>(
    "employeeService",
    EmployeeService
  );
  context.registerDependency<VehicleService>("vehicleService", VehicleService);
  context.registerDependency<WarehouseService>(
    "warehouseService",
    WarehouseService
  );
  context.registerDependency<CustomerService>(
    "customerService",
    CustomerService
  );
  context.registerDependency<SaleService>("saleService", SaleService);
  context.registerDependency<SupplierService>(
    "supplierService",
    SupplierService
  );
  context.registerDependency<OpeningStockService>(
    "openingStockService",
    OpeningStockService
  );
  context.registerDependency<TakeStockService>(
    "takeStockService",
    TakeStockService
  );
  context.registerDependency<GiveStockService>(
    "giveStockService",
    GiveStockService
  );
  context.registerDependency<WarehouseLoadInService>(
    "warehouseLoadInService",
    WarehouseLoadInService
  );
  context.registerDependency<WarehouseLoadOutService>(
    "warehouseLoadOutService",
    WarehouseLoadOutService
  );
  context.registerDependency<SaleReturnService>(
    "saleReturnService",
    SaleReturnService
  );
}
