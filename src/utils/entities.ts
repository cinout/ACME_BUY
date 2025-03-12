// TODO: move each of them to their GQL file
import { Entity } from "@/graphql";
import { WithdrawStatusEnum } from "./enums";

export interface WithdrawRequestEntity extends Entity {
  amount?: string;
  status?: WithdrawStatusEnum;
  date?: Date;
}
