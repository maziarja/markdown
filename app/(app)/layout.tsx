import connectDB from "@/config/database";
import Markdown, { type MarkdownType } from "@/models/markdown";
import { convertToObject } from "../_lib/convertToObject";
import Sidebar from "../_components/Sidebar";

export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectDB();
  const markdownsDoc = await Markdown.find().lean();
  const markdowns = convertToObject(markdownsDoc) as MarkdownType[];

  return (
    <div className="bg-layout grid grid-cols-[250px_auto] overflow-hidden">
      <Sidebar markdowns={markdowns} />
      {children}
    </div>
  );
}
