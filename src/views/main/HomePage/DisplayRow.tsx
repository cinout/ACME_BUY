import useHookCheckInView from "@/customHooks/useHookCheckInView";
import useHookMultipleImageLoading from "@/customHooks/useHookMultipleImageLoading";
import { ProductEntity } from "@/graphql/productGql";
import { iconGoRightWithoutCircle } from "@/utils/icons";
import { albumCoverImageLarge, shortenMiddle } from "@/utils/strings";
import { useRef } from "react";
import { Link } from "react-router-dom";

interface Props {
  data: ProductEntity[];
  count: number;
  title: string;
  goto: string;
}

const cssTextSizeWithScreen =
  "text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl";

const cssContainerSizeWithScreen =
  "h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-44 lg:w-44 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64";

const cssContainerPlaceholder = `h-full w-full bg-aqua-forest-50`;

// TODO:[1] float fade in effect
export default function DisplayRow({ data, count, title, goto }: Props) {
  const { getImageRefMap, imageGridOnLoad } = useHookMultipleImageLoading(
    data?.map((a) => a.id) || []
  );
  const { elementRef, inView } = useHookCheckInView();

  const spanTitleRefs = useRef<Map<string, HTMLSpanElement | null>>(null);
  function getSpanTitleRefMap() {
    if (!spanTitleRefs.current) {
      // Initialize the Map on first usage.
      spanTitleRefs.current = new Map();
    }
    return spanTitleRefs.current;
  }
  const spanArtistRefs = useRef<Map<string, HTMLSpanElement | null>>(null);
  function getSpanArtistRefMap() {
    if (!spanArtistRefs.current) {
      // Initialize the Map on first usage.
      spanArtistRefs.current = new Map();
    }
    return spanArtistRefs.current;
  }

  return (
    <div
      className="flex w-full gap-x-4 items-center font-arsenal-spaced-1"
      ref={elementRef}
    >
      {/* Left-most title */}
      <Link
        className={`group bg-radial from-aqua-forest-400 via-aqua-forest-300 to-aqua-forest-100 rounded-none flex flex-col gap-y-4 justify-center items-center text-center transition-all duration-300 ${cssContainerSizeWithScreen} ${
          inView ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
        }`}
        to={goto}
      >
        <div className="text-base md:text-xl xl:text-2xl text-aqua-forest-950 font-semibold">
          {title}
        </div>

        <div
          className={`text-aqua-forest-950 gap-x-1 group-hover:text-aqua-forest-50 group-hover:gap-x-3 transition-all duration-300 relative w-full flex items-center justify-center ${cssTextSizeWithScreen}`}
        >
          <div className="z-10">See all</div>
          <div className="z-10">{iconGoRightWithoutCircle()}</div>
          <div className="absolute top-0 left-0 h-full w-0 group-hover:w-full group-hover:bg-sky-800 transition-all duration-300" />
        </div>
      </Link>

      {/* Options */}
      <div className="flex-1 flex justify-around">
        {(data || Array.from({ length: count }))?.map((product, index) => (
          <Link
            to={`/product/${product?.id}`}
            key={product ? product.id : index}
            className={`group relative overflow-hidden rounded-none bg-radial from-aqua-forest-400 via-aqua-forest-300 to-aqua-forest-100 transition-all duration-300 ${cssContainerSizeWithScreen} ${
              inView ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
            } ${index === 3 && "hidden sm:inline-block"} ${
              index === 2 && "hidden tn:inline-block"
            }`}

            // onMouseEnter={() => {
            //   const spanTitle = getSpanTitleRefMap().get(product.id);
            //   const spanArtist = getSpanArtistRefMap().get(product.id);
            //   if (spanTitle) {
            //     spanTitle.style.animationDuration = "1000";
            //     spanTitle.style.animationDelay = "1000";
            //   }
            //   if (spanArtist) {
            //     spanArtist.style.animationDuration = "1000";
            //     spanArtist.style.animationDelay = "1000";
            //   }
            // }}
            // onMouseLeave={() => {
            //   const spanTitle = getSpanTitleRefMap().get(product.id);
            //   const spanArtist = getSpanArtistRefMap().get(product.id);
            //   if (spanTitle) {
            //     spanTitle.style.animationDuration = "0";
            //     spanTitle.style.animationDelay = "0";
            //   }
            //   if (spanArtist) {
            //     spanArtist.style.animationDuration = "0";
            //     spanArtist.style.animationDelay = "0";
            //   }
            //   setTimeout(() => {
            //     if (spanTitle) {
            //       // spanTitle.style.animationDuration = "1000";
            //       spanTitle.style.animationDelay = "1000";
            //     }
            //     if (spanArtist) {
            //       // spanArtist.style.animationDuration = "1000";
            //       spanArtist.style.animationDelay = "1000";
            //     }
            //   }, 1000);
            // }}
          >
            {product ? (
              imageGridOnLoad.get(product.id) ? (
                <div className={cssContainerPlaceholder} />
              ) : (
                <>
                  <div
                    className={`w-full h-full bg-white flex justify-center items-center`}
                  >
                    <img
                      src={albumCoverImageLarge(product.images[0]?.file)}
                      alt={product.name}
                      className="rounded-none object-contain transition-all duration-300"
                      ref={(node) => {
                        const map = getImageRefMap();
                        map.set(product.id, node);
                        return () => {
                          // called when removing
                          map.delete(product.id);
                        };
                      }}
                    />
                  </div>

                  <div
                    className={`absolute top-0 left-0 h-full right-full group-hover:right-0 overflow-x-hidden bg-aqua-forest-200/60 backdrop-blur-md flex flex-col justify-center items-center text-center text-aqua-forest-950 font-arsenal transition-all duration-300 ${cssTextSizeWithScreen}`}
                  >
                    {/* TODO:[1] can you set differetn duration&delay for forward and backward transition? */}
                    <span
                      className="opacity-0 group-hover:opacity-100 transition duration-300 delay-300"
                      ref={(node) => {
                        const map = getSpanTitleRefMap();
                        map.set(product.id, node);
                        return () => {
                          // called when removing
                          map.delete(product.id);
                        };
                      }}
                    >
                      {shortenMiddle(product.name, 40)}
                    </span>
                    {/* opacity-0 group-hover:opacity-100 transition duration-300 delay-300 */}
                    <span
                      className="text-xs md:text-sm opacity-0 group-hover:opacity-100 transition duration-300 delay-300"
                      ref={(node) => {
                        const map = getSpanArtistRefMap();
                        map.set(product.id, node);
                        return () => {
                          // called when removing
                          map.delete(product.id);
                        };
                      }}
                    >
                      {shortenMiddle(product.artist, 40)}
                    </span>
                  </div>
                </>
              )
            ) : (
              <div className={cssContainerPlaceholder} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
