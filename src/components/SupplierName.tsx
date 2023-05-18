import { Skeleton } from "@mantine/core";
import useSuppliers from "../hooks/Suppliers";

export interface SupplierNameProps {
  id: string;
}

function SupplierName(props: SupplierNameProps) {
  const { id } = props;
  const { supplier } = useSuppliers();
  const { data, isError, isLoading } = supplier(id);
  return isLoading || isError ? (
    <Skeleton width={100} height={20} />
  ) : (
    <>{data.name}</>
  );
}

export default SupplierName;
