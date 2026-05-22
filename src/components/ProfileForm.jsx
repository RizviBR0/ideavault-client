"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";
import { FiUser, FiMail, FiEdit } from "react-icons/fi";

export default function ProfileForm({ user }) {
  const [name, setName] = useState(user?.name || "");
  const [tempName, setTempName] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [updating, setUpdating] = useState(false);

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
    <>
      {/* Large Circular Avatar with floating Edit button */}
      <div className="relative shrink-0">
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-[6px] border-white dark:border-[#201931] shadow-xl overflow-hidden bg-[#063f49] flex items-center justify-center select-none">
          {user?.image ? (
            <Image
              src={user.image}
              alt={name}
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
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 md:pr-48">
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
            
            <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 mt-3 font-semibold bg-white/40 dark:bg-black/25 px-3 py-1.5 rounded-full border border-violet-100 dark:border-violet-900/40">
              <FiMail className="shrink-0" />
              <span>{user?.email}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
