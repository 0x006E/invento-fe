import { Item } from "./Item";
import { PartyType } from "./PartyType";

export interface GiveStock {
  id: string;
  items: Item[];
  fromId: string;
  fromType: PartyType;
  toId: string;
  toType: PartyType;
  dateTime: string;
}
