"use client";

import { apiRoute } from "@/axios/apiRoute";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { DELIVERY_OPTIONS } from "./review-order";
import { useState } from "react";
import { ReviewOrder } from "./review-order";
import { DeliveryAddress } from "./delivery-address";

export function Checkout({
  productId,
  quantity,
}: {
  productId: string;
  quantity: string;
}) {
  const [selected, setSelected] = useState<(typeof DELIVERY_OPTIONS)[0] | null>(
    null
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      return await apiRoute.get<Product>(`/products/${productId}`);
    },
    enabled: productId != null && quantity != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return notFound();
  }

  if (isLoading || data?.data == null) {
    return (
      <div className="w-full grid grid-cols-3 gap-4 md:gap-6">
        <Skeleton className="h-96 rounded-lg w-full" />
        <Skeleton className="h-96 rounded-lg w-full" />
        <Skeleton className="h-96 rounded-lg w-full" />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <ReviewOrder
        quantity={quantity}
        data={data.data}
        selected={selected}
        setSelected={setSelected}
      />

      <DeliveryAddress
        title={data.data.title}
        quantity={Number(quantity)}
        price={data.data.price}
        selected={selected}
      />
    </div>
  );
}
