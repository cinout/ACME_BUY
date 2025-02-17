import { UserEntity } from "@/utils/entities";
import { faker } from "@faker-js/faker";
import { Fragment, SetStateAction, useEffect, useRef } from "react";
import UserList from "./UserList";
import { iconDownWithCircle, iconUpWithCircle } from "@/utils/icons";

interface RightMessageContainerProps {
  userStats: UserEntity[];
  userId: string | undefined;
  showList: boolean;
  setShowList: React.Dispatch<SetStateAction<boolean>>;
}

function MessageUser({
  message,
  image,
  name,
}: {
  message: string;
  image: string;
  name: string;
}) {
  return (
    <div className="flex justify-start item-start gap-x-2 mr-16">
      <img
        src={image}
        alt={name}
        className="h-8 w-8 rounded-md shadow-md shadow-sky-900"
      />
      <span className="bg-sky-600/75 text-sky-50 text-sm rounded-md px-2 py-1">
        {message}
      </span>
    </div>
  );
}

function MessageAdmin({
  message,
  image,
  name,
}: {
  message: string;
  image: string;
  name: string;
}) {
  return (
    <div className="flex justify-end item-start gap-x-2 ml-16">
      <span className="bg-aqua-forest-600/75 text-aqua-forest-50 text-sm rounded-md px-2 py-1">
        {message}
      </span>
      <img
        src={image}
        alt={name}
        className="h-8 w-8 rounded-md shadow-md shadow-sky-900"
      />
    </div>
  );
}

export default function RightMessageContainer({
  userStats,
  userId,
  showList,
  setShowList,
}: RightMessageContainerProps) {
  const user = userStats.find((a) => a.id === userId);

  const listSearchRef = useRef<HTMLDivElement>(null);

  // Close List dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        listSearchRef.current &&
        !listSearchRef.current.contains(event.target as Node)
      ) {
        setShowList(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Head */}
      <div className="h-10 grid grid-cols-2 gap-x-3 px-4">
        <div>
          {user && (
            <div className="flex items-center gap-x-3">
              <img
                src={user.imageUrl}
                alt={user.firstname}
                className="h-10 w-10 rounded-md shadow-lg"
              />

              <span className="font-light text-sky-50">{user.firstname}</span>
            </div>
          )}
        </div>

        {/* Dropdown */}
        <div
          className="lg:hidden relative justify-self-end h-full w-72 flex justify-center items-end gap-x-2"
          ref={listSearchRef}
        >
          <input
            placeholder="find user..."
            name="search"
            type="text"
            className={
              "z-50 h-8 bg-sky-100 border-sky-800 border-2 box-content rounded-md px-4 text-sky-950 outline-none"
            }
          />

          <button
            className="z-50 text-[2.3rem] text-aqua-forest-400 hover:text-aqua-forest-500 transition "
            onClick={() => setShowList((v) => !v)}
          >
            {showList ? iconUpWithCircle() : iconDownWithCircle()}
          </button>

          {showList && (
            <div className="absolute w-full top-0 left-0 h-[60vh] pt-14 bg-sky-50/90 overflow-y-auto rounded-md">
              <UserList userStats={userStats} setShowList={setShowList} />
            </div>
          )}
        </div>
      </div>

      {/* Message Body */}
      {user && (
        <>
          <div className="flex-1 bg-sky-950 rounded-2xl p-4 text-sky-50 overflow-y-auto flex flex-col gap-y-6">
            {/* TODO: use real data */}
            {/* TODO: show the latest messages in the container, and scroll down to see eallier messages, like WeChat */}
            {Array.from({ length: 12 }, (v, i) => (
              <Fragment key={i}>
                <MessageUser
                  message={faker.lorem.text()}
                  image={user.imageUrl || ""}
                  name={user.firstname}
                />
                <MessageAdmin
                  message={faker.lorem.text()}
                  image={user.imageUrl || ""}
                  name={user.firstname}
                />
              </Fragment>
            ))}
          </div>

          {/* Type Message */}
          {/* TODO: implement message functionality */}
          <div className="h-10 flex justify-start items-center gap-x-3">
            <input
              placeholder="Message..."
              name="message"
              type="text"
              className={
                "h-full bg-sky-200 box-content rounded-md px-4 text-sky-950 w-full outline-none flex-1"
              }
            />

            <button className="h-full border-2 border-aqua-forest-100 px-2 bg-aqua-forest-500 text-aqua-forest-50 rounded-md font-semibold transition hover:bg-aqua-forest-400">
              Send
            </button>
          </div>
        </>
      )}
    </>
  );
}
