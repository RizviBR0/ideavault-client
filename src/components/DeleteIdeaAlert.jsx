"use client";

import { AlertDialog, Button } from "@heroui/react";
import { FiTrash2 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function DeleteIdeaAlert({ idea, onSuccess }) {
  const { _id, title } = idea;

  const handleDelete = async () => {
    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${_id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Idea deleted successfully!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("Failed to delete idea");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="outline"
        className="rounded-full border border-red-200 dark:border-red-950/30 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer font-bold px-4 py-1.5 text-xs transition flex items-center gap-1.5"
      >
        <FiTrash2 className="text-sm" /> Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-110 bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header className="flex gap-3 items-center mb-4">
              <AlertDialog.Icon status="danger" className="text-red-500" />
              <AlertDialog.Heading className="text-lg font-black text-slate-900 dark:text-slate-100">
                Delete Startup Idea
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body className="mb-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                Are you sure you want to permanently delete <strong>{title}</strong>? All of its comments and data will be lost. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                slot="close"
                variant="tertiary"
                className="rounded-full border border-slate-200 dark:border-slate-800 px-5 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                slot="close"
                variant="danger"
                className="rounded-full bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 text-xs transition cursor-pointer shadow-md"
              >
                Delete Idea
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
