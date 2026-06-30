import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeInitializer } from "@/components/layout/ThemeInitializer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Blog Platform",
  description: "A blog platform built with Next.js and TypeScript.",
};

// for dark / light theme
const noFlashThemeScript = `
(function () {
  try {
    var theme = localStorage.getItem("blog-platform-theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeInitializer />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#16151a",
              color: "#fbfaf8",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
