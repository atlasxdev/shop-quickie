import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Product } from "@/features/products/components/Product";
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
  searchParams: { id },
}: {
  params: { [key: string]: unknown };
  searchParams: { id: string };
}) {
  return (
    <>
      <Navigation />
      <div className="flex-1 bg-[#F5F5F7]">
        <MaxWidthWrapper>
          <Product id={id} />
        </MaxWidthWrapper>
      </div>
    </>
  );
}

export default Page;
