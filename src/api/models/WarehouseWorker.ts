/**
 * Represents a warehouse worker.
 * @interface
 */
export interface WarehouseWorker {
  /** The unique identifier of the warehouse worker. */
  id: string;
  /** The name of the warehouse worker. */
  name: string;
  /** An array of warehouse IDs associated with the warehouse worker. */
  warehouseIds: string[];
}
