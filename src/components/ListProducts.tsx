import { Center, Loader, Table } from "@mantine/core";
import { ReactNode } from "react";
import { Item } from "../api/models";
import useProducts from "../hooks/Products";

type Key<T> = { key: keyof T; label?: string };

export interface ListProductsProps<T = Item> {
  items: T[];
  keys?: Key<T>[];
}

type GenericItem = {
  productId: string;
};

function ListProducts<T extends GenericItem>({
  items,
  keys,
}: ListProductsProps<T>): JSX.Element {
  const { productsShort } = useProducts();
  const { data: products, isError, isLoading } = productsShort();

  const fullKeys = [
    { key: "quantityFull", label: "Full" },
    { key: "quantityEmpty", label: "Empty" },
    { key: "quantityDefective", label: "Defective" },
  ];

  const rows =
    products &&
    items.map((item) => (
      <tr key={item.productId}>
        <td>{products.find((i) => i.id === item.productId)?.name}</td>
        {keys
          ? keys
              .filter((i) => i.key !== "productId" || i.key !== "id")
              .map((key) => (
                <td key={key.key as string}>{item[key.key] as ReactNode}</td>
              ))
          : fullKeys.map(
              ({ key }) =>
                key !== "productId" && (
                  <td key={key}>{item[key as keyof T] as ReactNode}</td>
                )
            )}
      </tr>
    ));
  const rowWrapper = (row: JSX.Element) => (
    <tr>
      <td colSpan={100}>
        <Center>{row}</Center>
      </td>
    </tr>
  );
  return (
    <Table>
      <thead>
        <tr>
          <th>Product Name</th>
          {keys
            ? keys.map((key) => (
                <th key={key.key as string}>
                  {key.label ? key.label : (key.key as ReactNode)}
                </th>
              ))
            : fullKeys.map((key) => <th key={key.key}>{key.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {isLoading && rowWrapper(<Loader size={40} />)}
        {isError ? rowWrapper(<>Products load failed</>) : rows}
      </tbody>
    </Table>
  );
}

export default ListProducts;
