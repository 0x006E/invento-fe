import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { Employee, ErrorResponse, PagedResponse } from "../api/models";
import { EmployeeService } from "../api/services";
import dependencyContext from "../store";
import { OmitStrict } from "../util";

export default function useEmployees(size = 15) {
  const {
    getAll: gA,
    getAllShort: gAS,
    get: g,
    create: c,
    update: u,
    delete: d,
    search: s,
  } = useContext(dependencyContext).get<EmployeeService>("employeeService");

  const employees = (
    page: number,
    query = "",
    sortColumn: keyof Employee = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = query.length > 0;
    return useQuery<PagedResponse<Employee>, AxiosError<ErrorResponse>>({
      queryKey: ["employees", page, size, query, sortColumn, sortDirection],
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
  const employeesShort = () =>
    useQuery<Employee[], AxiosError<ErrorResponse>>({
      queryKey: ["employeesShort"],
      queryFn: async () => {
        const { data } = await gAS();
        return data;
      },
    });

  const employee = (id: string) =>
    useQuery<Employee, AxiosError<ErrorResponse>>({
      queryKey: ["employee", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<
    OmitStrict<Employee, "role">,
    AxiosError<ErrorResponse>,
    Employee
  >(async (employee) => {
    const { id, ...rest } = employee;
    const { data } = await c(rest);
    return data;
  });
  const update = useMutation<Employee, AxiosError<ErrorResponse>, Employee>(
    async (employee) => {
      if (!employee.id) throw new Error("Employee id is required");
      const { data } = await u(employee);
      return data;
    }
  );
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("Employee id is required");
      const { data } = await d(id);
      return data;
    }
  );

  return {
    employees,
    employee,
    employeesShort,
    add,
    update,
    remove,
  };
}
