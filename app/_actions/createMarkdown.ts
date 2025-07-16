"use server";

import connectDB from "@/config/database";
import Markdown from "@/models/markdown";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createMarkdown(content: string, title: string) {
  await connectDB();
  const newMarkdown = new Markdown({
    content: content.slice(0, 1000),
    title: title.slice(0, 100),
  });

  await newMarkdown.save();

  revalidatePath("/");
  revalidatePath("/newMarkdown");
  redirect(`/${newMarkdown._id}`);
}
