import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../api/ErrorResponse";
import { PagedResponse } from "../api/PagedResponse";
import WarehouseCrudServiceInstance, { Warehouse } from "../api/Warehouse";

export default function useWarehouses(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
    isUnique: iU,
  } = WarehouseCrudServiceInstance;

  const warehouses = (
    page: number,
    query = "",
    sortColumn: keyof Warehouse = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Warehouse>, AxiosError<ErrorResponse>>({
      queryKey: ["warehouses", page, size, query],
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

  const warehouse = (id: string) =>
    useQuery<Warehouse, AxiosError<ErrorResponse>>({
      queryKey: ["warehouse", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<Warehouse, AxiosError<ErrorResponse>, Warehouse>(
    async (warehouse) => {
      const { id, ...rest } = warehouse;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<Warehouse, AxiosError<ErrorResponse>, Warehouse>(
    async (warehouse) => {
      if (!warehouse.id) throw new Error("warehouse id is required");
      const { data } = await u(warehouse);
      return data;
    }
  );
  const remove = useMutation<Warehouse, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("warehouse id is required");
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
    warehouses,
    warehouse,
    add,
    update,
    remove,
    isUnique,
  };
}
