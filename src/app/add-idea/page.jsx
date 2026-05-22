"use client";

import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
  Card,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const AddIdeaPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const idea = Object.fromEntries(formData.entries());

    idea.userId = user?.id;
    idea.userName = user?.name;
    idea.userEmail = user?.email;
    idea.userImage = user?.image || "";
    idea.createdAt = new Date().toISOString();
    idea.likes = 0;
    idea.status = "pending";

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(idea),
    });

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Idea submitted successfully!");
      redirect("/my-ideas");
    } else {
      toast.error("Failed to submit idea");
    }
  };

  return (
    <div className="px-5 pt-28 pb-16 max-w-7xl mx-auto">
      <h1 className="text-3xl font-black text-[#063f49] dark:text-teal-400 mb-8">
        Submit Your Idea
      </h1>

      <Card className="p-6 sm:p-10 rounded-3xl shadow-lg bg-white dark:bg-(--bg-card) border-none">
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <TextField name="title" isRequired>
                <Label>Idea Title</Label>
                <Input placeholder="e.g. AI-Powered Resume Builder" className="rounded-2xl" />
                <FieldError />
              </TextField>
            </div>

            <div>
              <Select
                name="category"
                isRequired
                className="w-full"
                placeholder="Select category"
              >
                <Label>Category</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Tech" textValue="Tech">
                      Tech
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Health" textValue="Health">
                      Health
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Education" textValue="Education">
                      Education
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Finance" textValue="Finance">
                      Finance
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Social" textValue="Social">
                      Social
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="E-commerce" textValue="E-commerce">
                      E-commerce
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="SaaS" textValue="SaaS">
                      SaaS
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="AI/ML" textValue="AI/ML">
                      AI/ML
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item id="Other" textValue="Other">
                      Other
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField name="budget" isRequired>
              <Label>Estimated Budget (USD)</Label>
              <Input
                type="number"
                placeholder="5000"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            <TextField name="targetAudience" isRequired>
              <Label>Target Audience</Label>
              <Input
                placeholder="e.g. College students, Freelancers"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            <TextField name="tags">
              <Label>Tags (comma separated)</Label>
              <Input
                placeholder="e.g. ai, automation, productivity"
                className="rounded-2xl"
              />
              <FieldError />
            </TextField>

            <div className="md:col-span-2">
              <TextField name="problemStatement" isRequired>
                <Label>Problem Statement</Label>
                <TextArea
                  placeholder="What problem does your idea solve?"
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="solution" isRequired>
                <Label>Proposed Solution</Label>
                <TextArea
                  placeholder="Describe how your idea solves the problem..."
                  className="rounded-3xl"
                />
                <FieldError />
              </TextField>
            </div>

            <div className="md:col-span-2">
              <TextField name="imageUrl">
                <Label>Image URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/idea-cover.jpg"
                  className="rounded-2xl"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#063f49] dark:bg-teal-600 text-white font-bold rounded-full py-6 hover:bg-black transition-all shadow-md hover:shadow-lg"
          >
            Submit Idea
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddIdeaPage;
