import { RouterProvider } from "react-router-dom";
import { setupDependencies } from "./dependencies";
import router from "./routes";

function Index() {
  setupDependencies();
  return <RouterProvider router={router} />;
}

export default Index;
