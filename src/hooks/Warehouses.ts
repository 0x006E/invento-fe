import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dependencyContext from "../store";

import { useContext } from "react";
import { ErrorResponse, PagedResponse, Warehouse } from "../api/models";
import { WarehouseService } from "../api/services";

export default function useWarehouses(size = 15) {
  const {
    getAll: gA,
    getAllShort: gAS,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
    isUnique: iU,
  } = useContext(dependencyContext).get<WarehouseService>("warehouseService");

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

  const warehousesShort = () =>
    useQuery<Warehouse[], AxiosError<ErrorResponse>>({
      queryKey: ["warehousesShort"],
      queryFn: async () => {
        const { data } = await gAS();
        return data;
      },
    });

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
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
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
    warehousesShort,
    warehouse,
    add,
    update,
    remove,
    isUnique,
  };
}
