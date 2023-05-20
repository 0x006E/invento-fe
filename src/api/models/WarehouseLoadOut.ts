export interface WarehouseLoadOut {
  id: string;
  warehouseId: string;
  vehicleNumber: string;
  imageUrl: string;
  dateTime: string;
  products: LoadOutProductItem[];
  ervnumber: string;
}

export interface LoadOutProductItem {
  productId: string;
  quantity: number;
}
