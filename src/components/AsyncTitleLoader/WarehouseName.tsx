import { Skeleton } from "@mantine/core";
import useWarehouses from "../../hooks/Warehouses";

export interface WarehouseNameProps {
  id: string;
}

function WarehouseName(props: WarehouseNameProps) {
  const { id } = props;
  const { warehouse } = useWarehouses();
  const { data, isError, isLoading } = warehouse(id);
  return isLoading || isError ? (
    <Skeleton width={100} height={20} />
  ) : (
    <>{data.name}</>
  );
}

export default WarehouseName;
