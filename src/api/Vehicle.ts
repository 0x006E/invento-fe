import { CrudService } from "./CrudSevice";

export interface Vehicle {
  id: string;
  number: string;
  type: string;
}
const VehicleCrudService = CrudService<Vehicle>("/api/vehicle");
export default VehicleCrudService;
