import {
  GQL_PRODUCT_GET_PRODUCT_AND_RELATED_DETAILS_BY_ID,
  ProductEntity,
} from "@/graphql/productGql";

import FullScreenImage from "@/views/shared_components/FullScreenImage";
import { useQuery } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainInfo from "./MainInfo";
import MainImage from "./MainImage";
import GuessYouLike from "./GuessYouLike";
import { albumCoverImageLarge } from "@/utils/strings";

export default function ProductPage() {
  /**
   * GQL
   */
  const { productId } = useParams();
  const gqlgetProductAndRelatedDetailsById = useQuery(
    GQL_PRODUCT_GET_PRODUCT_AND_RELATED_DETAILS_BY_ID,
    {
      skip: !productId,
      variables: { id: productId },
    }
  );
  const product = gqlgetProductAndRelatedDetailsById?.data
    ?.getProductAndRelatedDetailsById as ProductEntity;

  /**
   * State
   */

  const [fullScreenImage, setFullScreenImage] = useState<{
    url: string | undefined;
    name: string | undefined;
  } | null>(null);

  return (
    <div>
      {/* PRoduct Panel */}
      {product ? (
        <div>
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-16">
            {/* LEFT */}
            <MainImage
              product={product}
              setFullScreenImage={setFullScreenImage}
            />

            {/* RIGHT */}
            <MainInfo product={product} />

            {/* Full-screen */}
            <Dialog
              open={!!fullScreenImage}
              onClose={() => {
                setFullScreenImage(null);
              }}
              className="relative z-[60]"
            >
              <FullScreenImage
                setFullScreenImage={setFullScreenImage}
                url={albumCoverImageLarge(fullScreenImage?.url)}
                name={fullScreenImage?.name}
              />
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="h-[100vh]"></div>
      )}

      {/* Guess you like */}
      <GuessYouLike />
    </div>
  );
}
