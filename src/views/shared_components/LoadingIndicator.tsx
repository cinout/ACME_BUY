import { BeatLoader } from "react-spinners";

// To show in button
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
