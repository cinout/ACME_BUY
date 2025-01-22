import seller from "@/assets/images/seller.png";
import { joinUrl, shortenEnd } from "@/utils/strings";
import { faker } from "@faker-js/faker";
import { Link, useLocation } from "react-router-dom";

// TODO: fetch from backend
const messageStats = [
  {
    id: "sample_id_1",
    image: seller,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    message: faker.lorem.lines(2),
  },
  {
    id: "sample_id_2",
    image: seller,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    message: faker.lorem.lines(2),
  },
  {
    id: "sample_id_3",
    image: seller,
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    message: "Ok.",
    // message: faker.lorem.lines(2),
  },
];

interface MessageProps {
  image: string;
  firstname: string;
  lastname: string;
  message: string;
}

function Message({ image, firstname, lastname, message }: MessageProps) {
  return (
    <div className="flex my-4 justify-start text-white">
      {/* Name and Image */}
      <div className="w-1/5 inline-flex flex-col justify-start items-center">
        <img
          src={image}
          alt="seller image"
          className="w-[2.375rem] h-[2.375rem] rounded-full "
        />
        <span className="text-xs">{shortenEnd(firstname, 20)}</span>
        <span className="text-xs">{shortenEnd(lastname, 20)}</span>
      </div>

      {/* Message */}
      <div className="w-4/5 inline-flex ml-4 h-[5rem] bg-slate-900 rounded-2xl py-2 px-3  overflow-hidden text-sm">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default function RecentMessages() {
  const { pathname } = useLocation();
  return (
    <div className="w-full lg:flex-1 bg-white/5 rounded-2xl px-4 py-2">
      <div className="text-white font-semibold flex justify-between">
        <span>Recent Messages</span>
        <Link to={joinUrl(pathname, "chat")}>View all</Link>{" "}
        {/* TODO: implement View All function */}
      </div>

      <div>
        {messageStats.map((stat) => (
          <Message
            key={stat.id}
            image={stat.image}
            firstname={stat.firstname}
            lastname={stat.lastname}
            message={stat.message}
          />
        ))}
      </div>
    </div>
  );
}
