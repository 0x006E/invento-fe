import { Navigate, createBrowserRouter } from "react-router-dom";
import Customers from "./pages/Customers/Customers";
import Employees from "./pages/Employees/Employees";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import OpeningStocks from "./pages/OpeningStock/OpeningStocks";
import Products from "./pages/Products/Products";
import Sales from "./pages/Sales/Sales";
import TakeStocks from "./pages/TakeStock/TakeStock";
import Vehicles from "./pages/Vehicles/Vehicles";
import Warehouses from "./pages/Warehouses/Warehouses";

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
      {
        path: "stock/opening",
        element: <OpeningStocks />,
      },
      {
        path: "stock/take",
        element: <TakeStocks />,
      },
    ],
  },
]);

export default router;
