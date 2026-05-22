"use client";

import Link from "next/link";
import { FiHome, FiAlertTriangle } from "react-icons/fi";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "IdeaVault - Page Not Found";
  }, []);

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-6 relative overflow-hidden grow">
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-[#063f49]/10 dark:bg-teal-500/5 blur-3xl animate-pulse" />

      <div className="relative backdrop-blur-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 md:p-14 max-w-xl w-full shadow-2xl text-center">
        <div className="mx-auto w-fit mb-6 p-5 rounded-full bg-rose-500/10 border border-rose-500/20">
          <FiAlertTriangle className="w-12 h-12 text-rose-500" />
        </div>

        <h1 className="text-7xl md:text-8xl font-black bg-linear-to-r from-[#063f49] to-teal-500 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent leading-none">
          404
        </h1>

        <h2 className="mt-4 text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
          Lost in Space
        </h2>

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
          The concept page you are searching for does not exist, has been moved,
          or remains locked in the vault. Let&apos;s return back to home.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-[#063f49] dark:bg-teal-600 text-white font-bold shadow-md hover:bg-black dark:hover:bg-teal-700 transition cursor-pointer"
          >
            <FiHome className="text-lg" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
