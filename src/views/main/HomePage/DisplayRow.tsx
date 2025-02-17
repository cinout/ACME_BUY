import { ProductEntity } from "@/utils/entities";
import { iconGoRightWithoutCircle } from "@/utils/icons";
import { albumCoverImageLarge, shortenMiddle } from "@/utils/strings";

interface Props {
  data: ProductEntity[];
  count: number;
  title: string;
}

const cssTextWithScreen =
  "text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl";

const cssContainerSizeWithScreen =
  "h-20 w-20 md:h-32 md:w-32 lg:h-44 lg:w-44 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64";

// TODO:[1] float fade in effect
export default function DisplayRow({ data, count, title }: Props) {
  return (
    <div className="flex w-full gap-x-4 items-center font-arsenal-spaced-1">
      {/* Left-most title */}
      <button
        className={`group bg-radial from-aqua-forest-400 via-aqua-forest-300 to-aqua-forest-100 rounded-none flex flex-col gap-y-4 justify-center items-center text-center transition-all duration-300 ${cssContainerSizeWithScreen}`}
      >
        <div className="text-base md:text-xl xl:text-2xl text-aqua-forest-950">
          {title}
        </div>

        <div
          className={`text-aqua-forest-950 gap-x-1 group-hover:text-aqua-forest-50 group-hover:gap-x-3 transition-all duration-300 relative w-full flex items-center justify-center ${cssTextWithScreen}`}
        >
          <div className="z-10">See all</div>
          <div className="z-10">{iconGoRightWithoutCircle()}</div>
          <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full group-hover:bg-aqua-forest-700 transition-all duration-300" />
        </div>
      </button>

      {/* Options */}
      <div className="flex-1 flex justify-around">
        {(data || Array.from({ length: count }))?.map((product, index) => (
          <button
            key={product ? product.id : index}
            className={`group relative overflow-hidden rounded-none bg-radial from-aqua-forest-400 via-aqua-forest-300 to-aqua-forest-100 hover:p-1 lg:hover:p-2 transition-all duration-300 ${cssContainerSizeWithScreen}`}
          >
            {product ? (
              <>
                <div className="w-full h-full bg-white group-hover:brightness-[20%] flex justify-center items-center">
                  <img
                    src={albumCoverImageLarge(product.images[0]?.file)}
                    alt={product.name}
                    className="rounded-none w-full transition-all duration-300"
                  />
                </div>
                <span
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full p-2 text-white font-arsenal whitespace-break-spaces opacity-0 group-hover:opacity-100 transition duration-300 ${cssTextWithScreen}`}
                >
                  {shortenMiddle(product.name, 40)}
                </span>
              </>
            ) : (
              <span />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
