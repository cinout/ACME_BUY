import { BeatLoader } from "react-spinners";

export default function LoadingIndicatorWithDiv() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <BeatLoader
        cssOverride={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        color="white"
      />
    </div>
  );
}
