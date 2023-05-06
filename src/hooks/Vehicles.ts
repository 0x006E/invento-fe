import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { ErrorResponse } from "../api/models/ErrorResponse";
import { PagedResponse } from "../api/models/PagedResponse";
import { Vehicle } from "../api/models/Vehicle";
import { VehicleService } from "../api/services/VehicleService";
import dependencyContext from "../store";

export default function useVehicles(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
    isUnique: iU,
  } = useContext(dependencyContext).get<VehicleService>("vehicleService");

  const vehicles = (
    page: number,
    query = "",
    sortColumn: keyof Vehicle = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Vehicle>, AxiosError<ErrorResponse>>({
      queryKey: ["vehicles", page, size, query],
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
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("vehicle id is required");
      const { data } = await d(id);
      return data;
    }
  );
  const isUnique = useMutation<boolean, AxiosError<ErrorResponse>, string>(
    async (num) => {
      const { data } = await iU(num);
      return data;
    }
  );
  return {
    vehicles,
    vehicle,
    add,
    update,
    remove,
    isUnique,
  };
}
