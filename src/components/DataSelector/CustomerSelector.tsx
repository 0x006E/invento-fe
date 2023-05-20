import { Loader, Select, SelectProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ForwardedRef, forwardRef } from "react";
import useCustomers from "../../hooks/Customers";
import { OmitStrict } from "../../util";

export interface CustomerSelectorProps
  extends OmitStrict<SelectProps, "data"> {}

function CustomerSelector(
  props: CustomerSelectorProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { customersShort } = useCustomers();

  const { isError, isFetching, isLoading, refetch, data } = customersShort();

  if (isError) {
    notifications.show({
      title: "Error",
      message: "Cannot load customers",
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
        !data || data.length === 0 || data.length === 0
          ? [
              {
                label: "No customers",
                value: "no-customers",
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

export default forwardRef(CustomerSelector);
