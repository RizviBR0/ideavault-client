"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiPlus, FiArrowRight } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { EditIdeaModal } from "@/components/EditIdeaModal";
import { DeleteIdeaAlert } from "@/components/DeleteIdeaAlert";
import LoadingSpinner from "@/components/LoadingSpinner";
import { redirect } from "next/navigation";

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

export default function MyIdeasPage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserIdeas = async () => {
    if (!user) return;
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/user/${user.id}`,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );
      const data = await res.json();
      setIdeas(data || []);
    } catch {
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionPending && !user) {
      redirect("/login");
    }
  }, [sessionPending, user]);

  useEffect(() => {
    if (user) {
      document.title = "IdeaVault - My Ideas";
      fetchUserIdeas();
    }
  }, [user]);

  if (sessionPending || (loading && user)) {
    return <LoadingSpinner />;
  }

  const totalLikes = ideas.reduce((acc, curr) => acc + (curr.likes || 0), 0);

  return (
    <div className="px-5 pt-28 pb-16 max-w-7xl mx-auto w-full flex-grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#063f49] dark:text-teal-400">
            My Ideas Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-1">
            Manage your submitted startup concepts, monitor likes, and edit or refine details.
          </p>
        </div>
        <Link
          href="/add-idea"
          className="inline-flex items-center gap-2 rounded-full bg-[#063f49] dark:bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-black self-start cursor-pointer shadow-md hover:shadow-lg"
        >
          <FiPlus className="text-base" /> Share New Idea
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
            Total Shared Ideas
          </span>
          <span className="text-4xl font-black text-[#063f49] dark:text-teal-400">
            {ideas.length}
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
            Total Community Likes
          </span>
          <span className="text-4xl font-black text-[#063f49] dark:text-teal-400">
            {totalLikes}
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 shadow-sm sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
            Platform Standing
          </span>
          <span className="text-lg font-black text-slate-800 dark:text-slate-200 block">
            {ideas.length > 0 ? "Active Creator" : "Aspiring Innovator"}
          </span>
        </div>
      </div>

      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => {
            const colorClass = categoryColors[idea.category] || categoryColors["Other"];
            const tagList = typeof idea.tags === "string"
              ? idea.tags.split(",").map((t) => t.trim()).filter(Boolean)
              : Array.isArray(idea.tags) ? idea.tags : [];

            return (
              <div
                key={idea._id}
                className="rounded-3xl overflow-hidden bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 transition hover:shadow-xl hover:-translate-y-1 flex flex-col h-full"
              >
                {idea.imageUrl && (
                  <div className="relative h-52 w-full">
                    <Image
                      fill
                      className="object-cover object-center"
                      alt={idea.title}
                      src={idea.imageUrl}
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <span className={`inline-block rounded-md px-3 py-1 text-xs font-bold mb-3 self-start ${colorClass}`}>
                    {idea.category}
                  </span>

                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug mb-2">
                    {idea.title}
                  </h2>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {idea.problemStatement}
                  </p>

                  {tagList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {tagList.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 dark:border-slate-300 px-3 py-0.5 text-xs text-slate-500 dark:text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <FiHeart className="text-sm text-red-500 fill-red-500" /> {idea.likes || 0}
                    </span>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/ideas/${idea._id}`}
                        className="rounded-full border border-slate-200 dark:border-slate-300 hover:border-[#063f49] dark:hover:border-teal-400 px-4 py-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-[#063f49] dark:hover:text-teal-400 transition cursor-pointer"
                      >
                        View
                      </Link>
                      <EditIdeaModal idea={idea} onSuccess={fetchUserIdeas} />
                      <DeleteIdeaAlert idea={idea} onSuccess={fetchUserIdeas} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 shadow-sm max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/20 text-[#063f49] dark:text-teal-400 flex items-center justify-center mx-auto mb-6">
            <FiPlus className="text-3xl" />
          </div>
          <h2 className="text-2xl font-black text-[#063f49] dark:text-teal-400 mb-2">
            No Ideas Shared Yet
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-8 max-w-md mx-auto leading-relaxed">
            You haven't submitted any startup ideas yet. Share your first vision with our global innovator community!
          </p>
          <Link
            href="/add-idea"
            className="inline-flex items-center gap-2 rounded-full bg-[#063f49] dark:bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-black cursor-pointer shadow-md hover:shadow-lg"
          >
            Submit Your First Idea <FiArrowRight />
          </Link>
        </div>
      )}
    </div>
  );
}
