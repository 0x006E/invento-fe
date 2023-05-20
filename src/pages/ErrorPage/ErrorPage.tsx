import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "./404";
import ServerError from "./ServerError";

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <NotFound />;
  }
  console.error("Unhandled error", error);
  return <ServerError />;
}
