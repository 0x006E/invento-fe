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
import LocationServiceImpl, {
  LocationService,
} from "./api/services/LocationService";
import ProductServiceImpl, {
  ProductService,
} from "./api/services/ProductService";
import VehicleServiceImpl, {
  VehicleService,
} from "./api/services/VehicleService";
import WarehouseServiceImpl, {
  WarehouseService,
} from "./api/services/WarehouseService";
import Customers from "./pages/Customers/Customers";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import Products from "./pages/Products/Products";
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

  const context = useContext(dependencyContext);
  context.registerDependency<ProductService>("productService", ProductService);
  context.registerDependency<LocationService>(
    "locationService",
    LocationService
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
}

function Index() {
  setupDependencies();

  return <RouterProvider router={router} />;
}

export default Index;
