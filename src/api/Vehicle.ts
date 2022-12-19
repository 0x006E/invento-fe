import { CrudService } from "./CrudSevice";

export interface Vehicle {
  id: string;
  number: string;
  type: string;
}

export class VehicleCrudService extends CrudService<Vehicle> {
  constructor() {
    super("/api/vehicle");
  }
}

const VehicleCrudServiceInstance = new VehicleCrudService();

export default VehicleCrudServiceInstance;
