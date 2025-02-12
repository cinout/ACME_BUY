import { useState } from "react";
import { faker } from "@faker-js/faker";
import Head from "./Head";
import RequestTable from "./RequestTable";
import { SellerSignupMethodEnum, SellerStatusEnum } from "@/utils/enums";
import { SellerEntity, ShopEntity } from "@/utils/entities";
import { getRandomInt } from "@/utils/numbers";

// TODO: fetch from server
const sellerRequestStats: SellerEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  createdAt: faker.date.recent(),

  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  country: faker.location.country(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),
  status: SellerStatusEnum.Pending,
  signupMethod: SellerSignupMethodEnum.Default,
  shopName: faker.company.name(),

  image: faker.image.avatar(),
  // shops: Array.from(
  //   { length: getRandomInt(0, 14) },
  //   () =>
  //     ({
  //       id: faker.string.uuid(),
  //       name: faker.company.name(),
  //       image: faker.image.avatar(),
  //     } as ShopEntity)
  // ),
}));

export default function SectionSellerRequests() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Head searchValue={searchValue} setSearchValue={setSearchValue} />
      <RequestTable sellerRequestStats={sellerRequestStats} />
    </>
  );
}
