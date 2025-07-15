"use client";
import { useState } from "react";
import Navbar from "../_components/Navbar";
import NewMarkdownContainer from "../_components/NewMarkdownContainer";
import { useSidebar } from "../_contexts/SidebarContext";

const NewMarkdown = () => {
  const [content, setContent] = useState("");
  const { isSidebarOpen } = useSidebar();
  return (
    <div className={!isSidebarOpen ? "col-span-2" : ""}>
      <Navbar newContent={content} />
      <NewMarkdownContainer content={content} setContent={setContent} />
    </div>
  );
};

export default NewMarkdown;
