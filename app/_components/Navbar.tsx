"use client";
import { TfiMenu } from "react-icons/tfi";
import { GrDocument } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useSidebar } from "../_contexts/SidebarContext";
import { createMarkdown } from "../_actions/createMarkdown";
import { MarkdownType } from "@/models/markdown";
import { updateMarkdown } from "../_actions/updateMarkdown";
import toast from "react-hot-toast";

type NavbarProps = {
  markdown?: MarkdownType;
  newContent?: string;
  updatedContent?: string;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({
  newContent,
  markdown,
  updatedContent,
  setShowModal,
}: NavbarProps) => {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(markdown?.title || "untitled-document");
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

  async function handleCreateNewMarkdown() {
    if (newContent !== undefined && newContent !== "" && !markdown) {
      startTransition(async () => {
        await createMarkdown(newContent, title);
      });
    }

    console.log(updatedContent);
    if (!newContent && markdown && updatedContent && title !== "") {
      startTransition(async () => {
        const result = await updateMarkdown(
          markdown._id,
          updatedContent,
          title,
        );
        if (result.failed) toast.error("You can't edit this markdown");
      });
    }
  }

  return (
    <div className="bg-800 flex items-center pr-2">
      <button
        onClick={() => setIsSidebarOpen((isOpen) => (isOpen = !isOpen))}
        className="bg-700 mr-6 flex h-14 w-14 items-center justify-center sm:h-18 sm:w-18"
      >
        {!isSidebarOpen ? (
          <TfiMenu className="text-100" />
        ) : (
          <RiCloseLargeFill className="text-100 text-xl" />
        )}
      </button>
      <span className="text-100 \text-base mt-auto mr-4 mb-6.5 hidden items-center self-center font-bold tracking-[5px] lg:flex">
        MARKDOWN
      </span>
      <div className="bg-600 mr-4 hidden h-10 w-[1px] lg:block"></div>
      <div className="mr-4 flex items-center gap-3">
        <GrDocument className="text-100" />
        <div>
          <span className="body-s hidden sm:block">Document Name</span>
          <input
            type="text"
            className="heading-m outline-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-6">
        <FaRegTrashAlt
          onClick={() => setShowModal && setShowModal(true)}
          className="text-500 h-5 w-4"
        />
        <button
          disabled={isPending}
          onClick={handleCreateNewMarkdown}
          className="bg-orange disabled:bg-orange-hover flex items-center justify-center rounded-sm p-2.5"
        >
          <FaRegSave className="text-100" />
          <span className="heading-m ml-2 hidden sm:block">Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
