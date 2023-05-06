import { Address } from "./Address";

/**
 * Interface for defining the structure of a customer object
 */
export interface Customer {
  /**
   * The unique identifier of the customer
   */
  id: string;
  /**
   * The name of the customer
   */
  name: string;
  /**
   * The phone number of the customer
   */
  phoneNumber: string;
  /**
   * The address of the customer
   */
  address: Address;
}
