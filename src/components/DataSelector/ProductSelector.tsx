import { Loader, Select, SelectProps } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { ForwardedRef, forwardRef } from "react";
import useProducts from "../../hooks/Products";
import { OmitStrict } from "../../util";

export interface ProductSelectorProps extends OmitStrict<SelectProps, "data"> {}

function ProductSelector(
  props: ProductSelectorProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { productsShort } = useProducts();

  const { isError, isFetching, isLoading, refetch, data } = productsShort();

  if (isError) {
    notifications.show({
      title: "Error",
      message: "Cannot load products",
      color: "red",
    });
  }

  return (
    <Select
      {...props}
      onDropdownOpen={() => refetch()}
      rightSection={isLoading || isFetching ? <Loader size={16} /> : null}
      data={
        !data || data.length === 0 || data.length === 0
          ? [
              {
                label: "No products",
                value: "no-products",
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

export default forwardRef(ProductSelector);
