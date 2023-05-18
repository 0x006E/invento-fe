import { Loader, Table } from "@mantine/core";
import { Item } from "../api/models";
import useProducts from "../hooks/Products";

export interface ListProductsProps {
  items: Item[];
}

function ListProducts(props: ListProductsProps) {
  const { items } = props;
  const { productsShort } = useProducts();
  const { data: products, isError, isLoading } = productsShort();

  const rows =
    products &&
    items.map((item) => (
      <tr key={item.productId}>
        <td>{products.find((i) => i.id === item.productId)?.name}</td>
        <td>{item.quantityEmpty}</td>
        <td>{item.quantityFull}</td>
        <td>{item.quantityDefective}</td>
      </tr>
    ));
  return (
    <Table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Empty</th>
          <th>Full</th>
          <th>Defective</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && <Loader size={40} />}
        {isError ? "Products load failed" : rows}
      </tbody>
    </Table>
  );
}

export default ListProducts;
