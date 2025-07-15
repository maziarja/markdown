import connectDB from "@/config/database";
import Markdown, { type MarkdownType } from "@/models/markdown";
import MainPage from "./_components/MainPage";
import { convertToObject } from "./_lib/convertToObject";

const Page = async () => {
  await connectDB();
  const initialMarkdownDoc = await Markdown.findOne({
    _id: "686ed07197d7acc917298d82",
  }).lean();

  const initialMarkdown = convertToObject(initialMarkdownDoc) as MarkdownType;
  return (
    <>
      <MainPage initialMarkdown={initialMarkdown} />
    </>
  );
};

export default Page;
