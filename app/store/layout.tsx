import FilterNavigation from "@/features/store/components/FilterNavigation";
import dynamic from "next/dynamic";
import { NavLoader } from "@/components/nav-loader";
import { GoBack } from "@/components/cta/go-back";

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
  return (
    <>
      <Navigation />
      <div className="block md:hidden pl-6 md:pl-8 pt-8 md:pt-6">
        <GoBack />
      </div>
      <div className="flex-1 flex flex-col min-h-dvh">
        <FilterNavigation />
        {children}
      </div>
    </>
  );
}

export default Layout;
