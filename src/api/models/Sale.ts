import { PartyType } from "./PartyType";

/**
 * Represents a sale transaction.
 * @interface
 */
export interface Sale {
  /** The unique identifier for the sale. */
  id: string;
  /** The date and time the sale occurred. */
  dateTime: string;
  /** The invoice number for the sale. */
  invoiceNumber: string;
  /** The unique identifier of the customer who made the purchase. */
  customerId: string;
  /** The unique identifier of the employee who processed the sale. */
  employeeId: string;
  /** The unique identifier of the party from the sale occurred. */
  fromId: string;
  /** The type of party from which the sale occurred (e.g. "warehouse", "supplier"). */
  fromType: PartyType;
  /** The total retail sale price of all items sold. */
  retailSailPrice: number;
  /** The total discount amount applied to the sale. */
  discount: number;
  /** The net sale amount after any discounts or taxes have been applied. */
  netAmount: number;
  /** The individual items sold as part of the sale. */
  saleItems: SaleItem[];
  /** Indicates whether the sale has been paid for or not. */
  paid: boolean;
}

/**
 * Represents a single item sold as part of a sale.
 * @interface
 */
export interface SaleItem {
  /** The unique identifier of the product being sold. */
  productId: string;
  /** The quantity of the product being sold. */
  quantity: number;
}
