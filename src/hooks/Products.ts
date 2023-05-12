import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { ErrorResponse } from "../api/models/ErrorResponse";
import { PagedResponse } from "../api/models/PagedResponse";
import { Product } from "../api/models/Product";
import { ProductService } from "../api/services/ProductService";
import dependencyContext from "../store";

export default function useProducts(size = 15) {
  const {
    getAll: gA,
    getAllShort: gAS,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
    isUnique: iU,
  } = useContext(dependencyContext).get<ProductService>("productService");

  const products = (
    page: number,
    query = "",
    sortColumn: keyof Product = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
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

  const productsShort = () =>
    useQuery<Product[], AxiosError<ErrorResponse>>({
      queryKey: ["productsShort"],
      queryFn: async () => {
        const { data } = await gAS();
        return data;
      },
    });

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
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
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
    productsShort,
    product,
    add,
    update,
    remove,
    isUnique,
  };
}
