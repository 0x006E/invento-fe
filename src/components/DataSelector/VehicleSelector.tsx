import { Loader, Select, SelectProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import useVehicles from "../../hooks/Vehicles";
import { OmitStrict } from "../../util";

export interface VehicleSelectorProps extends OmitStrict<SelectProps, "data"> {}

function VehicleSelector(props: VehicleSelectorProps) {
  const { vehiclesShort } = useVehicles();

  const { isError, isFetching, isLoading, refetch, data } = vehiclesShort();

  if (isError) {
    notifications.show({
      title: "Error",
      message: "Cannot load vehicles",
      color: "red",
    });
  }

  return (
    <Select
      {...props}
      onDropdownOpen={() => refetch()}
      rightSection={isLoading || isFetching ? <Loader size={16} /> : null}
      data={
        !data || data.length === 0
          ? [
              {
                label: "No vehicles",
                value: "no-vehicles",
                disabled: true,
              },
            ]
          : data.map((c) => ({
              label: c.number,
              value: c.id,
            }))
      }
    />
  );
}

export default VehicleSelector;
