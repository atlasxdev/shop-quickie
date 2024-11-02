import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Product } from "@/features/products/components/Product";

function Page({
  params: {},
  searchParams: { id },
}: {
  params: { [key: string]: unknown };
  searchParams: { id: string };
}) {
  return (
    <div className="flex-1 bg-[#F5F5F7]">
      <MaxWidthWrapper>
        <Product id={id} />
      </MaxWidthWrapper>
    </div>
  );
}

export default Page;
