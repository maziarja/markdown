"use client";

import { useSidebar } from "../_contexts/SidebarContext";
import MarkdownContainer from "./MarkdownContainer";
import type { MarkdownType } from "@/models/markdown";
import Navbar from "./Navbar";
import { useState } from "react";
import Modal from "./Modal";

type MarkdownPageClientProps = {
  markdown: MarkdownType;
};

const MarkdownPageClient = ({ markdown }: MarkdownPageClientProps) => {
  const { isSidebarOpen } = useSidebar();
  const [updatedContent, setUpdatedContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <Modal markdown={markdown} setShowModal={setShowModal} />}
      <div className={!isSidebarOpen ? "col-span-2" : ""}>
        <Navbar
          markdown={markdown}
          updatedContent={updatedContent}
          setShowModal={setShowModal}
        />
        <MarkdownContainer
          markdown={markdown}
          setUpdatedContent={setUpdatedContent}
        />
      </div>
    </>
  );
};

export default MarkdownPageClient;
