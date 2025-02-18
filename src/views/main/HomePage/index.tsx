import { useQuery } from "@apollo/client";

import {
  GQL_PRODUCT_GET_DISCOUNTED,
  GQL_PRODUCT_GET_MINT,
  GQL_PRODUCT_GET_NEW_RELEASE,
  GQL_PRODUCT_GET_NEWEST_CASSETTES,
  GQL_PRODUCT_GET_NEWEST_CDS,
  GQL_PRODUCT_GET_NEWEST_VINYLS,
  GQL_PRODUCT_GET_OLD_RELEASE,
} from "@/graphql/productGql";
import { GenreEntity, ProductEntity } from "@/utils/entities";
import DisplayRow from "./DisplayRow";

import { GQL_GENRES_GET_ALL } from "@/graphql/genreGql";
import DisplayGenre from "./DisplayGenre";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

const COUNT = 4;
const endYear = new Date().getFullYear();

export default function HomePage() {
  /**
   * GQL
   */
  const gqlGenresGetAll = useQuery(GQL_GENRES_GET_ALL);
  const allGenres = gqlGenresGetAll.data?.getAllGenres as GenreEntity[];
  // Create a shallow copy and sort the copy
  const sortedGenres =
    allGenres && allGenres.length > 0
      ? allGenres.slice().sort((a, b) => a.name.localeCompare(b.name))
      : [];

  const gqlProductgetNewVinyls = useQuery(GQL_PRODUCT_GET_NEWEST_VINYLS, {
    variables: { count: COUNT },
  });
  const gqlProductGetNewCDs = useQuery(GQL_PRODUCT_GET_NEWEST_CDS, {
    variables: { count: COUNT },
  });
  const gqlProductGetNewCassettes = useQuery(GQL_PRODUCT_GET_NEWEST_CASSETTES, {
    variables: { count: COUNT },
  });
  const gqlProductGetNewReleases = useQuery(GQL_PRODUCT_GET_NEW_RELEASE, {
    variables: { count: COUNT },
  });
  const gqlProductGetOldReleases = useQuery(GQL_PRODUCT_GET_OLD_RELEASE, {
    variables: { count: COUNT },
  });
  const getProductDiscounted = useQuery(GQL_PRODUCT_GET_DISCOUNTED, {
    variables: { count: COUNT },
  });
  const getProductMint = useQuery(GQL_PRODUCT_GET_MINT, {
    variables: { count: COUNT },
  });

  return (
    <div className="flex flex-col gap-y-10 justify-center w-full">
      {/* Hero Section */}
      <Hero />

      {/* Actual Content */}
      <DisplayRow
        data={gqlProductGetNewCDs.data?.getNewCDs as ProductEntity[]}
        count={COUNT}
        title={"New CDs"}
      />

      <DisplayRow
        data={gqlProductgetNewVinyls.data?.getNewVinyls as ProductEntity[]}
        count={COUNT}
        title={"New Vinyls"}
      />
      <DisplayRow
        data={
          gqlProductGetNewCassettes.data?.getNewCassettes as ProductEntity[]
        }
        count={COUNT}
        title={"New Cassettes"}
      />

      <DisplayRow
        data={gqlProductGetNewReleases.data?.getNewReleases as ProductEntity[]}
        count={COUNT}
        title={`${endYear} Releases`}
      />

      <DisplayRow
        data={gqlProductGetOldReleases.data?.getOldReleases as ProductEntity[]}
        count={COUNT}
        title={"Golden"}
      />
      <DisplayRow
        data={getProductMint.data?.getMint as ProductEntity[]}
        count={COUNT}
        title={"Perfect Condition"}
      />
      <DisplayRow
        data={getProductDiscounted.data?.getDiscounted as ProductEntity[]}
        count={COUNT}
        title={"On Discount"}
      />
      {/* TODO:[2] products from best sellers */}
      {/* TODO:[1] Events & News */}

      {/* genres */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 2xl:grid-cols-9 gap-4 flex-wrap">
        {sortedGenres?.map((genre) => {
          return <DisplayGenre genre={genre} key={genre.id} />;
        })}
      </div>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}

/**
 * 1. Format-Based Categories
Vinyl Records (LPs, 7-inch singles, 12-inch EPs)
CDs
Cassettes
Box Sets & Special Editions
Other Formats (MiniDiscs, Reel-to-Reel, etc.)

2. Genre-Based Categories
Rock & Alternative
Pop & Dance
Hip-Hop & R&B
Jazz & Blues
Classical & Opera
Electronic & Ambient
Metal & Punk
Soundtracks & Scores
World & Folk

3. Era-Based Collections
1950s & 1960s Classics
1970s Rock & Disco
1980s New Wave & Synthpop
1990s Alternative & Hip-Hop
2000s & Beyond

4. Condition-Based Categories
Mint & Near Mint (Like new)
Good Condition (Light wear, fully playable)
Rare Finds & Collectibles
Budget Picks (Bargain Deals)

5. Featured & Thematic Sections
New Arrivals (Recently listed items)
Staff Picks (Curated selection)
Best Sellers (Popular choices)
Hidden Gems (Underrated or rare finds)
Limited Editions & Signed Copies

6. User-Based Sections
Trending Now (Most viewed or liked items)
Recently Sold (See what’s hot)
Nearby Sellers (For local meetups or faster shipping)
 */
