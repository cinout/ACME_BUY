import { WithdrawRequestEntity } from "@/utils/entities";
import { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";

interface RequestTableProps {
  requestStats: WithdrawRequestEntity[];
}

export default function RequestTable({ requestStats }: RequestTableProps) {
  const [itemSize, setItemSize] = useState(35); // Default item size

  // Adjust itemSize based on the window width
  useEffect(() => {
    const updateItemSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemSize(35); // Larger size for wider screens
      } else if (width < 1024 && width >= 640) {
        setItemSize(60);
      } else {
        setItemSize(80); // Smaller size for phones
      }
    };

    updateItemSize(); // Initial call
    window.addEventListener("resize", updateItemSize); // Listen to window resize
    return () => window.removeEventListener("resize", updateItemSize); // Cleanup
  }, []);

  return (
    <>
      <div className="grid grid-cols-[4fr_2fr_1fr_2fr_1fr] w-full text-white font-bold mt-8 text-xs sm:text-sm">
        <div> Request ID </div>
        <div> Amount </div>
        <div> Status </div>
        <div> Date </div>
        <div className="justify-self-center"> Action </div>
      </div>
      <FixedSizeList
        height={520}
        itemSize={itemSize} //TODO: change based on screen width
        width="100%"
        itemCount={requestStats.length}
        className="mt-2"
      >
        {(props: { index: number; style: React.CSSProperties }) => {
          const request = requestStats[props.index];

          return (
            <div
              style={props.style}
              className="grid grid-cols-[4fr_2fr_1fr_2fr_1fr] items-center content-center text-white text-xs sm:text-sm"
            >
              <span>{request?.id}</span>
              <span>AU$ {request?.amount}</span>
              <span>{request?.status}</span>
              <span>{new Date().toDateString()}</span>
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
