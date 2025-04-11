import { UserEntity } from "@/graphql/userGql";
import { joinUrl } from "@/utils/strings";
import { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface UserListProps {
  userStats: UserEntity[];
  setShowList?: React.Dispatch<SetStateAction<boolean>>;
}

// TODO:[2] implement search User
// TODO:[2] implement filter & sort

const baseUrl = "/admin/chat";

export default function UserList({ userStats, setShowList }: UserListProps) {
  const navigate = useNavigate();

  function handleClick(id: string) {
    if (setShowList) {
      setShowList(false);
    }
    void navigate(joinUrl(baseUrl, id));
  }

  return (
    <>
      {userStats.map((user) => (
        <button
          key={user.id}
          className="flex w-full p-2 items-center gap-x-1 lg:gap-x-3 text-xs lg:text-sm hover:bg-sky-100 rounded-md"
          onClick={() => handleClick(user.id)}
        >
          <img
            src={user?.imageUrl}
            alt={user?.firstname}
            className="w-10 h-10 rounded-md shadow-xl"
          />
          <span className="hidden sm:block text-left">{user?.firstname}</span>
        </button>
      ))}
    </>
  );
}
