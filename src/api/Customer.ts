import { Address } from "./Address";
import { CrudService } from "./CrudSevice";

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  address: Address;
}

export class CustomerCrudService extends CrudService<Customer> {
  constructor() {
    super("/api/customer");
  }
  isUnique = (number: string) => {
    return this.axiosInstance.get<boolean>(`/number-exists/${number}`);
  };
}

const CustomerCrudServiceInstance = new CustomerCrudService();

export default CustomerCrudServiceInstance;
