import { CrudService } from "./CrudSevice";

export interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductCrudService = new CrudService<Product>("/api/products");

export default ProductCrudService;
