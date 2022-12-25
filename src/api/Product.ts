import { CrudService } from "./CrudSevice";

export interface Product {
  id: string;
  name: string;
  price: number;
}

export class ProductCrudService extends CrudService<Product> {
  constructor() {
    super("/api/product");
  }
  isUnique = (name: string) => {
    return this.axiosInstance.get<boolean>(`/name-exists/${name}`);
  };
}

const ProductCrudServiceInstance = new ProductCrudService();

export default ProductCrudServiceInstance;
