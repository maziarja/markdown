"use client";
import { type MarkdownType } from "@/models/markdown";
import Files from "./Files";
import Link from "next/link";
import { useSidebar } from "../_contexts/SidebarContext";
import { BsMoon } from "react-icons/bs";
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type SidebarProps = {
  markdowns: MarkdownType[];
};

const Sidebar = ({ markdowns }: SidebarProps) => {
  const { setIsSidebarOpen, isSidebarOpen } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  function handleDarkmode() {
    setTheme((prevState) => (prevState === "dark" ? "light" : "dark"));
  }
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  if (!isSidebarOpen) return null;
  return (
    <div className="bg-900 flex min-h-dvh w-[250px] flex-col px-6 py-6.5">
      <span className="text-100 mb-6.5 text-base font-bold tracking-[5px] lg:hidden">
        MARKDOWN
      </span>
      <span className="heading-s mb-7">MY DOCUMENTS</span>
      <Link
        className="bg-orange mb-6 flex cursor-pointer items-center justify-center rounded-sm py-3"
        href={`/newMarkdown`}
        onClick={() => setIsSidebarOpen(false)}
      >
        <span className="heading-m">+ New Document</span>
      </Link>
      <div className="flex flex-col gap-6.5">
        {markdowns.length > 0 &&
          markdowns.map((markdown) => (
            <Files
              key={markdown._id}
              markdown={markdown}
              onIsSidebarOpen={setIsSidebarOpen}
            />
          ))}
      </div>
      <div className="mt-auto flex items-center gap-2.5">
        <div>
          <BsMoon
            className={`${theme === "dark" ? "text-100" : "text-600"} h-4 w-4`}
          />
        </div>
        <div className="bg-600 flex h-6 w-12 items-center rounded-full px-2">
          <button
            onClick={handleDarkmode}
            className={`${theme === "light" ? "ml-5" : "ml-0"} bg-100 h-3 w-3 cursor-pointer rounded-full transition-all duration-300`}
          ></button>
        </div>
        <div>
          <MdOutlineWbSunny
            className={`${theme === "light" ? "text-100" : "text-600"} h-4.5 w-4.5`}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
