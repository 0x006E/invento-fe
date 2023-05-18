import { SelectProps } from "@mantine/core";
import { PartyType } from "../../api/models";
import { OmitStrict } from "../../util";
import ProductSelector from "./ProductSelector";
import SupplierSelector from "./SupplierSelector";
import VehicleSelector from "./VehicleSelector";
import WarehouseSelector from "./WarehouseSelector";

export interface DataSelectorProps extends OmitStrict<SelectProps, "data"> {
  type: PartyType | "PRODUCT";
}

function DataSelector(props: DataSelectorProps) {
  const { type, ...rest } = props;
  return {
    [PartyType.Supplier]: <SupplierSelector {...rest} />,
    [PartyType.Warehouse]: <WarehouseSelector {...rest} />,
    [PartyType.Vehicle]: <VehicleSelector {...rest} />,
    PRODUCT: <ProductSelector {...rest} />,
  }[type];
}

export default DataSelector;
