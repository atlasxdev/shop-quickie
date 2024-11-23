"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { DELIVERY_OPTIONS } from "./review-order";
import { useEffect, useState } from "react";
import { ReviewOrder } from "./review-order";
import { DeliveryAddress } from "./delivery-address";
import Unauthorized from "@/components/Unauthorized";
import useMetadata from "@/hooks/use-metadata";

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
  const [user, setUser] = useState<string | null>(null);
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
    setUser(localStorage.getItem("user") ?? null);
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
