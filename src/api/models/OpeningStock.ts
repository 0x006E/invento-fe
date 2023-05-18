import { Item } from "./Item";
import { PartyType } from "./PartyType";

export interface OpeningStock {
  id: string;
  partyId: string;
  partyType: PartyType;
  items: Item[];
  dayEndId: string;
}
