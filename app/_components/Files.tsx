import { MarkdownType } from "@/models/markdown";
import { GrDocument } from "react-icons/gr";
import { convertDate } from "../_lib/convertDate";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";

type FilesProps = {
  markdown: MarkdownType;
  onIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Files = ({ markdown, onIsSidebarOpen }: FilesProps) => {
  return (
    <Link
      href={`/${markdown._id}`}
      onClick={() => onIsSidebarOpen(false)}
      className="flex items-center gap-4"
    >
      <GrDocument className="text-100" />
      <div className="flex flex-col gap-1">
        <span className="text-500 body-m">
          {convertDate(markdown.createdAt)}
        </span>
        <span className="heading-m">{markdown.title}</span>
      </div>
    </Link>
  );
};

export default Files;
