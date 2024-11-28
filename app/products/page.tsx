import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ProductPage } from "@/features/products/components/ProductPage";
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

function Page({
  params: {},
  searchParams: { id, search },
}: {
  params: { [key: string]: unknown };
  searchParams: { id: string; search?: string };
}) {
  return (
    <>
      <Navigation />
      <div className="flex-1 bg-[#F5F5F7]">
        <MaxWidthWrapper>
          <ProductPage id={id} search={search} />
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Page;
