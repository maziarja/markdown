import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import { SidebarProvider } from "./_contexts/SidebarContext";
import connectDB from "@/config/database";
import Markdown, { MarkdownType } from "@/models/markdown";
import { convertToObject } from "./_lib/convertToObject";
import Sidebar from "./_components/Sidebar";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Markdown App",
  description: "In-browser markdown editor",
};

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB();
  const markdownsDoc = await Markdown.find().lean();
  const markdowns = convertToObject(markdownsDoc) as MarkdownType[];

  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${robotoMono.className} ${robotoSlab.className} ${roboto.className} `}
    >
      <body>
        <ThemeProvider enableSystem={false}>
          <SidebarProvider>
            <div className="bg-layout grid grid-cols-[250px_auto] overflow-hidden">
              <Sidebar markdowns={markdowns} />
              {children}
            </div>
          </SidebarProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
