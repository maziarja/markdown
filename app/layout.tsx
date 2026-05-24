import type { Metadata } from "next";
import "./globals.css";
import { Roboto_Slab } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Roboto } from "next/font/google";
import { SidebarProvider } from "./_contexts/SidebarContext";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${robotoMono.className} ${robotoSlab.className} ${roboto.className} `}
    >
      <body>
        <ThemeProvider enableSystem={false}>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
