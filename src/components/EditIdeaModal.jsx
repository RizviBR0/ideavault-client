"use client";

import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Modal,
  Surface,
  TextArea,
  TextField,
  Select,
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export function EditIdeaModal({ idea, onSuccess }) {
  const {
    _id,
    title,
    category,
    budget,
    targetAudience,
    tags,
    problemStatement,
    solution,
    imageUrl,
  } = idea;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedIdea = Object.fromEntries(formData.entries());

    try {
      const { data: tokenData } = await authClient.token();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${_id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(updatedIdea),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Idea updated successfully!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error("No changes made or update failed");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <Modal>
      <Button
        variant="outline"
        className="rounded-full border border-[#063f49] dark:border-teal-400 text-[#063f49] dark:text-teal-400 hover:bg-[#063f49] hover:text-white dark:hover:bg-teal-400 dark:hover:text-black cursor-pointer font-bold px-4 py-1.5 text-xs transition flex items-center gap-1.5"
      >
        <BiEdit className="text-sm" /> Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-xl bg-white dark:bg-(--bg-card) border border-slate-200 dark:border-slate-300 rounded-3xl overflow-hidden shadow-2xl">
            <Modal.CloseTrigger />
            <Modal.Header className="border-b border-slate-100 dark:border-slate-300 py-4 px-6">
              <Modal.Heading className="text-lg font-black text-[#063f49] dark:text-teal-400">
                Edit Startup Idea
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6 overflow-y-auto max-h-[80vh]">
              <Surface variant="default" className="bg-transparent border-none p-0">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <TextField defaultValue={title} name="title" isRequired>
                      <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Idea Title
                      </Label>
                      <Input
                        placeholder="e.g. AI-Powered Resume Builder"
                        className="rounded-2xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold"
                      />
                      <FieldError />
                    </TextField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Select
                          defaultValue={category}
                          name="category"
                          isRequired
                          className="w-full"
                          placeholder="Select category"
                        >
                          <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Category
                          </Label>
                          <Select.Trigger className="rounded-2xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold">
                            <Select.Value />
                            <Select.Indicator />
                          </Select.Trigger>
                          <Select.Popover className="border border-slate-200 dark:border-slate-300 rounded-2xl bg-white dark:bg-(--bg-card) shadow-xl overflow-hidden">
                            <ListBox className="divide-y divide-slate-100 dark:divide-slate-800">
                              <ListBox.Item id="Tech" textValue="Tech" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                Tech
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Health" textValue="Health" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                Health
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Education" textValue="Education" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                Education
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Finance" textValue="Finance" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                Finance
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Social" textValue="Social" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                Social
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="E-commerce" textValue="E-commerce" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                E-commerce
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="SaaS" textValue="SaaS" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                SaaS
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="AI/ML" textValue="AI/ML" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                AI/ML
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                              <ListBox.Item id="Other" textValue="Other" className="hover:bg-slate-50 dark:hover:bg-slate-800 transition font-bold px-4 py-2 cursor-pointer">
                                Other
                                <ListBox.ItemIndicator />
                              </ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>

                      <TextField defaultValue={budget} name="budget" isRequired>
                        <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Budget (USD)
                        </Label>
                        <Input
                          type="number"
                          placeholder="5000"
                          className="rounded-2xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <TextField defaultValue={targetAudience} name="targetAudience" isRequired>
                        <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Target Audience
                        </Label>
                        <Input
                          placeholder="e.g. Job seekers, grads"
                          className="rounded-2xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold"
                        />
                        <FieldError />
                      </TextField>

                      <TextField defaultValue={tags} name="tags">
                        <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                          Tags (comma separated)
                        </Label>
                        <Input
                          placeholder="e.g. ai, resume, career"
                          className="rounded-2xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold"
                        />
                        <FieldError />
                      </TextField>
                    </div>

                    <TextField defaultValue={problemStatement} name="problemStatement" isRequired>
                      <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Problem Statement
                      </Label>
                      <TextArea
                        placeholder="Describe the problem..."
                        className="rounded-3xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold p-3"
                      />
                      <FieldError />
                    </TextField>

                    <TextField defaultValue={solution} name="solution" isRequired>
                      <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Proposed Solution
                      </Label>
                      <TextArea
                        placeholder="Describe the solution..."
                        className="rounded-3xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold p-3"
                      />
                      <FieldError />
                    </TextField>

                    <TextField defaultValue={imageUrl} name="imageUrl">
                      <Label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        Image URL
                      </Label>
                      <Input
                        type="url"
                        placeholder="https://example.com/cover.jpg"
                        className="rounded-2xl border border-slate-200 dark:border-slate-300 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-[#063f49] dark:focus:border-teal-500 transition-all font-semibold"
                      />
                      <FieldError />
                    </TextField>
                  </div>

                  <Modal.Footer className="border-t border-slate-100 dark:border-slate-300 pt-4 mt-6 flex justify-end gap-3">
                    <Button
                      type="submit"
                      slot="close"
                      className="rounded-full bg-[#063f49] dark:bg-teal-600 hover:bg-black transition text-white font-bold px-6 py-2 cursor-pointer shadow-md"
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
