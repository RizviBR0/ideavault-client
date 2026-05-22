"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Card,
  Button,
  Input,
  Label,
  TextField,
  FieldError,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@heroui/react";
import { FiUser, FiMail, FiImage, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    document.title = "IdeaVault - Profile Settings";
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
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setUpdating(true);
    try {
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Name updated successfully!");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#eef2ff] to-[#fce7f3] dark:from-[#0d1117] dark:to-[#161b22] px-5 py-24">
      <div className="max-w-xl w-full flex flex-col items-center gap-6">
        {/* Back Link */}
        <div className="w-full flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#063f49] dark:text-teal-400 hover:underline transition"
          >
            <FiArrowLeft className="text-base" /> Back to Home
          </Link>
        </div>

        <Card className="w-full p-8 sm:p-10 rounded-[32px] shadow-xl bg-white dark:bg-(--bg-card) border-none">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#063f49] dark:text-teal-400 mb-3 tracking-tight">
              Profile Settings
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Manage your personal information and startup hub profile.
            </p>
          </div>

          {/* Large Profile Avatar */}
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-24 h-24 shadow-md bg-[#063f49] text-white font-bold select-none">
              {user.image && <AvatarImage src={user.image} alt={user.name} />}
              <AvatarFallback className="text-3xl">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-black text-slate-800 dark:text-slate-200">
              {user.name}
            </h2>
          </div>

          <form
            onSubmit={handleUpdateProfile}
            className="flex w-full flex-col gap-6"
          >
            {/* Editable Name Field */}
            <TextField
              isRequired
              name="name"
              type="text"
              className="flex flex-col w-full"
            >
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </Label>
              <div className="relative w-full">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all"
                />
              </div>
              <FieldError className="text-xs text-rose-500 mt-1.5 font-semibold" />
            </TextField>

            {/* Read-Only Email Field */}
            <div className="flex flex-col w-full opacity-70">
              <Label className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-1.5">
                Email Address (Read-Only)
              </Label>
              <div className="relative w-full">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <input
                  disabled
                  value={user.email || ""}
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 font-semibold">
                Your email is fixed and linked to authentication.
              </span>
            </div>

            {/* Update button */}
            <Button
              className="w-full bg-[#063f49] dark:bg-teal-600 text-white font-bold rounded-full py-6 mt-4 hover:bg-black transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
              type="submit"
              disabled={updating}
            >
              {updating ? "Saving Changes..." : "Save Changes"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
