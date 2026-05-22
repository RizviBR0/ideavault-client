import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiArrowLeft, FiCalendar, FiDollarSign, FiTarget, FiUser, FiMail } from "react-icons/fi";
import bulb from "@/assets/bulb.png";
import cloud from "@/assets/cloud.png";
import paperPlane from "@/assets/paper_plane.png";
import star from "@/assets/star.png";
import CommentSection from "@/components/CommentSection";

const categoryColors = {
  Tech: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Health: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Education: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Finance: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Social: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "E-commerce": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  SaaS: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "AI/ML": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  Community: "bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300",
  Productivity: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  Career: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  Other: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center bg-(--bg-primary) text-[var(--text-primary)]">
        <h2 className="text-2xl font-bold mb-4">Error loading idea details</h2>
        <Link href="/ideas" className="px-6 py-2 bg-[#063f49] dark:bg-teal-600 text-white rounded-full font-bold">
          Back to Ideas
        </Link>
      </div>
    );
  }

  const idea = await res.json();

  if (!idea) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center bg-(--bg-primary) text-[var(--text-primary)]">
        <h2 className="text-2xl font-bold mb-4">Idea not found</h2>
        <Link href="/ideas" className="px-6 py-2 bg-[#063f49] dark:bg-teal-600 text-white rounded-full font-bold">
          Back to Ideas
        </Link>
      </div>
    );
  }

  const {
    title,
    category,
    budget,
    targetAudience,
    tags,
    problemStatement,
    solution,
    imageUrl,
    userName,
    userEmail,
    userImage,
    createdAt,
    likes,
  } = idea;

  const tagList = typeof tags === "string"
    ? tags.split(",").map((t) => t.trim()).filter(Boolean)
    : Array.isArray(tags) ? tags : [];

  const colorClass = categoryColors[category] || categoryColors["Other"];
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-(--bg-primary)">
      <Image
        src={bulb}
        alt=""
        width={80}
        height={80}
        className="absolute top-24 left-10 w-20 opacity-30 pointer-events-none hidden xl:block"
      />
      <Image
        src={cloud}
        alt=""
        width={100}
        height={60}
        className="absolute top-36 right-16 w-24 opacity-30 pointer-events-none hidden xl:block"
      />
      <Image
        src={paperPlane}
        alt=""
        width={70}
        height={70}
        className="absolute bottom-28 right-12 w-16 opacity-30 pointer-events-none hidden xl:block"
      />
      <Image
        src={star}
        alt=""
        width={50}
        height={50}
        className="absolute bottom-20 left-16 w-12 opacity-25 pointer-events-none hidden xl:block"
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 mb-8 text-sm font-bold text-[#063f49] dark:text-teal-400 hover:underline"
        >
          <FiArrowLeft className="text-base" /> Back to ideas catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl overflow-hidden bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 shadow-md">
              {imageUrl && (
                <div className="relative w-full h-80 sm:h-96 md:h-[450px]">
                  <Image
                    fill
                    className="object-cover"
                    alt={title}
                    src={imageUrl}
                    priority
                  />
                </div>
              )}

              <div className="p-6 sm:p-10">
                <span className={`inline-block rounded-md px-3.5 py-1.5 text-xs font-black tracking-wider uppercase mb-5 ${colorClass}`}>
                  {category}
                </span>

                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight mb-6">
                  {title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-8">
                  {tagList.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 dark:border-slate-300 px-4 py-1 text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-8">
                  <div className="border-t border-slate-100 dark:border-slate-300 pt-8">
                    <h3 className="text-lg font-black text-[#063f49] dark:text-teal-400 mb-3">
                      The Problem Statement
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-base">
                      {problemStatement}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-300 pt-8">
                    <h3 className="text-lg font-black text-[#063f49] dark:text-teal-400 mb-3">
                      The Proposed Solution
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-base">
                      {solution}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CommentSection ideaId={id} />
          </div>

          <div className="space-y-8">
            <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 shadow-md">
              <h3 className="text-lg font-black text-[#063f49] dark:text-teal-400 mb-6 border-b border-slate-100 dark:border-slate-300 pb-4">
                Idea Overview
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/20 text-[#063f49] dark:text-teal-400 shrink-0">
                    <FiDollarSign className="text-lg" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Estimated Budget
                    </span>
                    <span className="text-lg font-black text-slate-800 dark:text-slate-200">
                      ${Number(budget).toLocaleString()} USD
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/20 text-[#063f49] dark:text-teal-400 shrink-0">
                    <FiTarget className="text-lg" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Target Audience
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                      {targetAudience}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/20 text-[#063f49] dark:text-teal-400 shrink-0">
                    <FiCalendar className="text-lg" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Date Created
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                      {formattedDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/20 text-[#063f49] dark:text-teal-400 shrink-0">
                    <FiHeart className="text-lg" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Likes
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 block mt-0.5">
                      {likes} people like this
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 sm:p-8 bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 shadow-md">
              <h3 className="text-lg font-black text-[#063f49] dark:text-teal-400 mb-6 border-b border-slate-100 dark:border-slate-300 pb-4">
                The Founder
              </h3>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  {userImage ? (
                    <Image
                      fill
                      className="object-cover"
                      alt={userName}
                      src={userImage}
                    />
                  ) : (
                    <FiUser className="absolute inset-0 m-auto text-xl text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-black text-slate-800 dark:text-slate-200">
                    {userName}
                  </h4>
                </div>
              </div>

              <div className="space-y-4 border-t border-slate-100 dark:border-slate-300 pt-4">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <FiMail className="shrink-0" />
                  <span className="truncate">{userEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
