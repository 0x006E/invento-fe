import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { ErrorResponse, PagedResponse, WarehouseLoadOut } from "../api/models";
import { WarehouseLoadOutService } from "../api/services";
import dependencyContext from "../store";

export default function useWarehouseLoadOuts(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    getByDate: s,
  } = useContext(dependencyContext).get<WarehouseLoadOutService>(
    "warehouseLoadOutService"
  );

  const warehouseLoadOuts = (
    page: number,
    date = "",
    sortColumn: keyof WarehouseLoadOut = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = date !== "";
    return useQuery<PagedResponse<WarehouseLoadOut>, AxiosError<ErrorResponse>>(
      {
        queryKey: ["warehouseLoadOuts", page, size, date],
        queryFn: async () => {
          if (isQuery) {
            const { data } = await s(
              size,
              page,
              date,
              sortColumn,
              sortDirection
            );
            return data;
          } else {
            const { data } = await gA(size, page, sortColumn, sortDirection);
            return data;
          }
        },
      }
    );
  };

  const warehouseLoadOut = (id: string) =>
    useQuery<WarehouseLoadOut, AxiosError<ErrorResponse>>({
      queryKey: ["warehouseLoadOut", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<
    WarehouseLoadOut,
    AxiosError<ErrorResponse>,
    WarehouseLoadOut
  >(async (warehouseLoadOut) => {
    const { id, ...rest } = warehouseLoadOut;
    const { data } = await c(rest);
    return data;
  });
  const update = useMutation<
    WarehouseLoadOut,
    AxiosError<ErrorResponse>,
    WarehouseLoadOut
  >(async (warehouseLoadOut) => {
    if (!warehouseLoadOut.id)
      throw new Error("warehouseLoadOut id is required");
    const { data } = await u(warehouseLoadOut);
    return data;
  });
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("warehouseLoadOut id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    warehouseLoadOuts,
    warehouseLoadOut,
    add,
    update,
    remove,
  };
}
