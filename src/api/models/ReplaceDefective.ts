import { PartyType } from "./PartyType";

export interface ReplaceDefective {
  id: string;
  customerId: string;
  fromId: string;
  fromType: PartyType;
  items: DefectiveProductItem[];
  dateTime: string;
}

export interface DefectiveProductItem {
  productId: string;
  quantity: number;
}
