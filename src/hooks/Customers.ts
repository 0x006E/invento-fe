import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { Customer } from "../api/models/Customer";
import { ErrorResponse } from "../api/models/ErrorResponse";
import { PagedResponse } from "../api/models/PagedResponse";
import { CustomerService } from "../api/services/CustomerService";
import dependencyContext from "../store";

export default function useCustomers(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
    isUnique: iU,
  } = useContext(dependencyContext).get<CustomerService>("customerService");

  const customers = (
    page: number,
    query = "",
    sortColumn: keyof Customer = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Customer>, AxiosError<ErrorResponse>>({
      queryKey: ["customers", page, size, query],
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

  const customer = (id: string) =>
    useQuery<Customer, AxiosError<ErrorResponse>>({
      queryKey: ["customer", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<Customer, AxiosError<ErrorResponse>, Customer>(
    async (customer) => {
      const { id, ...rest } = customer;
      const { data } = await c(rest);
      return data;
    }
  );
  const update = useMutation<Customer, AxiosError<ErrorResponse>, Customer>(
    async (customer) => {
      if (!customer.id) throw new Error("customer id is required");
      const { data } = await u(customer);
      return data;
    }
  );
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("customer id is required");
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
    customers,
    customer,
    add,
    update,
    remove,
    isUnique,
  };
}
