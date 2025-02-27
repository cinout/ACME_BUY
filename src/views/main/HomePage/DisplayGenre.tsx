import useHookCheckInView from "@/customHooks/useHookCheckInView";
import { GenreEntity } from "@/utils/entities";
import { Link } from "react-router-dom";

const cssTextSizeWithScreen =
  "text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl";

interface Props {
  genre: GenreEntity;
}
export default function DisplayGenre({ genre }: Props) {
  const { elementRef, inView } = useHookCheckInView();

  return (
    <Link
      className={`group relative text-center aspect-square flex flex-col justify-center items-center box-content border-[0.5rem] gradient-border overflow-hidden transition-all duration-500 ${
        inView ? "translate-y-0  opacity-100" : "-translate-y-8 opacity-0"
      }`}
      ref={elementRef}
      to={`collection?genre=${encodeURIComponent(genre.name)}`}
    >
      <img
        src={genre.imageUrl}
        alt={genre.name}
        className="absolute -z-10 w-full h-full box-border object-cover brightness-[40%] group-hover:scale-110 group-hover:brightness-[70%] transition-all duration-300"
      />

      <span
        className={`z-10 font-arsenal md:font-arsenal-spaced-2 text-aqua-forest-50 ${cssTextSizeWithScreen}`}
      >
        {genre.name}
      </span>
    </Link>
  );
}
