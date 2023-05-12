/**
 * An enumeration of employee roles.
 * @enum {string}
 */
export enum EmployeeRoles {
  /** An office worker. */
  OfficeWorker = "OFFICE_WORKER",
  /** A truck driver. */
  TruckDriver = "TRUCK_DRIVER",
  /** A supplier. */
  Supplier = "SUPPLIER",
  /** A warehouse worker. */
  WarehouseWorker = "WAREHOUSE_WORKER",
}

/**
 * Represents an employee.
 * @interface
 */
export interface Employee {
  /** The unique identifier of the employee. */
  id: string;
  /** The name of the employee. */
  name: string;
  /** The role of the employee, which can be one of the values from the `EmployeeRoles` enum. */
  role: EmployeeRoles;
}
