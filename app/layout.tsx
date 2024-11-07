import "./globals.css";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/components/tanstack-query/Provider";

const recursive = Recursive({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Shop Quickie",
  description:
    "Your go-to platform for fast, hassle-free online shopping. Discover a wide range of products, find great deals, and enjoy a seamless experience with just a few clicks. Get started now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className={`${recursive.className} flex flex-col min-h-dvh antialiased`}
      >
        <Provider>{children}</Provider>
        <Toaster closeButton theme="light" position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
