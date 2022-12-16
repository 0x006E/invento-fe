import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "./404";
export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <NotFound />;
  }
  return <></>;
}
