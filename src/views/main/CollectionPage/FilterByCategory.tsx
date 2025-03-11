import { iconAddWithoutCircle, iconMinusWithoutCircle } from "@/utils/icons";
import { capFirstLetter } from "@/utils/strings";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  title: "genre" | "format" | "year" | "grading" | "region";
  options: { id: string; displayValue: string }[];
  filterOptions: {
    genre: string | null;
    format: string | null;
    year: string | null;
    grading: string | null;
    region: string | null;
  };
}

export default function FilterByCategory({
  title,
  options,
  filterOptions,
}: Props) {
  /**
   * State
   */
  const [showOptions, setShowOptions] = useState(
    window.innerWidth < 640 ? false : true
  );

  /**
   * Routing
   */
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="flex flex-col">
      <hr className="my-1 sm:my-4" />
      <button
        className="font-bold flex justify-between items-center mb-0 sm:mb-2"
        onClick={() => setShowOptions((v) => !v)}
      >
        <span>{capFirstLetter(title)}</span>

        <div>
          {showOptions ? iconMinusWithoutCircle() : iconAddWithoutCircle()}
        </div>
      </button>
      <AnimatePresence>
        {showOptions && (
          <motion.div
            className="flex flex-col"
            initial={{ translateY: "-0.3rem", opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
              transition: { duration: 0.2 },
            }}
            exit={{
              translateY: "-0.3rem",
              opacity: 0,
              transition: { duration: 0.2 },
            }}
          >
            {options.map(({ id, displayValue }) => (
              <div key={id} className="flex items-center gap-x-2">
                <button
                  className={`w-4 h-4 border border-aqua-forest-600 rounded-full flex justify-center items-center`}
                  onClick={() => {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.set(title, displayValue);
                    setSearchParams(newParams);
                  }}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      filterOptions[title] === displayValue
                        ? "bg-aqua-forest-600 scale-100"
                        : "scale-0"
                    } transition duration-300`}
                  />
                </button>

                <span className=""> {displayValue}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
