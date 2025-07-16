"use server";

import Markdown from "@/models/markdown";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateMarkdown(
  id: string,
  content: string,
  title: string,
) {
  if (id !== "686ed07197d7acc917298d82" && content !== "" && title !== "") {
    await Markdown.findByIdAndUpdate(id, {
      content: content.slice(0, 1000),
      title: title.slice(0, 1000),
    });
  } else {
    return { failed: true };
  }
  revalidatePath(`/`);
  redirect(`/${id}`);
}
