import { SelectProps } from "@mantine/core";
import { ForwardedRef, forwardRef } from "react";
import { PartyType } from "../../api/models";
import { OmitStrict } from "../../util";
import ProductSelector from "./ProductSelector";
import SupplierSelector from "./SupplierSelector";
import VehicleSelector from "./VehicleSelector";
import WarehouseSelector from "./WarehouseSelector";

export interface DataSelectorProps extends OmitStrict<SelectProps, "data"> {
  type: PartyType | "PRODUCT";
}

function DataSelector(
  props: DataSelectorProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const { type, ...rest } = props;
  return {
    [PartyType.Supplier]: <SupplierSelector ref={ref} {...rest} />,
    [PartyType.Warehouse]: <WarehouseSelector ref={ref} {...rest} />,
    [PartyType.Vehicle]: <VehicleSelector ref={ref} {...rest} />,
    PRODUCT: <ProductSelector ref={ref} {...rest} />,
  }[type];
}

export default forwardRef(DataSelector);
