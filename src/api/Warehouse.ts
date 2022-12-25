import { Address } from "./Address";
import { CrudService } from "./CrudSevice";

export interface Warehouse {
  id: string;
  name: string;
  address: Address;
}

export class WarehouseCrudService extends CrudService<Warehouse> {
  constructor() {
    super("/api/warehouse");
  }
  isUnique = (name: string) => {
    return this.axiosInstance.get<boolean>(`/name-exists/${name}`);
  };
}

const WarehouseCrudServiceInstance = new WarehouseCrudService();

export default WarehouseCrudServiceInstance;
