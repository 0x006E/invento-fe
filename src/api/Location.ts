import { Address } from "./Address";
import { CrudService } from "./CrudSevice";

export interface Location {
  id: string;
  name: string;
  address: Address;
}

export class LocationCrudService extends CrudService<Location> {
  constructor() {
    super("/api/location");
  }
  isUnique = (name: string) => {
    return this.axiosInstance.get<boolean>(`/name-exists/${name}`);
  };
}

const LocationCrudServiceInstance = new LocationCrudService();

export default LocationCrudServiceInstance;
