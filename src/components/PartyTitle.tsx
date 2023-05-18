import { PartyType } from "../api/models";
import SupplierName from "./SupplierName";
import VehicleNumber from "./VehicleNumber";
import WarehouseName from "./WarehouseName";

export interface PartyTitleProps {
  id: string;
  type: PartyType;
}

function PartyTitle(props: PartyTitleProps) {
  const { id, type } = props;
  return {
    [PartyType.Supplier]: <SupplierName id={id} />,
    [PartyType.Warehouse]: <WarehouseName id={id} />,
    [PartyType.Vehicle]: <VehicleNumber id={id} />,
  }[type];
}

export default PartyTitle;
