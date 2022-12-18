import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PagedResponse } from "../api/PagedResponse";
import VehicleCrudService, { Vehicle } from "../api/Vehicle";

export default function useVehicles(size: number) {
  const queryClient = useQueryClient();
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
  } = VehicleCrudService;
  const products = (page: number) => {
    return useQuery<PagedResponse<Vehicle>, Error>({
      queryKey: ["vehicles", size, page],
      queryFn: async () => {
        const { data } = await gA(size, page);
        return data;
      },
    });
  };

  const product = (id: string) =>
    useQuery<Vehicle, Error>({
      queryKey: ["product", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });
  const add = useMutation<Vehicle, Error, Vehicle>(
    async (product) => {
      const { id, ...rest } = product;
      const { data } = await c(rest);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vehicles", size, 0]);
      },
    }
  );
  const update = useMutation<Vehicle, Error, Vehicle>(
    async (product) => {
      if (!product.id) throw new Error("Vehicle id is required");
      const { data } = await u(product.id, product);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vehicles", size, 0]);
      },
    }
  );
  const remove = useMutation<Vehicle, Error, string>(
    async (id) => {
      if (id) throw new Error("Vehicle id is required");
      const { data } = await d(id);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vehicles", size, 0]);
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
