"use client";
import { type MarkdownType } from "@/models/markdown";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { markdownToHtml } from "../_lib/markdownToHtml";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import { useSidebar } from "../_contexts/SidebarContext";
import Spinner from "./Spinner";

type MarkdownContainerProps = {
  markdown: MarkdownType;
  setUpdatedContent?: Dispatch<SetStateAction<string>>;
};

const MarkdownContainer = ({
  markdown,
  setUpdatedContent,
}: MarkdownContainerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(markdown?.content);
  const [isRawMarkdown, setIsRawMarkdown] = useState(true);
  const [formattedMarkdown, setIsFormattedMarkdown] = useState("");
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    async function formatMarkdown() {
      try {
        const formattedMarkdown = await markdownToHtml(content);
        setIsFormattedMarkdown(formattedMarkdown);
      } finally {
        setIsLoading(false);
      }
    }
    formatMarkdown();
  }, [content]);

  useEffect(() => {
    if (setUpdatedContent) setUpdatedContent(content);
  }, [content, setUpdatedContent]);

  if (!markdown) return;

  async function handleClickOnIsRawMarkdown() {
    setIsRawMarkdown((isRawMarkdown) => (isRawMarkdown = !isRawMarkdown));
    const formattedMarkdown = await markdownToHtml(content);
    setIsFormattedMarkdown(formattedMarkdown);
  }

  return (
    <div
      className={`${!isSidebarOpen ? "col-span-2" : ""} md:min-w-[768px] lg:min-w-[1024px] xl:min-w-[1280px]`}
    >
      <div className="bg-convertor flex items-center justify-between p-4">
        <span className="heading-s">
          {isRawMarkdown ? "MARKDOWN" : "PREVIEW"}
        </span>
        <button onClick={handleClickOnIsRawMarkdown}>
          {isRawMarkdown ? (
            <MdOutlineRemoveRedEye className="text-500 text-xl" />
          ) : (
            <LuEyeOff className="text-500 text-xl" />
          )}
        </button>
      </div>
      <div className="md:hidden">
        {isRawMarkdown ? (
          <textarea
            className="markdown-color w-full"
            suppressContentEditableWarning
            onChange={(e) => setContent(e.target.value)}
            value={content}
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "Roboto Mono",
              fontSize: "14px",
              lineHeight: "24px",
              fontWeight: "400",
              padding: "16px",
              outline: "none",
              minHeight: "calc(100dvh - 105px)",
            }}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: formattedMarkdown }}
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "Roboto Mono",
              fontSize: "24px",
              lineHeight: "24px",
              fontWeight: "400",
              padding: "16px",
              outline: "none",
              minHeight: "calc(100dvh - 105px)",
            }}
          />
        )}
      </div>
      <div
        className={`hidden md:grid ${isRawMarkdown ? "md:grid-cols-2" : "md:grid-cols-1"}`}
      >
        <textarea
          className={`markdown-color border-grid border-r-1 ${!isRawMarkdown ? "hidden" : ""}`}
          onChange={(e) => setContent(e.target.value)}
          suppressContentEditableWarning
          value={content}
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "Roboto Mono",
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: "400",
            padding: "16px",
            outline: "none",
            minHeight: "calc(100dvh - 105px)",
          }}
        />
        {isLoading && <Spinner />}
        <div
          className={`max-w-[672px] ${!isRawMarkdown ? "md:mx-auto" : ""}`}
          dangerouslySetInnerHTML={{ __html: formattedMarkdown }}
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "Roboto Mono",
            fontSize: "24px",
            lineHeight: "24px",
            fontWeight: "400",
            padding: "16px",
            outline: "none",
            minHeight: "calc(100dvh - 105px)",
          }}
        />
      </div>
    </div>
  );
};

export default MarkdownContainer;
