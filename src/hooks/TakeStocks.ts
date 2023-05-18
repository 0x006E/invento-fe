import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { ErrorResponse, PagedResponse, TakeStock } from "../api/models";
import { TakeStockService } from "../api/services";
import dependencyContext from "../store";

export default function useTakeStocks(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    getByDate: s,
  } = useContext(dependencyContext).get<TakeStockService>("takeStockService");

  const takeStocks = (
    page: number,
    date = "",
    sortColumn: keyof TakeStock = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = date !== "";
    return useQuery<PagedResponse<TakeStock>, AxiosError<ErrorResponse>>({
      queryKey: ["takeStocks", page, size, date],
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

  const takeStock = (id: string) =>
    useQuery<TakeStock, AxiosError<ErrorResponse>>({
      queryKey: ["takeStock", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<TakeStock, AxiosError<ErrorResponse>, TakeStock>(
    async (takeStock) => {
      const { id, dateTime, ...rest } = takeStock;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<TakeStock, AxiosError<ErrorResponse>, TakeStock>(
    async (takeStock) => {
      if (!takeStock.id) throw new Error("takeStock id is required");
      const { data } = await u(takeStock);
      return data;
    }
  );
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("takeStock id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    takeStocks,
    takeStock,
    add,
    update,
    remove,
  };
}
