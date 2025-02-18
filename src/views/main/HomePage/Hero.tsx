import { motion } from "motion/react";
import illustration from "@/assets/images/illustration_1.svg";

export default function Hero() {
  return (
    <div className="group relative flex flex-col sm:flex-row justify-around items-center gap-y-4 w-full">
      {/* Left */}
      <motion.div
        className="flex-[2] flex flex-col gap-y-2 text-center justify-around items-center font-arsenal h-72"
        initial={{ translateX: "-2rem", opacity: 0 }}
        animate={{
          translateX: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        <div className="flex flex-col">
          <span className="text-aqua-forest-600 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[4rem]">
            SWAP SOUND
          </span>
          <span className="text-sky-600 text-base sm:text-lg md:text-xl lg:text-2xl font-arsenal-spaced-2 -mt-3 md:-mt-5">
            Swap it, Spin it, Love it.
          </span>
        </div>
        <div className="text-sm md:text-base lg:text-xl max-w-[44rem] font-arsenal-spaced-1">
          Whether you are decluttering or hunting for your next favorite record,
          our marketplace connects passionate collectors for the ultimate music
          trade.
        </div>
      </motion.div>

      {/* Right */}
      <motion.div
        className="flex-1"
        initial={{ translateX: "2rem", opacity: 0 }}
        animate={{
          translateX: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
      >
        <img
          src={illustration}
          alt="Company Story"
          className="h-60 sm:h-72 lg:h-80"
        />
      </motion.div>
    </div>
  );
}
