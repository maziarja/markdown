"use client";

import MarkdownContainer from "./MarkdownContainer";
import { type MarkdownType } from "@/models/markdown";
import { useSearchParams } from "next/navigation";
import { useSidebar } from "../_contexts/SidebarContext";
import Navbar from "./Navbar";
import Modal from "./Modal";
import { useState } from "react";

type MainPageProps = {
  initialMarkdown: MarkdownType;
};

const MainPage = ({ initialMarkdown }: MainPageProps) => {
  const { isSidebarOpen } = useSidebar();
  const searchParams = useSearchParams();
  const isNewMarkdown = searchParams.get("newMarkdown");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <Modal markdown={initialMarkdown} setShowModal={setShowModal} />
      )}
      <div className={!isSidebarOpen ? "col-span-2" : ""}>
        <Navbar markdown={initialMarkdown} setShowModal={setShowModal} />
        {initialMarkdown && !isNewMarkdown && (
          <MarkdownContainer markdown={initialMarkdown} />
        )}
      </div>
    </>
  );
};

export default MainPage;
