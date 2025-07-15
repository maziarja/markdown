import connectDB from "@/config/database";
import Markdown, { MarkdownType } from "@/models/markdown";
import { convertToObject } from "../_lib/convertToObject";
import MarkdownPageClient from "../_components/MarkdownPageClient";

type MarkdownPageProps = {
  params: Promise<{ id: string }>;
};

const MarkdownPage = async ({ params }: MarkdownPageProps) => {
  const id = (await params).id;

  await connectDB();
  const markdownDoc = await Markdown.findOne({ _id: id }).lean();
  const markdown = convertToObject(markdownDoc) as MarkdownType;

  return (
    <>
      <MarkdownPageClient markdown={markdown} />
    </>
  );
};

export default MarkdownPage;
