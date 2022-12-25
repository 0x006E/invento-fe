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
  isUnique = (number: string) => {
    return this.axiosInstance.get<boolean>(`/number-exists/${number}`);
  };
}

const VehicleCrudServiceInstance = new VehicleCrudService();

export default VehicleCrudServiceInstance;
