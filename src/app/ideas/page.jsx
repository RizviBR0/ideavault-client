"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiSearch, FiX } from "react-icons/fi";
import IdeaCard from "@/components/IdeaCard";
import bulb from "@/assets/bulb.png";
import cloud from "@/assets/cloud.png";
import paperPlane from "@/assets/paper_plane.png";
import star from "@/assets/star.png";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    document.title = "IdeaVault - Explore Ideas";
  }, []);

  useEffect(() => {
    const fetchIdeas = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (category) queryParams.append("category", category);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?${queryParams.toString()}`
        );
        const data = await res.json();
        setIdeas(data || []);
      } catch {
        setIdeas([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchIdeas();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, category]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
  };

  const categories = [
    "Tech",
    "Health",
    "Education",
    "Finance",
    "Social",
    "E-commerce",
    "SaaS",
    "AI/ML",
    "Other",
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-(--bg-primary)">
      <Image
        src={bulb}
        alt=""
        width={80}
        height={80}
        className="absolute top-24 left-10 w-20 opacity-40 pointer-events-none hidden xl:block"
      />
      <Image
        src={cloud}
        alt=""
        width={100}
        height={60}
        className="absolute top-36 right-16 w-24 opacity-40 pointer-events-none hidden xl:block"
      />
      <Image
        src={paperPlane}
        alt=""
        width={70}
        height={70}
        className="absolute bottom-28 right-12 w-16 opacity-40 pointer-events-none hidden xl:block"
      />
      <Image
        src={star}
        alt=""
        width={50}
        height={50}
        className="absolute bottom-20 left-16 w-12 opacity-35 pointer-events-none hidden xl:block"
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-[#063f49] dark:text-teal-400 tracking-tight leading-none">
            Explore Startup Ideas
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base md:text-lg">
            Discover, search, and filter innovative concepts posted by our founder community. Find the next spark of genius.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-12 p-4 rounded-3xl bg-white dark:bg-(--bg-card) shadow-md">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-lg" />
            <input
              type="text"
              placeholder="Search ideas by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 text-sm font-semibold rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500"
              >
                <FiX className="text-sm" />
              </button>
            )}
          </div>

          <div className="w-full sm:w-56">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 text-sm font-semibold rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {(search || category) && (
            <button
              onClick={resetFilters}
              className="px-6 py-3 text-sm font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 rounded-2xl transition-all cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-(--bg-card) p-5 h-85"
              >
                <div className="rounded-xl bg-slate-200 dark:bg-slate-800 h-44 w-full mb-5" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 mb-3" />
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-3" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-6" />
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-12" />
                  <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-full w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-[#063f49] dark:text-teal-400 mb-6 text-2xl font-black">
              !
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              No Ideas Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              We couldn&apos;t find any ideas matching your current search or filters. Try adjusting them or clear filters to start fresh.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#063f49] dark:bg-teal-600 text-white font-bold px-6 py-2.5 text-sm transition hover:bg-black"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
