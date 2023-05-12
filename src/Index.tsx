import axios from "axios";
import { useContext } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import CustomerServiceImpl, {
  CustomerService,
} from "./api/services/CustomerService";
import {
  EmployeeService,
  EmployeeServiceImpl,
} from "./api/services/EmployeeService";
import LocationServiceImpl, {
  LocationService,
} from "./api/services/LocationService";
import { OfficeWorkerServiceImpl } from "./api/services/OfficeWorkerService";
import ProductServiceImpl, {
  ProductService,
} from "./api/services/ProductService";
import SaleServiceImpl, { SaleService } from "./api/services/SaleService";
import SupplierServiceImpl, {
  SupplierService,
} from "./api/services/SupplierService";
import { TruckDriverServiceImpl } from "./api/services/TruckDriverService";
import VehicleServiceImpl, {
  VehicleService,
} from "./api/services/VehicleService";
import WarehouseServiceImpl, {
  WarehouseService,
} from "./api/services/WarehouseService";
import { WarehouseWorkerServiceImpl } from "./api/services/WarehouseWorkerService";
import Customers from "./pages/Customers/Customers";
import Employees from "./pages/Employees/Employees";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import Products from "./pages/Products/Products";
import Sales from "./pages/Sales/Sales";
import Vehicles from "./pages/Vehicles/Vehicles";
import Warehouses from "./pages/Warehouses/Warehouses";
import dependencyContext from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="products" />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "vehicles",
        element: <Vehicles />,
      },
      {
        path: "warehouses",
        element: <Warehouses />,
      },
      {
        path: "locations",
        element: <Locations />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "sales",
        element: <Sales />,
      },
    ],
  },
]);

function setupDependencies() {
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
}

function Index() {
  setupDependencies();

  return <RouterProvider router={router} />;
}

export default Index;
