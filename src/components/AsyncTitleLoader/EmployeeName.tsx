import { Skeleton } from "@mantine/core";
import useEmployees from "../../hooks/Employees";

export interface EmployeeNameProps {
  id: string;
}

function EmployeeName(props: EmployeeNameProps) {
  const { id } = props;
  const { employee } = useEmployees();
  const { data, isError, isLoading } = employee(id);
  return isLoading || isError ? (
    <Skeleton width={100} height={20} />
  ) : (
    <>{data.name}</>
  );
}

export default EmployeeName;
