import FilterNavigation from "@/features/store/components/FilterNavigation";
import dynamic from "next/dynamic";
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

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <div className="flex-1 flex flex-col min-h-dvh">
        <FilterNavigation />
        {children}
      </div>
    </>
  );
}

export default layout;
