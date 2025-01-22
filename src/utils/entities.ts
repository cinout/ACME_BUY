import { OrderStatus, PaymentStatus, WithdrawStatus } from "./enums";

export interface CategoryEntity {
  id: string;
  name: string;
  image: string;
}

interface OrderDetailsEntity {
  product_id: string;
  product_name: string;
  sellor_id: string;
  sellor_name: string;
  price: string;
}

export interface OrderEntity {
  id: string;
  price: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  details: OrderDetailsEntity[];
}

export interface WithdrawRequest {
  id: string;
  amount: string;
  status: WithdrawStatus;
  date: Date;
}

export interface SellerEntity {
  id: string;
  name: string; // TODO: owner might have another table
  email: string;
  country: string;
  state: string; // TODO: equivalent to province / region
  city: string;
  zipCode: string;
  image: string;
  shops?: ShopEntity[];
}

// Each seller can have multiple shops
export interface ShopEntity {
  id: string;
  name: string;
  image: string;
}
