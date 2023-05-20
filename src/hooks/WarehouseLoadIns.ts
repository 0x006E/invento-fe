import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { ErrorResponse, PagedResponse, WarehouseLoadIn } from "../api/models";
import { WarehouseLoadInService } from "../api/services";
import dependencyContext from "../store";

export default function useWarehouseLoadIns(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    getByDate: s,
  } = useContext(dependencyContext).get<WarehouseLoadInService>(
    "warehouseLoadInService"
  );

  const warehouseLoadIns = (
    page: number,
    date = "",
    sortColumn: keyof WarehouseLoadIn = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = date !== "";
    return useQuery<PagedResponse<WarehouseLoadIn>, AxiosError<ErrorResponse>>({
      queryKey: ["warehouseLoadIns", page, size, date],
      queryFn: async () => {
        if (isQuery) {
          const { data } = await s(size, page, date, sortColumn, sortDirection);
          return data;
        } else {
          const { data } = await gA(size, page, sortColumn, sortDirection);
          return data;
        }
      },
    });
  };

  const warehouseLoadIn = (id: string) =>
    useQuery<WarehouseLoadIn, AxiosError<ErrorResponse>>({
      queryKey: ["warehouseLoadIn", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<
    WarehouseLoadIn,
    AxiosError<ErrorResponse>,
    WarehouseLoadIn
  >(async (warehouseLoadIn) => {
    const { id, ...rest } = warehouseLoadIn;
    const { data } = await c(rest);
    return data;
  });
  const update = useMutation<
    WarehouseLoadIn,
    AxiosError<ErrorResponse>,
    WarehouseLoadIn
  >(async (warehouseLoadIn) => {
    if (!warehouseLoadIn.id) throw new Error("warehouseLoadIn id is required");
    const { data } = await u(warehouseLoadIn);
    return data;
  });
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("warehouseLoadIn id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    warehouseLoadIns,
    warehouseLoadIn,
    add,
    update,
    remove,
  };
}
