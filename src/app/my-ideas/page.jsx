import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import MyIdeasGrid from "@/components/MyIdeasGrid";

export const metadata = {
  title: "IdeaVault - My Ideas",
};

export default async function MyIdeasPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const user = session.user;
  let initialIdeas = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/user/${user.id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );
    if (res.ok) {
      initialIdeas = await res.json();
    }
  } catch (error) {
    console.error("Error fetching user ideas server-side:", error);
  }

  return (
    <div className="px-5 pt-28 pb-16 max-w-7xl mx-auto w-full grow">
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

      <MyIdeasGrid initialIdeas={initialIdeas} user={user} />
    </div>
  );
}
