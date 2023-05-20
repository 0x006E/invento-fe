import { Loader, Select, SelectProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ForwardedRef, forwardRef } from "react";
import useWarehouses from "../../hooks/Warehouses";
import { OmitStrict } from "../../util";

export interface WarehouseSelectorProps
  extends OmitStrict<SelectProps, "data"> {}

function WarehouseSelector(
  props: WarehouseSelectorProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { warehousesShort } = useWarehouses();

  const { isError, isFetching, isLoading, refetch, data } = warehousesShort();

  if (isError) {
    notifications.show({
      title: "Error",
      message: "Cannot load warehouses",
      color: "red",
    });
  }

  return (
    <Select
      {...props}
      ref={ref}
      onDropdownOpen={() => refetch()}
      rightSection={isLoading || isFetching ? <Loader size={16} /> : null}
      data={
        !data || data.length === 0
          ? [
              {
                label: "No warehouses",
                value: "no-warehouses",
                disabled: true,
              },
            ]
          : data.map((c) => ({
              label: c.name,
              value: c.id,
            }))
      }
    />
  );
}

export default forwardRef(WarehouseSelector);
