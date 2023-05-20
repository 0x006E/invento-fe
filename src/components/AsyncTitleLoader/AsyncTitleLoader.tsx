import { PartyType } from "../../api/models";
import CustomerName from "./CustomerName";
import EmployeeName from "./EmployeeName";
import ProductName from "./ProductName";
import SupplierName from "./SupplierName";
import VehicleNumber from "./VehicleNumber";
import WarehouseName from "./WarehouseName";

export interface AsyncTitleLoaderProps {
  id: string;
  type: PartyType | "PRODUCT" | "CUSTOMER" | "EMPLOYEE";
}

function AsyncTitleLoader(props: AsyncTitleLoaderProps) {
  const { id, type } = props;
  return {
    [PartyType.Supplier]: <SupplierName id={id} />,
    [PartyType.Warehouse]: <WarehouseName id={id} />,
    [PartyType.Vehicle]: <VehicleNumber id={id} />,
    PRODUCT: <ProductName id={id} />,
    CUSTOMER: <CustomerName id={id} />,
    EMPLOYEE: <EmployeeName id={id} />,
  }[type];
}

export default AsyncTitleLoader;
