import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";

import { ErrorResponse, PagedResponse, ReplaceDefective } from "../api/models";
import { ReplaceDefectiveService } from "../api/services";
import dependencyContext from "../store";

export default function useReplaceDefectives(size = 15) {
  const {
    getAll: gA,
    get: g,
    create: c,
    update: u,
    delete: d,
    getByDate: s,
  } = useContext(dependencyContext).get<ReplaceDefectiveService>(
    "replaceDefectiveService"
  );

  const replaceDefectives = (
    page: number,
    date = "",
    sortColumn: keyof ReplaceDefective = "id",
    sortDirection: "asc" | "desc" = "asc"
  ) => {
    const isQuery = date !== "";
    return useQuery<PagedResponse<ReplaceDefective>, AxiosError<ErrorResponse>>(
      {
        queryKey: ["replaceDefectives", page, size, date],
        queryFn: async () => {
          if (isQuery) {
            const { data } = await s(
              size,
              page,
              date,
              sortColumn,
              sortDirection
            );
            return data;
          } else {
            const { data } = await gA(size, page, sortColumn, sortDirection);
            return data;
          }
        },
      }
    );
  };

  const replaceDefective = (id: string) =>
    useQuery<ReplaceDefective, AxiosError<ErrorResponse>>({
      queryKey: ["replaceDefective", id],
      queryFn: async () => {
        const { data } = await g(id);
        return data;
      },
    });

  const add = useMutation<
    ReplaceDefective,
    AxiosError<ErrorResponse>,
    ReplaceDefective
  >(async (replaceDefective) => {
    const { id, ...rest } = replaceDefective;
    const { data } = await c(rest);
    return data;
  });
  const update = useMutation<
    ReplaceDefective,
    AxiosError<ErrorResponse>,
    ReplaceDefective
  >(async (replaceDefective) => {
    if (!replaceDefective.id)
      throw new Error("replaceDefective id is required");
    const { data } = await u(replaceDefective);
    return data;
  });
  const remove = useMutation<void, AxiosError<ErrorResponse>, string>(
    async (id) => {
      if (!id || id === "") throw new Error("replaceDefective id is required");
      const { data } = await d(id);
      return data;
    }
  );
  return {
    replaceDefectives,
    replaceDefective,
    add,
    update,
    remove,
  };
}
