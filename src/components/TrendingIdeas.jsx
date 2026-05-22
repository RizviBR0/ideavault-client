import IdeaCard from "./IdeaCard";
import Link from "next/link";
import Image from "next/image";
import bulb from "../assets/bulb.png";
import cloud from "../assets/cloud.png";
import paperPlane from "../assets/paper_plane.png";
import star from "../assets/star.png";

const TrendingIdeas = async () => {
  let ideas = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/trending`, {
      cache: "no-store",
    });
    ideas = await res.json();
  } catch {
    ideas = [];
  }

  if (ideas.length === 0) return null;

  return (
    <section className="relative mt-20 pb-20 overflow-hidden">
      <Image
        src={bulb}
        alt=""
        width={80}
        height={80}
        className="absolute -top-2 left-24 w-20 opacity-90 pointer-events-none hidden lg:block"
      />
      <Image
        src={cloud}
        alt=""
        width={100}
        height={60}
        className="absolute top-4 right-28 w-24 opacity-80 pointer-events-none hidden lg:block"
      />
      <Image
        src={paperPlane}
        alt=""
        width={70}
        height={70}
        className="absolute bottom-10 right-16 w-16 opacity-80 pointer-events-none hidden lg:block"
      />
      <Image
        src={star}
        alt=""
        width={50}
        height={50}
        className="absolute bottom-16 left-12 w-12 opacity-70 pointer-events-none hidden lg:block"
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-[#063f49] dark:text-teal-400 tracking-tight">
              Trending Ideas
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm md:text-base">
              Discover the most popular startup ideas from our creative community.
            </p>
          </div>

          <Link
            href="/ideas"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border-2 border-[#063f49] dark:border-teal-400 px-6 py-2.5 text-sm font-bold text-[#063f49] dark:text-teal-400 transition hover:bg-[#063f49] hover:text-white dark:hover:bg-teal-400 dark:hover:text-black"
          >
            View all ideas <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {ideas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/ideas"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#063f49] dark:border-teal-400 px-6 py-2.5 text-sm font-bold text-[#063f49] dark:text-teal-400"
          >
            View all ideas <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingIdeas;
