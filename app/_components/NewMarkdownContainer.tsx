"use client";
import { LuEyeOff } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Dispatch, SetStateAction, useState } from "react";
import { markdownToHtml } from "../_lib/markdownToHtml";

type NewMarkdownContainerProps = {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
};

const NewMarkdownContainer = ({
  content,
  setContent,
}: NewMarkdownContainerProps) => {
  const [isRawMarkdown, setIsRawMarkdown] = useState(true);
  const [formattedMarkdown, setIsFormattedMarkdown] = useState("");

  async function handleClickOnIsRawMarkdown() {
    setIsRawMarkdown((isRawMarkdown) => (isRawMarkdown = !isRawMarkdown));
    const formattedMarkdown = await markdownToHtml(content);
    setIsFormattedMarkdown(formattedMarkdown);
  }

  return (
    <>
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
      {isRawMarkdown ? (
        <textarea
          className="markdown-code markdown-color h-dvh w-full p-4 outline-0"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: formattedMarkdown }}
          style={{
            whiteSpace: "pre-wrap",
            fontFamily: "Roboto Mono ",
            color: "#35393f",
            fontSize: "14px",
            lineHeight: "24px",
            fontWeight: "400",
            padding: "16px",
            outline: "none",
          }}
        />
      )}
    </>
  );
};

export default NewMarkdownContainer;
