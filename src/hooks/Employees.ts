// import { useMutation, useQuery } from "@tanstack/react-query";
// import { AxiosError } from "axios";

// export default function useSuppliers(size = 15) {
//   const {
//     getAll: gA,
//     get: g,
//     create: c,
//     update: u,
//     delete: d,
//     search: s,
//     isUnique: iU,
//   } = SupplierCrudService;

//   const suppliers = (
//     page: number,
//     query = "",
//     sortColumn: keyof Supplier = "id",
//     sortDirection: "asc" | "desc" = "asc"
//   ) => {
//     const isQuery = query.length > 0;
//     return useQuery<PagedResponse<Supplier>, AxiosError<ErrorResponse>>({
//       queryKey: ["suppliers", page, size, query],
//       queryFn: async () => {
//         if (isQuery) {
//           const { data } = await s(
//             size,
//             page,
//             query,
//             sortColumn,
//             sortDirection
//           );
//           return data;
//         } else {
//           const { data } = await gA(size, page, sortColumn, sortDirection);
//           return data;
//         }
//       },
//     });
//   };

//   const supplier = (id: string) =>
//     useQuery<Supplier, AxiosError<ErrorResponse>>({
//       queryKey: ["supplier", id],
//       queryFn: async () => {
//         const { data } = await g(id);
//         return data;
//       },
//     });

//   const add = useMutation<Supplier, AxiosError<ErrorResponse>, Supplier>(
//     async (supplier) => {
//       const { id, ...rest } = supplier;
//       const { data } = await c(rest);
//       return data;
//     }
//   );
//   const update = useMutation<Supplier, AxiosError<ErrorResponse>, Supplier>(
//     async (supplier) => {
//       if (!supplier.id) throw new Error("supplier id is required");
//       const { data } = await u(supplier);
//       return data;
//     }
//   );
//   const remove = useMutation<Supplier, AxiosError<ErrorResponse>, string>(
//     async (id) => {
//       if (!id || id === "") throw new Error("supplier id is required");
//       const { data } = await d(id);
//       return data;
//     }
//   );
//   const isUnique = useMutation<boolean, AxiosError<ErrorResponse>, string>(
//     async (num) => {
//       const { data } = await iU(num);
//       return data;
//     }
//   );
//   return {
//     suppliers,
//     supplier,
//     add,
//     update,
//     remove,
//     isUnique,
//   };
// }
