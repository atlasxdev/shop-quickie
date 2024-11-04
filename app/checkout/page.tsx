import { Checkout } from "@/features/checkout/Checkout";
import { notFound } from "next/navigation";

function Page({
  params: {},
  searchParams: { productId, quantity },
}: {
  params: { [key: string]: unknown };
  searchParams: { productId: string; quantity: string };
}) {
  if (productId == null || quantity == null) {
    return notFound();
  }

  return <Checkout productId={productId} quantity={quantity} />;
}

export default Page;
