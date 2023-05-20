export interface WarehouseLoadIn {
  id: string;
  warehouseId: string;
  vehicleNumber: string;
  invoiceNumber: string;
  dateTime: string;
  products: LoadInProductItem[];
}

export interface LoadInProductItem {
  productId: string;
  quantityFull: number;
}
