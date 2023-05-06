import { Address } from "./Address";

/**
 * Represents a Warehouse object with an ID, name, and address.
 */
export interface Warehouse {
  /**
   * The unique identifier of the warehouse.
   */
  id: string;
  /**
   * The name of the warehouse.
   */
  name: string;
  /**
   * The address of the warehouse, represented as an Address object.
   */
  address: Address;
}
