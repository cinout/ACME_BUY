import { GQL_PRODUCT_GET_BY_ID } from "@/graphql/productGql";
import { ProductEntity } from "@/utils/entities";
import FullScreenImage from "@/views/shared_components/FullScreenImage";
import { useQuery } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainInfo from "./MainInfo";
import MainImage from "./MainImage";
import GuessYouLike from "./GuessYouLike";

export default function ProductPage() {
  /**
   * GQL
   */
  const { productId } = useParams();
  const gqlProductGetById = useQuery(GQL_PRODUCT_GET_BY_ID, {
    skip: !productId,
    variables: { id: productId },
  });
  const product = gqlProductGetById?.data?.getById as ProductEntity;

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
                url={fullScreenImage?.url}
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
