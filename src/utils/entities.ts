// TODO: think about how to define each entity and their relationship
// TODO: move each of them to their GQL file
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  RoleEnum,
  UserSignupMethodEnum,
  UserStatusEnum,
  WithdrawStatusEnum,
} from "./enums";

export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserEntity extends Entity {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  country: string;
  state: string; // equivalent to province / region
  city: string;
  zipCode: string;

  status: UserStatusEnum;
  signupMethod: UserSignupMethodEnum;
  shopName?: string;
  role: RoleEnum;

  imageUrl?: string;
  imageName?: string;
  rating: number; // TODO: implement rating
  wishList?: string[];
}

export interface GenreEntity extends Entity {
  name: string;
  imageUrl?: string;
  imageName?: string;
}

export interface ProductEntity extends Entity {
  name: string;
  artist: string;
  stock: number;
  price: number;
  discount: number;
  description?: string;
  genreIds: string;
  tracklist?: { id: string; title: string; indexDisplay: string }[];
  genre?: GenreEntity;
  userId: string;
  user?: UserEntity;
  images: { id: string; file: string; name: string }[];
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
