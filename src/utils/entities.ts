// TODO: remove them
import { Entity } from "@/graphql";
import { WithdrawStatusEnum } from "./enums";

export interface WithdrawRequestEntity extends Entity {
  amount?: string;
  status?: WithdrawStatusEnum;
  date?: Date;
}
