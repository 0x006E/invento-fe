import { Loader, Select, SelectProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ForwardedRef, forwardRef } from "react";
import useEmployees from "../../hooks/Employees";
import { OmitStrict } from "../../util";

export interface EmployeeSelectorProps
  extends OmitStrict<SelectProps, "data"> {}

function EmployeeSelector(
  props: EmployeeSelectorProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { employeesShort } = useEmployees();

  const { isError, isFetching, isLoading, refetch, data } = employeesShort();

  if (isError) {
    notifications.show({
      title: "Error",
      message: "Cannot load employees",
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
                label: "No employees",
                value: "no-employees",
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

export default forwardRef(EmployeeSelector);
