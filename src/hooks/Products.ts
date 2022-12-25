import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../api/ErrorResponse";
import { PagedResponse } from "../api/PagedResponse";
import ProductCrudService, { Product } from "../api/Product";

export default function useProducts(
  size = 15,
  sortColumn: keyof Product = "id",
  sortDirection: "asc" | "desc" = "asc"
) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
    isUnique: iU,
  } = ProductCrudService;

  const products = (page: number, query = "") => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Product>, AxiosError<ErrorResponse>>({
      queryKey: ["products", page, size, query, sortColumn, sortDirection],
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

  const product = (id: string) =>
    useQuery<Product, AxiosError<ErrorResponse>>({
      queryKey: ["product", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<Product, AxiosError<ErrorResponse>, Product>(
    async (product) => {
      const { id, ...rest } = product;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<Product, AxiosError<ErrorResponse>, Product>(
    async (product) => {
      if (!product.id) throw new Error("Product id is required");
      const { data } = await u(product);
      return data;
    }
  );
  const remove = useMutation<Product, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("Product id is required");
      const { data } = await d(id);
      return data;
    }
  );

  const isUnique = useMutation<boolean, AxiosError<ErrorResponse>, string>(
    async (name) => {
      const { data } = await iU(name);
      return data;
    }
  );

  return {
    products,
    product,
    add,
    update,
    remove,
    isUnique,
  };
}
