import Menu from "@/components/Menu";
import { useParams } from "react-router-dom";

export default function AboutPage() {
  const { id, name } = useParams();
  return (
    <div>
      <Menu />
      AboutPage
      <p>Id: {id}</p>
      <p>Name: {name}</p>
    </div>
  );
}
