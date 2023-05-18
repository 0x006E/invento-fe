import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { ErrorResponse, PagedResponse, Sale } from "../api/models";
import { SaleService } from "../api/services";
import dependencyContext from "../store";

export default function useSales(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
  } = useContext(dependencyContext).get<SaleService>("saleService");

  const sales = (
    page: number,
    query = "",
    sortColumn: keyof Sale = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Sale>, AxiosError<ErrorResponse>>({
      queryKey: ["sales", page, size, query],
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

  const sale = (id: string) =>
    useQuery<Sale, AxiosError<ErrorResponse>>({
      queryKey: ["sale", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<Sale, AxiosError<ErrorResponse>, Sale>(
    async (sale) => {
      const { id, invoiceNumber, retailSailPrice, netAmount, paid, ...rest } =
        sale;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<Sale, AxiosError<ErrorResponse>, Sale>(
    async (sale) => {
      if (!sale.id) throw new Error("sale id is required");
      const { data } = await u(sale);
      return data;
    }
  );
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("sale id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    sales,
    sale,
    add,
    update,
    remove,
  };
}
