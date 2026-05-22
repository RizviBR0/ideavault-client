import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import InteractionsList from "@/components/InteractionsList";

export const metadata = {
  title: "IdeaVault - My Interactions",
};

export default async function MyInteractionsPage() {
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

  let interactions = [];
  try {
    const commentsRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/user/${user.id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (commentsRes.ok) {
      const comments = await commentsRes.json();

      if (comments && comments.length > 0) {
        const ideasRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`,
          { cache: "no-store" }
        );

        if (ideasRes.ok) {
          const allIdeas = await ideasRes.json();

          const commentsByIdea = {};
          comments.forEach((comment) => {
            if (!commentsByIdea[comment.ideaId]) {
              commentsByIdea[comment.ideaId] = [];
            }
            commentsByIdea[comment.ideaId].push(comment);
          });

          interactions = allIdeas
            .filter((idea) => !!commentsByIdea[idea._id])
            .map((idea) => ({
              idea,
              comments: commentsByIdea[idea._id].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
              ),
            }));
        }
      }
    }
  } catch (error) {
    console.error("Error fetching interactions server-side:", error);
  }

  const totalCommentsCount = interactions.reduce(
    (acc, curr) => acc + curr.comments.length,
    0
  );

  return (
    <div className="px-5 pt-28 pb-16 max-w-7xl mx-auto w-full grow">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-[#063f49] dark:text-teal-400">
          My Interactions
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-1">
          Review startup ideas you have engaged with and see all discussions you participated in.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
            Ideas Engaged
          </span>
          <span className="text-4xl font-black text-[#063f49] dark:text-teal-400">
            {interactions.length}
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
            Total Comments Posted
          </span>
          <span className="text-4xl font-black text-[#063f49] dark:text-teal-400">
            {totalCommentsCount}
          </span>
        </div>
      </div>

      {/* Render stateful list or fallback message */}
      <InteractionsList interactions={interactions} />
    </div>
  );
}
