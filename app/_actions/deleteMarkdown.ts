"use server";

import connectDB from "@/config/database";
import Markdown from "@/models/markdown";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteMarkdown(id: string) {
  await connectDB();
  await Markdown.findByIdAndDelete(id);
  revalidatePath("/");
  redirect("/");
}
