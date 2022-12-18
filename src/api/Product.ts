import { CrudService } from "./CrudSevice";

export interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductCrudService = CrudService<Product>("/api/product");
export default ProductCrudService;
