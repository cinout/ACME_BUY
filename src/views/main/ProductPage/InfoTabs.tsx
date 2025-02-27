import { ProductEntity } from "@/utils/entities";
import { translateYearToYearRangeEnum } from "@/utils/enums";
import { capFirstLetter } from "@/utils/strings";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  product: ProductEntity;
}

enum Tab {
  details = "details",
  description = "description",
  trackList = "tracklist",
}
const styleRowContainer = "flex gap-x-2 items-center flex-wrap my-[0.1rem]";
const styleRowTitle = "font-medium";
const styleRowContentWithLink =
  "border-b border-aqua-forest-200 hover:border-aqua-forest-300 transition hover:bg-aqua-forest-50";

export default function InfoTabs({ product }: Props) {
  const [currentTab, setCurrentTab] = useState(Tab.details);
  return (
    <>
      {/* Tabs */}
      <div className="flex font-arsenal-spaced-1 mt-8 font-bold">
        {Object.values(Tab).map((a) => (
          <button
            key={a}
            className={`border-b ${
              a === currentTab
                ? "border-aqua-forest-300 bg-aqua-forest-50"
                : "border-transparent"
            } w-24 h-8 box-border flex justify-center items-center transition-all`}
            onClick={() => setCurrentTab(a)}
          >
            {capFirstLetter(a)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full p-2 font-lato">
        {currentTab === Tab.details && (
          // TODO:[3] implement the links
          <>
            {/* Region */}
            <div className={styleRowContainer}>
              <span className={styleRowTitle}>Release Region:</span>
              <Link
                className={styleRowContentWithLink}
                to={`/collection?region=${encodeURIComponent(product.region)}`}
              >
                {product.region}
              </Link>
            </div>

            {/* Year */}
            <div className={styleRowContainer}>
              <span className={styleRowTitle}>Release Year:</span>
              <Link
                className={styleRowContentWithLink}
                to={`/collection?year=${encodeURIComponent(
                  translateYearToYearRangeEnum(product.year)
                )}`}
              >
                {product.year}
              </Link>
            </div>

            {/* Genre */}
            <div className={styleRowContainer}>
              <span className={styleRowTitle}>Genres:</span>
              {product.genres.map((genre) => (
                <Link
                  className={styleRowContentWithLink}
                  key={genre.id}
                  to={`/collection?genre=${encodeURIComponent(genre.name)}`}
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            {/* Format */}
            <div className={styleRowContainer}>
              <span className={styleRowTitle}>Format:</span>
              <Link
                className={styleRowContentWithLink}
                to={`/collection?format=${encodeURIComponent(product.format)}`}
              >
                {product.format}
              </Link>
            </div>

            {/* Grading */}
            <div className={styleRowContainer}>
              <span className={styleRowTitle}>Grading:</span>
              <Link
                className={styleRowContentWithLink}
                to={`/collection?grading=${encodeURIComponent(
                  product.grading
                )}`}
              >
                {product.grading}
              </Link>
            </div>
          </>
        )}
        {currentTab === Tab.description && (
          <div>{product.description ?? "no description"}</div>
        )}
        {currentTab === Tab.trackList && (
          <div>
            {product.tracklist
              ? product.tracklist.map((a, index) => (
                  <div key={index} className="flex gap-2">
                    <span>{a.indexDisplay}</span>
                    <span>{a.title}</span>
                  </div>
                ))
              : "no tracklist provided."}
          </div>
        )}
      </div>
    </>
  );
}
