import Link from "next/link";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";

const categoryColors = {
  Tech: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Health: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Education:
    "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Finance:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Social: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "E-commerce":
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  SaaS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "AI/ML": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  Community: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300",
  Productivity:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Career: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Other: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const IdeaCard = ({ idea }) => {
  const { _id, title, category, tags, problemStatement, likes, imageUrl } =
    idea;

  const tagList =
    typeof tags === "string"
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : Array.isArray(tags)
        ? tags
        : [];

  const colorClass = categoryColors[category] || categoryColors["Other"];

  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-800 transition hover:shadow-xl hover:-translate-y-1">
      {imageUrl && (
        <Image
          width={400}
          height={250}
          className="object-cover object-center h-52 w-full"
          alt={title}
          src={imageUrl}
        />
      )}

      <div className="p-5">
        <span
          className={`inline-block rounded-md px-3 py-1 text-xs font-bold mb-3 ${colorClass}`}
        >
          {category}
        </span>

        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug mb-1.5">
          {title}
        </h2>

        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {problemStatement}
        </p>

        {tagList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tagList.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 dark:border-slate-700 px-3 py-0.5 text-xs text-slate-500 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <FiHeart className="text-sm" /> {likes}
            </span>
          </div>

          <Link
            href={`/ideas/${_id}`}
            className="rounded-full border border-[#063f49] dark:border-teal-400 px-4 py-1.5 text-xs font-bold text-[#063f49] dark:text-teal-400 transition hover:bg-[#063f49] hover:text-white dark:hover:bg-teal-400 dark:hover:text-black"
          >
            View Idea
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
