import { UserEntity } from "@/utils/entities";
import { RoleEnum, UserSignupMethodEnum, UserStatusEnum } from "@/utils/enums";
import { faker } from "@faker-js/faker";
import UserList from "./UserList";
import RightMessageContainer from "./RightMessageContainer";
import { useParams } from "react-router-dom";
import { useState } from "react";

// TODO: fetch from server
const userStats: UserEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  createdAt: faker.date.recent(),

  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),

  country: faker.location.country(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),

  status: UserStatusEnum.Active,
  signupMethod: UserSignupMethodEnum.Default,
  shopName: faker.company.name(),
  role: RoleEnum.User,
  rating: 0,

  image: faker.image.avatar(),
}));

export default function SectionChat() {
  const { userId } = useParams();
  const [showList, setShowList] = useState(false);

  return (
    <div className="flex w-full h-full gap-x-4">
      {/* Left: Users */}
      <div className="hidden lg:block relative flex-[1] bg-white/50 h-full rounded-lg py-4 overflow-y-auto">
        <div className="sticky flex justify-center px-4 top-0">
          <input
            placeholder="find user..."
            name="search"
            type="text"
            className={
              "h-[2rem] bg-sky-100 border-sky-800 border-2 box-content rounded-md px-4 text-sky-950 w-full outline-none"
            }
          />
        </div>
        <div className="mt-6">
          <UserList userStats={userStats} />
        </div>
      </div>

      {/* Right: Messages */}
      <div className="flex-[4] h-full rounded-lg flex flex-col gap-y-4">
        <RightMessageContainer
          userId={userId}
          userStats={userStats}
          showList={showList}
          setShowList={setShowList}
        />
      </div>
    </div>
  );
}
