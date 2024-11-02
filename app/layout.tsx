import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";
import Provider from "@/components/tanstack-query/Provider";
import { NavLoader } from "@/components/nav-loader";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
  loading: ({ isLoading }) => {
    if (isLoading) {
      return <NavLoader />;
    } else {
      return null;
    }
  },
});

const figtree = Figtree({
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
        className={`${figtree.className} flex flex-col min-h-dvh antialiased`}
      >
        <Navigation />
        <Provider>{children}</Provider>
        <Footer />
      </body>
    </html>
  );
}
