import useHookCheckInView from "@/customHooks/useHookCheckInView";
import { ratingStyle } from "@/utils/styles";
import { Rating } from "@smastrom/react-rating";

interface Props {
  testimonial: {
    id: number;
    title: string;
    content: string;
    author: string;
    role: string;
    rating: number;
  };
}

const testimonials = [
  {
    id: 1,
    title: "A Collector’s Dream!",
    content:
      "I’ve been collecting vinyl for years, and this site is a goldmine! I found rare pressings at great prices, and the sellers were super responsive. The buying process was smooth, and my records arrived in perfect condition. Highly recommended for any music lover!",
    author: "Mark R.",
    role: "Vinyl Enthusiast",
    rating: 5,
  },
  {
    id: 2,
    title: "Sold My Collection with Ease",
    content:
      "I had a bunch of old CDs and records I didn’t listen to anymore, and I wasn’t sure how to sell them. This platform made it so easy! Listing was simple, and my items sold faster than I expected. Plus, I connected with real music lovers who appreciated them. I’ll definitely use this site again!",
    author: "Jessica T.",
    role: "Seller",
    rating: 5,
  },
  {
    id: 3,
    title: "Hidden Gems Everywhere",
    content:
      "I stumbled upon this site while looking for some classic cassettes, and wow—I found so many hidden gems! The community here really cares about music, and it shows in the quality of records being sold. I love giving old records a new home!",
    author: "David L.",
    role: "Music Collector",
    rating: 4.5,
  },
];

function Content({ testimonial }: Props) {
  const { elementRef, inView } = useHookCheckInView();

  return (
    <div
      className={`flex flex-col p-4 gap-y-3 bg-gradient-to-b from-sky-50/80 via-sky-100/80 to-sky-50/80 items-center transition-all duration-500 ${
        inView ? "translate-y-0  opacity-100" : "-translate-y-8 opacity-0"
      }`}
      ref={elementRef}
    >
      <Rating
        style={{ width: 100 }}
        value={testimonial.rating}
        readOnly
        itemStyles={ratingStyle}
      />

      <span className="font-arsenal-spaced-2 font-bold">
        {testimonial.title}
      </span>
      <span className="font-lato font-light">{testimonial.content}</span>
      <span className="font-arsenal self-end">
        {testimonial.author} &#8212;
        <i> {testimonial.role}</i>
      </span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-x-2 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Content testimonial={testimonial} key={testimonial.id} />
      ))}
    </div>
  );
}
