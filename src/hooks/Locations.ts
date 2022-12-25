import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../api/ErrorResponse";
import LocationCrudServiceInstance, { Location } from "../api/Location";
import { PagedResponse } from "../api/PagedResponse";

export default function useLocations(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
    isUnique: iU,
  } = LocationCrudServiceInstance;

  const locations = (
    page: number,
    query = "",
    sortColumn: keyof Location = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Location>, AxiosError<ErrorResponse>>({
      queryKey: ["locations", page, size, query],
      queryFn: async () => {
        if (isQuery) {
          const { data } = await s(
            size,
            page,
            query,
            sortColumn,
            sortDirection
          );
          return data;
        } else {
          const { data } = await gA(size, page, sortColumn, sortDirection);
          return data;
        }
      },
    });
  };

  const location = (id: string) =>
    useQuery<Location, AxiosError<ErrorResponse>>({
      queryKey: ["location", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<Location, AxiosError<ErrorResponse>, Location>(
    async (location) => {
      const { id, ...rest } = location;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<Location, AxiosError<ErrorResponse>, Location>(
    async (location) => {
      if (!location.id) throw new Error("location id is required");
      const { data } = await u(location);
      return data;
    }
  );
  const remove = useMutation<Location, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("location id is required");
      const { data } = await d(id);
      return data;
    }
  );
  const isUnique = useMutation<boolean, AxiosError<ErrorResponse>, string>(
    async (num) => {
      const { data } = await iU(num);
      return data;
    }
  );
  return {
    locations,
    location,
    add,
    update,
    remove,
    isUnique,
  };
}
