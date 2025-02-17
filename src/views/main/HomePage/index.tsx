import { useQuery } from "@apollo/client";
import newArrivalImage from "@/assets/images/illustration_1.svg";
import { GQL_PRODUCT_GET_NEWEST } from "@/graphql/productGql";
import { ProductEntity } from "@/utils/entities";
import DisplayRow from "./DisplayRow";

const COUNT = 4;

export default function HomePage() {
  const gqlProductGetNewest = useQuery(GQL_PRODUCT_GET_NEWEST, {
    variables: { count: COUNT },
  });

  return (
    <div className="flex flex-col gap-y-10 justify-center w-full">
      {/* TODO:[3] update */}

      <div className="group relative flex justify-around items-center w-full">
        {/* Left */}
        <div className="flex-[2] flex flex-col text-center justify-around items-center font-arsenal h-72">
          <div className="flex flex-col gap-y-0">
            <span className="text-aqua-forest-600 text-[4rem]">SWAP SOUND</span>
            <span className="text-aqua-forest-400 text-2xl font-arsenal-spaced-2 -mt-5">
              Swap it, Spin it, Love it.
            </span>
          </div>
          <div className="text-xl max-w-[40rem]">
            Whether you are decluttering or hunting for your next favorite
            record, our marketplace connects passionate collectors for the
            ultimate music trade.
          </div>
          <button className="h-8 w-16 bg-sky-600 ">Start</button>
          {/* <button className="h-8 w-16 bg-[#ece684]">Start</button> */}
        </div>

        {/* Right */}
        <div className="flex-1">
          <img src={newArrivalImage} alt="Company Story" className="h-80" />
        </div>
      </div>

      {/* Actual Content */}
      <DisplayRow
        data={gqlProductGetNewest.data?.getNewestProducts as ProductEntity[]}
        count={COUNT}
        title={"New Arrival"}
      />
      <DisplayRow
        data={gqlProductGetNewest.data?.getNewestProducts as ProductEntity[]}
        count={COUNT}
        title={"New Arrival"}
      />
      <DisplayRow
        data={gqlProductGetNewest.data?.getNewestProducts as ProductEntity[]}
        count={COUNT}
        title={"New Arrival"}
      />
      <DisplayRow
        data={gqlProductGetNewest.data?.getNewestProducts as ProductEntity[]}
        count={COUNT}
        title={"New Arrival"}
      />
      <DisplayRow
        data={gqlProductGetNewest.data?.getNewestProducts as ProductEntity[]}
        count={COUNT}
        title={"New Arrival"}
      />
      <DisplayRow
        data={gqlProductGetNewest.data?.getNewestProducts as ProductEntity[]}
        count={COUNT}
        title={"New Arrival"}
      />
    </div>
  );
}
