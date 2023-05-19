import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { ErrorResponse, GiveStock, PagedResponse } from "../api/models";
import { GiveStockService } from "../api/services";
import dependencyContext from "../store";

export default function useGiveStocks(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    getByDate: s,
  } = useContext(dependencyContext).get<GiveStockService>("giveStockService");

  const giveStocks = (
    page: number,
    date = "",
    sortColumn: keyof GiveStock = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = date !== "";
    return useQuery<PagedResponse<GiveStock>, AxiosError<ErrorResponse>>({
      queryKey: ["giveStocks", page, size, date],
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

  const giveStock = (id: string) =>
    useQuery<GiveStock, AxiosError<ErrorResponse>>({
      queryKey: ["giveStock", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<GiveStock, AxiosError<ErrorResponse>, GiveStock>(
    async (giveStock) => {
      const { id, dateTime, ...rest } = giveStock;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<GiveStock, AxiosError<ErrorResponse>, GiveStock>(
    async (giveStock) => {
      if (!giveStock.id) throw new Error("giveStock id is required");
      const { data } = await u(giveStock);
      return data;
    }
  );
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("giveStock id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    giveStocks,
    giveStock,
    add,
    update,
    remove,
  };
}
