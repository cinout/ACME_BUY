import { useState } from "react";
import { faker } from "@faker-js/faker";
import Head from "./Head";
import RequestTable from "./RequestTable";
import {
  RoleEnum,
  UserEntity,
  UserSignupMethodEnum,
  UserStatusEnum,
} from "@/graphql/userGql";

// TODO: fetch from server
const userRequestStats: UserEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  createdAt: faker.date.recent().toDateString(),

  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  country: faker.location.country(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),
  status: UserStatusEnum.Pending,
  signupMethod: UserSignupMethodEnum.Default,
  shopName: faker.company.name(),
  role: RoleEnum.User,
  rating: 0,

  image: faker.image.avatar(),
}));

export default function SectionUserRequests() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Head searchValue={searchValue} setSearchValue={setSearchValue} />
      <RequestTable userRequestStats={userRequestStats} />
    </>
  );
}
