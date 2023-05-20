export interface SaleReturn {
  id: string;
  customerId: string;
  dateTime: string;
  items: SaleReturnItem[];
  toId: string;
}

export interface SaleReturnItem {
  productId: string;
  quantity: number;
}
