import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { ErrorResponse, PagedResponse, SaleReturn } from "../api/models";
import { SaleReturnService } from "../api/services";
import dependencyContext from "../store";

export default function useSaleReturns(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    getByDate: s,
  } = useContext(dependencyContext).get<SaleReturnService>("saleReturnService");

  const saleReturns = (
    page: number,
    date = "",
    sortColumn: keyof SaleReturn = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = date !== "";
    return useQuery<PagedResponse<SaleReturn>, AxiosError<ErrorResponse>>({
      queryKey: ["saleReturns", page, size, date],
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

  const saleReturn = (id: string) =>
    useQuery<SaleReturn, AxiosError<ErrorResponse>>({
      queryKey: ["saleReturn", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<SaleReturn, AxiosError<ErrorResponse>, SaleReturn>(
    async (saleReturn) => {
      const { id, ...rest } = saleReturn;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<SaleReturn, AxiosError<ErrorResponse>, SaleReturn>(
    async (saleReturn) => {
      if (!saleReturn.id) throw new Error("saleReturn id is required");
      const { data } = await u(saleReturn);
      return data;
    }
  );
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("saleReturn id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    saleReturns,
    saleReturn,
    add,
    update,
    remove,
  };
}
