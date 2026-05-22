"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FiUser, FiSend, FiEdit2, FiTrash2, FiX, FiCheck } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const CommentSection = ({ ideaId }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${ideaId}`,
      );
      const data = await res.json();
      setComments(data || []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    if (!user) {
      toast.error("Please login to comment");
      return;
    }

    setSubmitting(true);

    const commentData = {
      ideaId,
      text: commentText.trim(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userImage: user.image || "",
      createdAt: new Date().toISOString(),
    };

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(commentData),
        },
      );

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Comment posted!");
        setCommentText("");
        fetchComments();
      } else {
        toast.error("Failed to post comment");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (commentId) => {
    if (!editText.trim()) return;

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ text: editText.trim() }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Comment updated!");
        setEditingId(null);
        setEditText("");
        fetchComments();
      } else {
        toast.error("Failed to update comment");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Comment deleted!");
        fetchComments();
      } else {
        toast.error("Failed to delete comment");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const formatTimeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-black text-[#063f49] dark:text-teal-400">
          Discussion ({comments.length})
        </h3>
      </div>

      {user ? (
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800"
        >
          <div className="flex items-start gap-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
              {user.image ? (
                <Image
                  fill
                  className="object-cover"
                  alt={user.name}
                  src={user.image}
                />
              ) : (
                <FiUser className="absolute inset-0 m-auto text-lg text-slate-400" />
              )}
            </div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts on this idea..."
                rows={3}
                className="w-full px-4 py-3 text-sm font-semibold rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all resize-none"
              />
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={submitting || !commentText.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#063f49] dark:bg-teal-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <FiSend className="text-sm" />
                  {submitting ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Please{" "}
            <a
              href="/login"
              className="font-bold text-[#063f49] dark:text-teal-400 hover:underline"
            >
              login
            </a>{" "}
            to join the discussion.
          </p>
        </div>
      )}

      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {loading ? (
          <div className="p-6 sm:p-8 space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  {comment.userImage ? (
                    <Image
                      fill
                      className="object-cover"
                      alt={comment.userName}
                      src={comment.userImage}
                    />
                  ) : (
                    <FiUser className="absolute inset-0 m-auto text-lg text-slate-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                        {comment.userName}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                    {user?.id === comment.userId && editingId !== comment._id && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingId(comment._id);
                            setEditText(comment.text);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#063f49] dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                        >
                          <FiEdit2 className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(comment._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition cursor-pointer"
                        >
                          <FiTrash2 className="text-sm" />
                        </button>
                      </div>
                    )}
                  </div>

                  {editingId === comment._id ? (
                    <div>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 text-sm font-semibold rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all resize-none"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleEdit(comment._id)}
                          disabled={!editText.trim()}
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#063f49] dark:bg-teal-600 px-4 py-1.5 text-xs font-bold text-white transition hover:bg-black disabled:opacity-50 cursor-pointer"
                        >
                          <FiCheck className="text-xs" /> Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditText("");
                          }}
                          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                        >
                          <FiX className="text-xs" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {comment.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 sm:p-12 text-center">
            <p className="text-sm text-slate-400 dark:text-slate-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
