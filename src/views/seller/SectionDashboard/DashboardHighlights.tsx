import { ReactNode } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { AiOutlineProduct } from "react-icons/ai";

// TODO: fetch value from backend
export const hightlightStats = [
  {
    name: "Sale",
    value: "$3434",
    style: "bg-rose-300 text-rose-700 hover:bg-rose-400 transition",
    logo: <GiMoneyStack />,
  },
  {
    name: "Products",
    value: "50",
    style: "bg-orange-300 text-orange-700 hover:bg-orange-400 transition",
    logo: <AiOutlineProduct />,
  },
  {
    name: "Customers",
    value: "10",
    style: "bg-purple-300 text-purple-700 hover:bg-purple-400 transition",
    logo: <FaPeopleGroup />,
  },
  {
    name: "Orders",
    value: "54",
    style: "bg-cyan-300 text-cyan-700 hover:bg-cyan-400 transition",
    logo: <CiDeliveryTruck />,
  },
];

interface DashboardHighlightProps {
  name: string;
  value: string;
  logo: ReactNode;
  additionalStyle: string;
}

// TODO: make them interactive. Click on them triggers something
function Highlight({
  name,
  value,
  logo,
  additionalStyle,
}: DashboardHighlightProps) {
  return (
    <button
      className={`rounded-2xl w-36 h-20 ${additionalStyle} flex justify-between items-center p-2 border-white/50 border-4`}
    >
      <div className="flex-[1] text-2xl mr-3">{logo}</div>
      <div className="flex-[4] flex flex-col text-black">
        <span className="font-bold">{name}</span>
        <span className="text-lg font-bold">{value}</span>
      </div>
    </button>
  );
}

export default function DashboardHighlights() {
  return (
    <div className="grid grid-cols-1 stn:grid-cols-2 md:grid-cols-4 justify-center justify-items-center gap-2">
      {hightlightStats.map((a) => (
        <Highlight
          key={a.name}
          name={a.name}
          value={a.value}
          logo={a.logo}
          additionalStyle={a.style}
        />
      ))}
    </div>
  );
}
