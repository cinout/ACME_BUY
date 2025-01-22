import { WithdrawRequest } from "@/utils/entities";
import { FixedSizeList } from "react-window";

interface RequestTableProps {
  requestStats: WithdrawRequest[];
}

export default function RequestTable({ requestStats }: RequestTableProps) {
  return (
    <>
      <div className="grid grid-cols-[4fr_2fr_1fr_2fr_1fr] w-full text-white text-sm font-bold mt-8">
        <div> Request ID </div>
        <div> Amount </div>
        <div> Status </div>
        <div> Date </div>
        <div className="justify-self-center"> Action </div>
      </div>
      <FixedSizeList
        height={500}
        itemSize={35}
        width="100%"
        itemCount={requestStats.length}
        className="mt-2"
      >
        {(props: { index: number; style: React.CSSProperties }) => {
          const request = requestStats[props.index];

          return (
            <div
              style={props.style}
              className="grid grid-cols-[4fr_2fr_1fr_2fr_1fr] items-center content-center text-sm text-white "
            >
              <span>{request?.id}</span>
              <span>AU$ {request?.amount}</span>
              <span>{request?.status}</span>
              <span>{request?.date.toDateString()}</span>
              <span className="justify-self-center">
                {/* TODO: implement it */}
                <button className="bg-slate-100 text-sky-900 border-2 border-slate-300 rounded-md  hover:bg-sky-200 hover:border-sky-500">
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
