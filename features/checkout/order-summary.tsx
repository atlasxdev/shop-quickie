"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DELIVERY_OPTIONS } from "./review-order";
import { Separator } from "@/components/ui/separator";
import { CompleteOrderDialog } from "./complete-order-dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRoute } from "@/axios/apiRoute";
import { Product } from "@/types";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

function OrderSummary({
  productsWithQuantities,
  isValid,
  deliveryOption,
}: {
  productsWithQuantities: { [key: string]: string }[];
  isValid: boolean;
  deliveryOption?: (typeof DELIVERY_OPTIONS)[0];
}) {
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  useEffect(() => {
    if (deliveryOption == null || deliveryOption.price == 0) {
      setOrderTotal(itemTotal);
    } else {
      setOrderTotal(itemTotal + deliveryOption.price);
    }
  }, [deliveryOption, itemTotal]);

  return (
    <Card className={"w-full h-max"}>
      <CardHeader className="space-y-4">
        <CardTitle className="text-[#FBA328] uppercase -tracking-tighter">
          Order summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {productsWithQuantities.map((v, index) => (
          <Summary
            key={index}
            productId={v.productId}
            quantity={v.quantity}
            setItemTotal={setItemTotal}
          />
        ))}
        {deliveryOption != null ? (
          <>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="font-medium text-xs uppercase -tracking-tighter">
                  Delivery option
                </span>
                <span className="text-[0.7rem] -tracking-tighter font-medium text-muted-foreground">
                  {" "}
                  {deliveryOption.title}
                </span>
              </div>

              <div className="space-x-1">
                <span>+</span>
                <AnimatedNumber
                  className="text-xs"
                  value={deliveryOption.price}
                  isPrice={true}
                />
              </div>
            </div>
          </>
        ) : null}
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm uppercase -tracking-tighter">
            Order total
          </span>

          <AnimatedNumber value={orderTotal} isPrice={true} />
        </div>
        <CompleteOrderDialog isValid={isValid} />
      </CardContent>
    </Card>
  );
}

function Summary({
  productId,
  quantity,
  setItemTotal,
}: {
  productId: string;
  quantity: string;
  setItemTotal: Dispatch<SetStateAction<number>>;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["checkout-item", productId],
    queryFn: async () => {
      return await apiRoute.get<Product>(`/products/${productId}`);
    },
    enabled: productId != null && quantity != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.data == null) return;
    setItemTotal((prev) => {
      console.log(prev);
      return prev + data.data.price * parseInt(quantity);
    });

    return () => setItemTotal(0);
  }, [data?.data, quantity, setItemTotal]);

  if (isError) {
    return notFound();
  }

  if (isLoading || data?.data == null) {
    return <Skeleton className="h-20 rounded-lg w-full" />;
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-1.5">
        <span className="w-max flex font-medium text-[0.65rem] -tracking-tighter text-muted-foreground">
          {quantity}x
        </span>
        <span className="text-[0.65rem] -tracking-tighter font-medium text-balance">
          {data.data.title}
        </span>
      </div>

      <AnimatedNumber
        className="text-xs"
        value={data.data.price * parseInt(quantity)}
        isPrice={true}
      />
    </div>
  );
}

export default OrderSummary;
