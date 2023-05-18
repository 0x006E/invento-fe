import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { ErrorResponse, OpeningStock, PagedResponse } from "../api/models";
import { OpeningStockService } from "../api/services";
import dependencyContext from "../store";

export default function useOpeningStocks(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    getByDate: s,
  } = useContext(dependencyContext).get<OpeningStockService>(
    "openingStockService"
  );

  const openingStocks = (
    page: number,
    date = "",
    sortColumn: keyof OpeningStock = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = date !== "";
    return useQuery<PagedResponse<OpeningStock>, AxiosError<ErrorResponse>>({
      queryKey: ["openingStocks", page, size, date],
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

  const openingStock = (id: string) =>
    useQuery<OpeningStock, AxiosError<ErrorResponse>>({
      queryKey: ["openingStock", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<
    OpeningStock,
    AxiosError<ErrorResponse>,
    OpeningStock
  >(async (openingStock) => {
    const { id, dayEndId, partyType, ...rest } = openingStock;
    const { data } = await c(rest);
    return data;
  });
  const update = useMutation<
    OpeningStock,
    AxiosError<ErrorResponse>,
    OpeningStock
  >(async (openingStock) => {
    if (!openingStock.id) throw new Error("openingStock id is required");
    const { data } = await u(openingStock);
    return data;
  });
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("openingStock id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    openingStocks,
    openingStock,
    add,
    update,
    remove,
  };
}
