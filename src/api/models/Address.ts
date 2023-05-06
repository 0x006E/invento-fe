/**
 * Address interface representing the address of a customer or a warehouse
 */
export interface Address {
  /**
   * The first line of the address
   */
  addressLine1: string;
  /**
   * The second line of the address (optional)
   */
  addressLine2?: string;
  /**
   * The city of the address
   */
  city: string;
  /**
   * The state or province of the address
   */
  state: string;
  /**
   * The postal code or zip code of the address
   */
  pincode: string;
}
