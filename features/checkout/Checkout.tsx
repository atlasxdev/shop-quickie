"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DELIVERY_OPTIONS } from "./review-order";
import { useEffect, useState } from "react";
import { ReviewOrder } from "./review-order";
import { DeliveryAddress } from "./delivery-address";
import Unauthorized from "@/components/Unauthorized";
import useMetadata from "@/hooks/use-metadata";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Store } from "lucide-react";
import { useUserStore } from "@/zustand-store/store";

export function Checkout({
  productId,
  quantity,
}: {
  productId: string;
  quantity: string;
}) {
  useMetadata(
    "Checkout - Complete Your Purchase at Shop Quickie",
    "Secure and seamless checkout at [Store Name]. Review your items, enter shipping details, and choose your preferred payment method to complete your purchase. Enjoy a hassle-free shopping experience with our easy checkout process."
  );
  const productIdArray = Array.isArray(productId) ? productId : [productId];
  const quantityArray = Array.isArray(quantity) ? quantity : [quantity];
  const user = useUserStore((state) => state.user);
  const productsWithQuantities = productIdArray.map((id, index) => ({
    productId: id,
    quantity: quantityArray[index],
  }));
  const [isClient, setIsClient] = useState<boolean>(false);
  const [selected, setSelected] = useState<(typeof DELIVERY_OPTIONS)[0] | null>(
    null
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full grid grid-cols1 lg:grid-cols-3 gap-4 md:gap-6">
        <Skeleton className="h-96 rounded-lg w-full" />
        <Skeleton className="h-96 rounded-lg w-full" />
        <Skeleton className="h-96 rounded-lg w-full" />
      </div>
    );
  }

  if (productsWithQuantities.some((v) => v.productId > 20)) {
    return (
      <Card className="max-w-lg mx-auto w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <CardHeader>
          <CardTitle className="-tracking-tighter text-xl md:text-2xl font-bold text-gray-800 mb-4">
            🔍 Product Not Found!
          </CardTitle>
          <CardDescription className="-tracking-tighter text-balance font-medium text-xs md:text-sm mb-4">
            Uh-oh! The product you&apos;re looking for is playing hide and seek.
            Double-check the URL or dive into our store to discover more amazing
            finds!
          </CardDescription>
        </CardHeader>
        <Link
          href="/store"
          className={buttonVariants({
            className: "gap-2 !rounded-full",
          })}
        >
          <Store /> Browse store
        </Link>
      </Card>
    );
  }

  if (
    productsWithQuantities.some((v) => v.quantity > 10) ||
    productsWithQuantities.some((v) => v.quantity < 1)
  ) {
    return (
      <Card className="max-w-lg mx-auto w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <CardHeader>
          <CardTitle className="-tracking-tighter text-xl md:text-2xl font-bold text-gray-800 mb-4">
            ✋ Hold up!
          </CardTitle>
          <CardDescription className="-tracking-tighter text-balance font-medium text-xs md:text-sm mb-4">
            {productsWithQuantities.some((v) => v.quantity < 1)
              ? "You need to order at least 1 unit. Adjust the quantity and give it another shot!"
              : "We love your enthusiasm, but you can only purchase up to 10 units of this product. Please adjust the quantity and give it another go."}
          </CardDescription>
        </CardHeader>
        <Link
          href="/store"
          className={buttonVariants({
            className: "gap-2 !rounded-full",
          })}
        >
          <Store /> Browse store
        </Link>
      </Card>
    );
  }

  if (!user) {
    return <Unauthorized />;
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <ReviewOrder
        productsWithQuantities={productsWithQuantities}
        selected={selected}
        setSelected={setSelected}
      />

      <DeliveryAddress
        productsWithQuantities={productsWithQuantities}
        selected={selected}
      />
    </div>
  );
}
