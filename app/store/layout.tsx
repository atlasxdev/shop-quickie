"use client";

import FilterNavigation from "@/features/store/components/FilterNavigation";
import dynamic from "next/dynamic";
import { NavLoader } from "@/components/nav-loader";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

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

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <>
      <Navigation />
      <div className="pl-6 md:pl-8 pt-8 md:pt-6">
        <Button
          onClick={() => router.push("/")}
          className="uppercase font-bold -tracking-tighter text-[#FBA328] gap-2 pl-0 lg:pl-4"
          variant={"link"}
          size={"sm"}
        >
          <ArrowLeftIcon />
          Go back
        </Button>
      </div>
      <div className="flex-1 flex flex-col min-h-dvh">
        <FilterNavigation />
        {children}
      </div>
    </>
  );
}

export default Layout;
