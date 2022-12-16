import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/404";
import Home from "./pages/Home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
