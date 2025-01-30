import { BeatLoader } from "react-spinners";

export default function LoadingIndicator() {
  return (
    <BeatLoader
      cssOverride={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      color="white"
    />
  );
}
