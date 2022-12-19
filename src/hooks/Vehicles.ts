import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "../api/ErrorResponse";
import { PagedResponse } from "../api/PagedResponse";
import VehicleCrudService, { Vehicle } from "../api/Vehicle";

export default function useVehicles(size: number) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
  } = VehicleCrudService;

  const vehicles = (page: number, query = "") => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Vehicle>, AxiosError<ErrorResponse>>({
      queryKey: ["vehicles", page, size, query],
      queryFn: async () => {
        if (isQuery) {
          const { data } = await s(size, page, query);
          return data;
        } else {
          const { data } = await gA(size, page);
          return data;
        }
      },
    });
  };

  const vehicle = (id: string) =>
    useQuery<Vehicle, AxiosError<ErrorResponse>>({
      queryKey: ["vehicle", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<Vehicle, AxiosError<ErrorResponse>, Vehicle>(
    async (vehicle) => {
      const { id, ...rest } = vehicle;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<Vehicle, AxiosError<ErrorResponse>, Vehicle>(
    async (vehicle) => {
      if (!vehicle.id) throw new Error("vehicle id is required");
      const { data } = await u(vehicle);
      return data;
    }
  );
  const remove = useMutation<Vehicle, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("vehicle id is required");
      const { data } = await d(id);
      return data;
    }
  );

  return {
    vehicles,
    vehicle,
    add,
    update,
    remove,
  };
}
