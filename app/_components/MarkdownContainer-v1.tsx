"use client";
import { type MarkdownType } from "@/models/markdown";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { markdownToHtml } from "../_lib/markdownToHtml";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuEyeOff } from "react-icons/lu";
import { useSidebar } from "../_contexts/SidebarContext";

type MarkdownContainerProps = {
  markdown: MarkdownType;
  setUpdatedContent?: Dispatch<SetStateAction<string>>;
};

const MarkdownContainer = ({
  markdown,
  setUpdatedContent,
}: MarkdownContainerProps) => {
  const [content] = useState(markdown?.content);
  const editableRef = useRef<HTMLDivElement>(null);
  const [isRawMarkdown, setIsRawMarkdown] = useState(true);
  const [formattedMarkdown, setIsFormattedMarkdown] = useState("");
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    async function formatMarkdown() {
      const formattedMarkdown = await markdownToHtml(content);
      setIsFormattedMarkdown(formattedMarkdown);
    }
    formatMarkdown();
  }, [content]);

  if (!markdown) return;
  if (!content) return;

  function handleInput() {
    if (editableRef.current) {
      const updatedText = editableRef.current.innerText;
      console.log(editableRef.current);
      console.log(updatedText);
      if (setUpdatedContent) setUpdatedContent(updatedText);
    }
  }

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
          <div
            className="markdown-color"
            contentEditable
            ref={editableRef}
            suppressContentEditableWarning
            onInput={handleInput}
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
          >
            {content}
          </div>
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
        <div
          className={`markdown-color border-grid border-r-1 ${!isRawMarkdown ? "hidden" : ""}`}
          contentEditable
          ref={editableRef}
          suppressContentEditableWarning
          onInput={handleInput}
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
        >
          {content}
        </div>
        <div
          className="mx-auto max-w-[672px]"
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
