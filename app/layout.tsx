import "./globals.css";
import { Recursive } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/components/tanstack-query/Provider";
import NextTopLoader from "nextjs-toploader";
import Scroll from "@/components/Scroll";

const recursive = Recursive({
  subsets: ["latin"],
});

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
        suppressHydrationWarning={true}
        className={`${recursive.className} flex flex-col min-h-screen antialiased`}
      >
        <Scroll />
        <NextTopLoader color="#FBA328" />
        <Provider>{children}</Provider>
        <Toaster
          closeButton
          theme="light"
          position="top-center"
          richColors
          toastOptions={{
            classNames: {
              actionButton: "!bg-[#008A2E]",
            },
          }}
        />
        <Footer />
      </body>
    </html>
  );
}
