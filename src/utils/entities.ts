// TODO: think about how to define each entity and their relationship
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  SellerStatusEnum,
  WithdrawStatusEnum,
} from "./enums";

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
  payment_status: PaymentStatusEnum;
  order_status: OrderStatusEnum;
  details: OrderDetailsEntity[];
}

export interface WithdrawRequestEntity {
  id: string;
  amount: string;
  status: WithdrawStatusEnum;
  date: Date;
}

export interface SellerEntity {
  id: string;
  name: string;
  email: string;
  country: string;
  state: string; // equivalent to province / region
  city: string;
  zipCode: string;
  image: string;
  status: SellerStatusEnum;
  requestDate: Date;
  shops?: ShopEntity[]; // TODO: each seller can only own one shop, to ensure they don't abuse the platform
}

// Each seller can have multiple shops
export interface ShopEntity {
  id: string;
  name: string;
  image: string;
}

export interface Message {
  id: string;
}
