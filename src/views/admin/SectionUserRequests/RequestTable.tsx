import { UserEntity } from "@/utils/entities";
import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";

interface RequestTableProps {
  userRequestStats: UserEntity[];
}

// TODO: rethink about the layout and user logic
export default function RequestTable({ userRequestStats }: RequestTableProps) {
  const [itemSize, setItemSize] = useState(50); // Default item size

  // Adjust itemSize based on the window width
  useEffect(() => {
    const updateItemSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // > lg
        setItemSize(50); // Larger size for wider screens
      } else if (width < 1024 && width >= 640) {
        // sm - lg
        setItemSize(60);
      } else {
        // <sm
        setItemSize(80); // Smaller size for phones
      }
    };

    updateItemSize(); // Initial call
    window.addEventListener("resize", updateItemSize); // Listen to window resize
    return () => window.removeEventListener("resize", updateItemSize); // Cleanup
  }, []);

  return (
    <>
      <div className="grid grid-cols-[1fr_2fr_2fr_1fr] sm:grid-cols-[4fr_2fr_2fr_1fr] w-full text-white text-sm font-bold mt-8">
        <div> Info </div>
        <div> District </div>
        <div> Request Date </div>
        <div className="justify-self-center"> Action </div>
      </div>
      <FixedSizeList
        height={520}
        itemSize={itemSize}
        width="100%"
        itemCount={userRequestStats.length}
        className="mt-2"
      >
        {(props: { index: number; style: React.CSSProperties }) => {
          const user = userRequestStats[props.index];

          return (
            <div
              style={props.style}
              className="grid grid-cols-[1fr_2fr_2fr_1fr] sm:grid-cols-[4fr_2fr_2fr_1fr] items-center content-center  text-white text-xs sm:text-sm"
            >
              {/* Info */}
              <div className="flex items-center gap-3">
                <img
                  src={user?.imageUrl}
                  alt={user?.firstname}
                  className="w-10 h-10 rounded-md"
                />

                <div className="hidden sm:block">
                  <div>{user?.firstname}</div>
                  <div className="italic text-xs text-sky-200">
                    {user?.email}
                  </div>
                </div>
              </div>

              {/* District */}
              <div className="flex flex-col items-start">
                {user?.city + ", " + user?.state + ", " + user?.country}
              </div>

              {/* Date */}
              <span>{user?.createdAt.toDateString()}</span>

              {/* Action */}
              <span className="justify-self-center">
                {/* TODO: implement it */}
                <button className="bg-slate-100 text-sky-900 border-2 border-slate-300 rounded-md text-xs px-1 py-[0.1rem] hover:bg-sky-200 hover:border-sky-500">
                  Approve
                </button>
              </span>
            </div>
          );
        }}
      </FixedSizeList>
    </>
  );
}
