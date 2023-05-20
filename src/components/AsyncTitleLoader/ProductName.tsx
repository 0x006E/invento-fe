import { Skeleton } from "@mantine/core";
import useProducts from "../../hooks/Products";

export interface ProductNameProps {
  id: string;
}

function ProductName(props: ProductNameProps) {
  const { id } = props;
  const { product } = useProducts();
  const { data, isError, isLoading } = product(id);
  return isLoading || isError ? (
    <Skeleton width={100} height={20} />
  ) : (
    <>{data.name}</>
  );
}

export default ProductName;
