"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMessageSquare, FiArrowRight, FiEye, FiChevronDown, FiChevronUp } from "react-icons/fi";

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

export default function InteractionsList({ interactions }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!interactions || interactions.length === 0) {
    return (
      <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-800 shadow-sm mx-auto">
        <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950/20 text-[#063f49] dark:text-teal-400 flex items-center justify-center mx-auto mb-6">
          <FiMessageSquare className="text-3xl" />
        </div>
        <h2 className="text-2xl font-black text-[#063f49] dark:text-teal-400 mb-2">
          No Engagement Yet
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-8 max-w-md mx-auto leading-relaxed">
          You haven't posted any comments or contributed to discussions yet. Start discovering startup ideas and share your thoughts!
        </p>
        <Link
          href="/ideas"
          className="inline-flex items-center gap-2 rounded-full bg-[#063f49] dark:bg-teal-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-black cursor-pointer shadow-md hover:shadow-lg"
        >
          Explore Startup Ideas <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {interactions.map(({ idea, comments }) => {
        const colorClass = categoryColors[idea.category] || categoryColors["Other"];
        const isExpanded = expandedId === idea._id;

        return (
          <div
            key={idea._id}
            className="rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-all overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <span className={`inline-block rounded-md px-3 py-1 text-xs font-bold mb-3 ${colorClass}`}>
                  {idea.category}
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 leading-snug mb-2">
                  {idea.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {idea.problemStatement}
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-2 self-start sm:self-auto shrink-0 mt-2 sm:mt-0">
                <Link
                  href={`/ideas/${idea._id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#063f49] dark:border-teal-400 px-5 py-2 text-xs font-bold text-[#063f49] dark:text-teal-400 transition hover:bg-[#063f49] hover:text-white dark:hover:bg-teal-400 dark:hover:text-black cursor-pointer"
                >
                  <FiEye /> View Details
                </Link>
                <button
                  onClick={() => toggleExpand(idea._id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-5 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 transition cursor-pointer"
                >
                  {isExpanded ? (
                    <>
                      Hide Comments <FiChevronUp />
                    </>
                  ) : (
                    <>
                      Show Comments ({comments.length}) <FiChevronDown />
                    </>
                  )}
                </button>
              </div>
            </div>

            {isExpanded && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
                <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Your Comments
                </h3>
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                    >
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed mb-1.5">
                        {comment.text}
                      </p>
                      <span className="text-xxs text-slate-400 dark:text-slate-500 block">
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
