import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PagedResponse } from "../api/PagedResponse";
import ProductCrudService, { Product } from "../api/Product";

export default function useProducts(size: number) {
  const queryClient = useQueryClient();
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
  } = ProductCrudService;
  const products = (page: number) => {
    return useQuery<PagedResponse<Product>, Error>({
      queryKey: ["products", size, page],
      queryFn: async () => {
        const { data } = await gA(size, page);
        return data;
      },
    });
  };

  const product = (id: string) =>
    useQuery<Product, Error>({
      queryKey: ["product", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });
  const add = useMutation<Product, Error, Product>(
    async (product) => {
      const { id, ...rest } = product;
      const { data } = await c(rest);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products", size, 0]);
      },
    }
  );
  const update = useMutation<Product, Error, Product>(
    async (product) => {
      if (!product.id) throw new Error("Product id is required");
      const { data } = await u(product.id, product);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products", size, 0]);
      },
    }
  );
  const remove = useMutation<Product, Error, string>(
    async (id) => {
      if (id) throw new Error("Product id is required");
      const { data } = await d(id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products", size, 0]);
      },
    }
  );

  return {
    products,
    product,
    add,
    update,
    remove,
  };
}
