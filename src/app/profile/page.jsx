import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ProfileForm from "@/components/ProfileForm";

// Import beautiful hand-drawn assets
import bulbImg from "@/assets/bulb.png";
import cloudImg from "@/assets/cloud.png";
import starImg from "@/assets/star.png";

export const metadata = {
  title: "IdeaVault - Profile",
};

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const user = session.user;

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
        <div className="relative w-full bg-linear-to-r from-[#f5f3ff] via-[#faf8ff] to-[#f3e8ff] dark:from-[#16132a] dark:via-[#0f0d1b] dark:to-[#1a1226] border border-[#e8dfec] dark:border-[#2a2440] rounded-[32px] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 overflow-hidden">
          
          {/* Client profile editing and details form */}
          <ProfileForm user={user} />

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
}
