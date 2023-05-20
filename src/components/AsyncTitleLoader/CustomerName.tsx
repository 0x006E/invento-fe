import { Skeleton } from "@mantine/core";
import useCustomers from "../../hooks/Customers";

export interface CustomerNameProps {
  id: string;
}

function CustomerName(props: CustomerNameProps) {
  const { id } = props;
  const { customer } = useCustomers();
  const { data, isError, isLoading } = customer(id);
  return isLoading || isError ? (
    <Skeleton width={100} height={20} />
  ) : (
    <>{data.name}</>
  );
}

export default CustomerName;
