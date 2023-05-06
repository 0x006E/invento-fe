import { Address } from "./Address";

/**
 * Represents a location with an ID, name, and address.
 */
export interface Location {
  /**
   * The ID of the location.
   */
  id: string;

  /**
   * The name of the location.
   */
  name: string;

  /**
   * The address of the location.
   */
  address: Address;
}
