import { Loader, Select, SelectProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ForwardedRef, forwardRef } from "react";
import useSuppliers from "../../hooks/Suppliers";
import { OmitStrict } from "../../util";

export interface SupplierSelectorProps
  extends OmitStrict<SelectProps, "data"> {}

function SupplierSelector(
  props: SupplierSelectorProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { suppliers } = useSuppliers();

  const { isError, isFetching, isLoading, refetch, data } = suppliers();

  if (isError) {
    notifications.show({
      title: "Error",
      message: "Cannot load suppliers",
      color: "red",
    });
  }

  return (
    <Select
      {...props}
      onDropdownOpen={() => refetch()}
      rightSection={isLoading || isFetching ? <Loader size={16} /> : null}
      ref={ref}
      data={
        !data || data.length === 0
          ? [
              {
                label: "No suppliers",
                value: "no-suppliers",
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

export default forwardRef(SupplierSelector);
