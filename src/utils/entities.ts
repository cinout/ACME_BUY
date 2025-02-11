// TODO: think about how to define each entity and their relationship
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  SellerSignupMethodEnum,
  SellerStatusEnum,
  WithdrawStatusEnum,
} from "./enums";

export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  // createdBy?: string;
  // updatedBy?: string;
}

export interface SellerEntity extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  country: string;
  state: string; // equivalent to province / region
  city: string;
  zipCode: string;

  status: SellerStatusEnum;
  signupMethod: SellerSignupMethodEnum;

  image?: string;
}

export interface AdminEntity extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  image?: string;
}

export interface CategoryEntity extends Entity {
  name: string;
  imageUrl?: string;
  imageName?: string;
}

export interface ProductEntity extends Entity {
  name: string;
  brand: string;
  category: string; //TODO: remoce this field
  stock: number;
  price: number;
  discount: number;
  description?: string;
  categoryId?: string;
  sellerId?: string;
  images?: { id: string; file: string; name: string }[];
  rating?: number; // TODO: implement rating
}

interface OrderDetailsEntity extends Entity {
  product_id?: string;
  product_name?: string;
  sellor_id?: string;
  sellor_name?: string;
  price?: string;
}

export interface OrderEntity extends Entity {
  price?: string;
  payment_status?: PaymentStatusEnum;
  order_status?: OrderStatusEnum;
  details: OrderDetailsEntity[];
}

export interface WithdrawRequestEntity extends Entity {
  amount?: string;
  status?: WithdrawStatusEnum;
  date?: Date;
}

// Each seller can have multiple shops
export interface ShopEntity extends Entity {
  name?: string;
  image?: string;
}

// export interface MessageEntity extends Entity {

// }
