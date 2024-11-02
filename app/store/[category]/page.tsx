import { Products } from "@/features/store/category/components/Products";

function Page({ params: { category } }: { params: { category: string } }) {
  return <Products category={category} />;
}

export default Page;
