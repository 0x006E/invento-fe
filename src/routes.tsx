import { Navigate, createBrowserRouter } from "react-router-dom";
import Customers from "./pages/Customers/Customers";
import Employees from "./pages/Employees/Employees";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import GiveStocks from "./pages/GiveStock/GiveStock";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import OpeningStocks from "./pages/OpeningStock/OpeningStocks";
import Products from "./pages/Products/Products";
import ReplaceDefectives from "./pages/ReplaceDefective/ReplaceDefective";
import SaleReturns from "./pages/SaleReturn/SaleReturn";
import Sales from "./pages/Sales/Sales";
import TakeStocks from "./pages/TakeStock/TakeStock";
import Vehicles from "./pages/Vehicles/Vehicles";
import WarehouseLoadIns from "./pages/WarehouseLoadIn/WarehouseLoadIn";
import WarehouseLoadOuts from "./pages/WarehouseLoadOut/WarehouseLoadOut";
import Warehouses from "./pages/Warehouses/Warehouses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    ErrorBoundary: ErrorPage,
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
      {
        path: "sales/return",
        element: <SaleReturns />,
      },
      {
        path: "sales/replace-defective",
        element: <ReplaceDefectives />,
      },
      {
        path: "stock/opening",
        element: <OpeningStocks />,
      },
      {
        path: "stock/take",
        element: <TakeStocks />,
      },
      {
        path: "stock/give",
        element: <GiveStocks />,
      },
      {
        path: "warehouses",
        element: <Warehouses />,
      },
      {
        path: "warehouses/load-in",
        element: <WarehouseLoadIns />,
      },
      {
        path: "warehouses/load-out",
        element: <WarehouseLoadOuts />,
      },
    ],
  },
]);

export default router;
