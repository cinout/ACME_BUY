import useHookMultipleImageLoading from "@/customHooks/useHookMultipleImageLoading";
import { GQL_PRODUCT_GET_SIMILAR, ProductEntity } from "@/graphql/productGql";
import { calculateDiscountedPriceAndReturnString } from "@/utils/numbers";
import { albumCoverImageLarge } from "@/utils/strings";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const COUNT = 4;
const cssPlaceholderContainer = "w-full aspect-square bg-aqua-forest-50";

export default function GuessYouLike() {
  /**
   * GQL
   */
  const gqlProductGetSimilar = useQuery(GQL_PRODUCT_GET_SIMILAR, {
    variables: {
      count: COUNT,
    },
  });
  const similarProducts = gqlProductGetSimilar.data
    ?.getSimilar as ProductEntity[];

  /**
   * Hook
   */
  const { getImageRefMap, imageGridOnLoad } = useHookMultipleImageLoading(
    similarProducts?.map((a) => a.id) || []
  );

  return (
    <div className="w-full my-24">
      {/* Text */}
      <div className="flex justify-center text-xl tn:text-2xl md:text-[2rem] font-arsenal-spaced-1 font-bold text-aqua-forest-700 mb-12">
        You may also like
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center place-items-start">
        {(similarProducts || Array.from({ length: COUNT })).map(
          (product, index) => (
            <div
              key={product?.id ?? index}
              className={`font-arsenal-spaced-1 text-left w-32 tn:w-40 sm:w-52 md:w-44 lg:w-52 xl:w-60 2xl:w-72 ${
                product ? "bg-white" : "bg-aqua-forest-50"
              }`}
            >
              {product ? (
                <>
                  {imageGridOnLoad.get(product.id) ? (
                    <div className={cssPlaceholderContainer} />
                  ) : (
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full aspect-square"
                    >
                      <img
                        src={albumCoverImageLarge(product.images[0]?.file)}
                        alt={product.name}
                        className="w-full aspect-square object-contain"
                        ref={(node) => {
                          const map = getImageRefMap();
                          map.set(product.id, node);
                          return () => {
                            // called when removing
                            map.delete(product.id);
                          };
                        }}
                      />
                    </Link>
                  )}
                  <div className="text-aqua-forest-900 text-lg">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full aspect-square hover:underline"
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className="text-aqua-forest-700">
                    $
                    {calculateDiscountedPriceAndReturnString(
                      product.price,
                      product.discount
                    )}
                  </div>
                </>
              ) : (
                <div className={cssPlaceholderContainer} />
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
