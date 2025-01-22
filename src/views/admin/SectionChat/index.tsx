import { SellerEntity } from "@/utils/entities";
import { SellerStatusEnum } from "@/utils/enums";
import { faker } from "@faker-js/faker";
import { Input } from "@headlessui/react";

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
  return (
    <div className="flex w-full h-full gap-x-4">
      {/* Left: Sellers */}
      <div className="hidden lg:block relative flex-[1] bg-white/50 h-full rounded-lg py-4 overflow-y-auto">
        {/* TODO: implement search User */}
        <div className="sticky flex justify-center px-4 top-0">
          <Input
            placeholder="find seller..."
            name="search"
            type="text"
            className={
              "h-[2rem] bg-sky-200 border-sky-800 border-2 box-content rounded-md px-4 text-sky-950 w-full outline-none"
            }
          />
        </div>

        {/* Sellers */}
        <div className="mt-6">
          {sellerStats.map((seller) => (
            <button
              key={seller.id}
              className="flex w-full p-2 items-center gap-x-1 lg:gap-x-3 text-xs lg:text-sm hover:bg-sky-100 rounded-md transition"
            >
              <img
                src={seller?.image}
                alt={seller?.name}
                className="w-10 h-10 rounded-md shadow-xl"
              />

              <span className="hidden sm:block text-left">{seller?.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Messages */}
      <div className="flex-[4] bg-white/75 h-full rounded-lg p-4 overflow-y-auto">
        Content
      </div>
    </div>
  );
}
