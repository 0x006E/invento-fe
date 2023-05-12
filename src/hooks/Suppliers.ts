import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { ErrorResponse } from "../api/models/ErrorResponse";
import { Supplier } from "../api/models/Supplier";
import { SupplierService } from "../api/services/SupplierService";
import dependencyContext from "../store";

export default function useSuppliers(size = 15) {
  const {
    getAllShort: gA,
    get: g,
    create: c,
    update: u,
  } = useContext(dependencyContext).get<SupplierService>("supplierService");

  const suppliers = () =>
    useQuery<Supplier[], AxiosError<ErrorResponse>>({
      queryKey: ["suppliers"],
      queryFn: async () => {
        const { data } = await gA();
        return data;
      },
    });

  const supplier = (id: string) =>
    useQuery<Supplier, AxiosError<ErrorResponse>>({
      queryKey: ["supplier", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });
  const add = useMutation<Supplier, AxiosError<ErrorResponse>, Supplier>(
    async (supplier) => {
      const { id, ...rest } = supplier;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<Supplier, AxiosError<ErrorResponse>, Supplier>(
    async (supplier) => {
      if (!supplier.id) throw new Error("supplier id is required");
      const { data } = await u(supplier);
      return data;
    }
  );
  return {
    suppliers,
    supplier,
    add,
    update,
  };
}
