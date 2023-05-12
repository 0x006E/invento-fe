/**
 * Represents a truck driver.
 * @interface
 */
export interface TruckDriver {
  /** The unique identifier of the truck driver. */
  id: string;
  /** The name of the truck driver. */
  name: string;
  /** An array of vehicle IDs associated with the truck driver. */
  vehicleIds: string[];
}
