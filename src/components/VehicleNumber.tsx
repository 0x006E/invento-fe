import { Skeleton } from "@mantine/core";
import useVehicles from "../hooks/Vehicles";

export interface VehicleNumberProps {
  id: string;
}

function VehicleNumber(props: VehicleNumberProps) {
  const { id } = props;
  const { vehicle } = useVehicles();
  const { data, isError, isLoading } = vehicle(id);
  return isLoading || isError ? (
    <Skeleton width={100} height={20} />
  ) : (
    <>{data.number}</>
  );
}

export default VehicleNumber;
