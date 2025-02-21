import { Tooltip } from "react-tooltip";

interface CustomTooltipProps {
  id: string;
  content: string;
}

export default function CustomTooltip({ id, content }: CustomTooltipProps) {
  return (
    <Tooltip
      id={id}
      place="bottom"
      content={content}
      style={{
        borderRadius: "6px",
        backgroundColor: "#277453",
        fontSize: "0.8rem",
        padding: "2px 8px",
      }}
    />
  );
}
