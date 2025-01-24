import { SellerEntity } from "@/utils/entities";
import { SellerStatusEnum } from "@/utils/enums";
import { faker } from "@faker-js/faker";
import SellerList from "./SellerList";
import RightMessageContainer from "./RightMessageContainer";
import { useParams } from "react-router-dom";
import { Input } from "@headlessui/react";
import { useState } from "react";

// TODO: fetch from server
const sellerStats: SellerEntity[] = Array.from({ length: 34 }, () => ({
  id: faker.string.uuid(),
  image: faker.image.avatar(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  country: faker.location.country(),
  state: faker.location.state(),
  city: faker.location.city(),
  zipCode: faker.location.zipCode(),
  status: SellerStatusEnum.Active,
  requestDate: faker.date.recent(),
}));

export default function SectionChat() {
  const { sellerId } = useParams();
  const [showList, setShowList] = useState(false);

  return (
    <div className="flex w-full h-full gap-x-4">
      {/* Left: Sellers */}
      <div className="hidden lg:block relative flex-[1] bg-white/50 h-full rounded-lg py-4 overflow-y-auto">
        <div className="sticky flex justify-center px-4 top-0">
          <Input
            placeholder="find seller..."
            name="search"
            type="text"
            className={
              "h-[2rem] bg-sky-100 border-sky-800 border-2 box-content rounded-md px-4 text-sky-950 w-full outline-none"
            }
          />
        </div>
        <div className="mt-6">
          <SellerList sellerStats={sellerStats} />
        </div>
      </div>

      {/* Right: Messages */}
      <div className="flex-[4] h-full rounded-lg flex flex-col gap-y-4">
        <RightMessageContainer
          sellerId={sellerId}
          sellerStats={sellerStats}
          showList={showList}
          setShowList={setShowList}
        />
      </div>
    </div>
  );
}
