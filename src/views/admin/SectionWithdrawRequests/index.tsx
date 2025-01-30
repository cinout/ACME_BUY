import { useState } from "react";
import { faker } from "@faker-js/faker";
import Head from "./Head";
import RequestTable from "./RequestTable";
import { WithdrawStatusEnum } from "@/utils/enums";
import { WithdrawRequestEntity } from "@/utils/entities";

// TODO: fetch from server
const requestStats: WithdrawRequestEntity[] = Array.from(
  { length: 100 },
  () => ({
    id: faker.string.uuid(),
    createdAt: faker.date.recent(),
    amount: faker.commerce.price(),
    status: WithdrawStatusEnum.Pending,
    date: faker.date.recent(),
  })
);

// TODO: show different actions based on the Status
// TODO: create a view details button

export default function SectionSectionWithdrawRequestEntitys() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Head searchValue={searchValue} setSearchValue={setSearchValue} />
      <RequestTable requestStats={requestStats} />
    </>
  );
}
