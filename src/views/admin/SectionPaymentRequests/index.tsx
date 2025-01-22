import { useState } from "react";
import { faker } from "@faker-js/faker";
import Head from "./Head";
import RequestTable from "./RequestTable";
import { WithdrawStatus } from "@/utils/enums";
import { WithdrawRequest } from "@/utils/entities";

// TODO: fetch from server
const requestStats: WithdrawRequest[] = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  amount: faker.commerce.price(),
  status: WithdrawStatus.Pending,
  date: faker.date.recent(),
}));

export default function SectionSectionPaymentRequests() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Head searchValue={searchValue} setSearchValue={setSearchValue} />
      <RequestTable requestStats={requestStats} />
    </>
  );
}
