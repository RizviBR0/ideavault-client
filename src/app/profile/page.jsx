"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiMail, FiArrowLeft, FiEdit } from "react-icons/fi";

// Import beautiful hand-drawn assets
import bulbImg from "@/assets/bulb.png";
import cloudImg from "@/assets/cloud.png";
import starImg from "@/assets/star.png";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [tempName, setTempName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    document.title = "IdeaVault - Profile";
  }, []);

  // Pre-fill name once user session is loaded
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // Protect route
  useEffect(() => {
    if (!isPending && !user) {
      toast.error("Please login to access your profile");
      router.push("/login");
    }
  }, [user, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#eef2ff] to-[#fce7f3] dark:from-[#0d1117] dark:to-[#161b22]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#063f49] dark:border-teal-400" />
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!tempName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setUpdating(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: tempName.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        setName(tempName.trim());
        setIsEditingName(false);
        toast.success("Name updated successfully!");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#0f172a] dark:to-[#1e293b] px-5 py-24">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        
        {/* Back Link */}
        <div className="w-full flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#063f49] dark:text-teal-400 hover:underline transition"
          >
            <FiArrowLeft className="text-base" /> Back to Home
          </Link>
        </div>

        {/* Profile Banner Card */}
        <div className="relative w-full bg-linear-to-r from-[#f5f3ff] via-[#faf8ff] to-[#f3e8ff] dark:from-[#1b192b] dark:to-[#171424] border border-[#e8dfec] dark:border-[#2e263d] rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden">
          
          {/* Large Circular Avatar with floating Edit button */}
          <div className="relative shrink-0">
            <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white dark:border-[#221c30] shadow-xl overflow-hidden bg-[#063f49] flex items-center justify-center select-none">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  sizes="(max-w-768px) 144px, 176px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-5xl font-black">
                  {name ? name[0].toUpperCase() : "U"}
                </div>
              )}
            </div>
          </div>

          {/* User Profile Information (Name / Tagline / Email) */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 md:pr-55">
            {isEditingName ? (
              <form onSubmit={handleUpdateProfile} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
                <div className="relative flex-1 w-full">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-lg font-bold rounded-2xl bg-white/80 dark:bg-slate-900/85 border border-violet-300 dark:border-violet-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm"
                    placeholder="Enter your full name"
                    autoFocus
                    required
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="submit"
                    disabled={updating}
                    className="flex-1 sm:flex-none px-5 py-3 bg-[#063f49] hover:bg-black text-white font-bold rounded-2xl shadow transition cursor-pointer flex items-center justify-center h-12 gap-1.5"
                  >
                    {updating ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <span>Save</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingName(false)}
                    className="flex-1 sm:flex-none px-5 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-2xl shadow transition cursor-pointer flex items-center justify-center h-12"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-2 items-center md:items-start group">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                    {name}
                  </h1>
                  <button
                    onClick={() => {
                      setTempName(name);
                      setIsEditingName(true);
                    }}
                    className="p-1.5 group-hover:opacity-100 focus:opacity-100 hover:bg-violet-100 dark:hover:bg-violet-950/40 rounded-lg text-violet-600 dark:text-violet-400 transition cursor-pointer"
                    title="Edit Name"
                  >
                    <FiEdit className="text-sm" />
                  </button>
                </div>
                
                <div className="flex items-center gap-2 text-xs md:text-sm text-slate-400 dark:text-slate-500 mt-3 font-semibold bg-white/40 dark:bg-black/10 px-3 py-1.5 rounded-full border border-violet-100 dark:border-violet-900/30">
                  <FiMail className="shrink-0" />
                  <span>{user.email}</span>
                </div>
              </div>
            )}
          </div>

          {/* Floating Artworks (Right hand illustrations) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block pointer-events-none overflow-hidden select-none">
            
            {/* Cloud Illustration */}
            <div className="absolute top-4 right-[25%] w-32 h-auto opacity-90 animate-bounce" style={{ animationDuration: "8s" }}>
              <Image src={cloudImg} alt="Cloud" className="object-contain" />
            </div>
            
            {/* Star Sparks */}
            <div className="absolute top-[45%] right-[42%] w-6 h-auto opacity-70 animate-pulse" style={{ animationDuration: "3.5s" }}>
              <Image src={starImg} alt="Star Sparkle" className="object-contain" />
            </div>
            <div className="absolute bottom-[20%] right-[32%] w-5 h-auto opacity-60 animate-pulse" style={{ animationDuration: "4.5s" }}>
              <Image src={starImg} alt="Star Sparkle" className="object-contain" />
            </div>
            
            {/* Bulb Illustration */}
            <div className="absolute top-8 right-6 w-24 h-auto opacity-95 animate-pulse" style={{ animationDuration: "5s" }}>
              <Image src={bulbImg} alt="Bulb Idea" className="object-contain" />
            </div>

            {/* Doodle Squiggle Path */}
            <svg className="absolute right-6 bottom-4 w-44 h-16 opacity-75 text-indigo-500/30 dark:text-indigo-400/20" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M10,42 C60,42 50,12 90,32 C130,52 120,22 160,37 C175,42 185,52 195,47" />
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
