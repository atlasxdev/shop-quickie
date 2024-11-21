"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import Image from "next/image";
import { Product } from "@/types";
import { motion } from "framer-motion";
import { cn, priceFormatter } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiRoute } from "@/axios/apiRoute";

export const DELIVERY_OPTIONS = [
  {
    price: 0,
    title: "Regular delivery",
    timeFrame: "(3-7 business days)",
  },
  {
    price: 9,
    title: "Express delivery",
    timeFrame: "(1-3 business days)",
  },
  {
    price: 18,
    title: "Next day delivery",
    timeFrame: "(1-2 business days)",
  },
];

export function ReviewOrder({
  productsWithQuantities,
  selected,
  setSelected,
}: {
  productsWithQuantities: { [key: string]: string }[];
  selected: (typeof DELIVERY_OPTIONS)[0] | null;
  setSelected: Dispatch<SetStateAction<(typeof DELIVERY_OPTIONS)[0] | null>>;
}) {
  return (
    <Card className="w-full h-max">
      <CardHeader>
        <CardTitle className="text-[#FBA328] uppercase -tracking-tighter">
          1. Review your order
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {productsWithQuantities.map((v, index) => (
          <Item key={index} productId={v.productId} quantity={v.quantity} />
        ))}
        <div className="space-y-4">
          <motion.p
            animate={{
              color:
                selected == null
                  ? "rgb(220 38 38 / 1)"
                  : "hsl(var(--muted-foreground))",
            }}
            className="font-bold -tracking-tighter uppercase text-sm text-muted-foreground"
          >
            Select delivery{selected == null ? "*" : null}
          </motion.p>
          <DeliverOptions selected={selected} setSelected={setSelected} />
        </div>
      </CardContent>
    </Card>
  );
}

function DeliverOptions({
  selected,
  setSelected,
}: {
  selected: (typeof DELIVERY_OPTIONS)[0] | null;
  setSelected: Dispatch<SetStateAction<(typeof DELIVERY_OPTIONS)[0] | null>>;
}) {
  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      aria-label="Server size"
      className="space-y-4"
    >
      {DELIVERY_OPTIONS.map((option) => (
        <Radio
          key={option.timeFrame}
          value={option}
          className={({ checked, focus, hover }) =>
            cn(
              "group relative border flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-black shadow-md transition opacity-60",
              {
                "outline outline-[#0071E3] opacity-100": checked || focus,
                "opacity-90": hover,
              }
            )
          }
        >
          <p className="text-sm uppercase -tracking-tighter font-semibold">
            {option.price === 0 ? "Free" : priceFormatter(option.price)}
          </p>

          <div className="w-max ml-auto">
            <p className="text-sm -tracking-tighter font-medium">
              {option.title}
            </p>
            <span className="text-xs -tracking-tighter text-muted-foreground">
              {option.timeFrame}
            </span>
          </div>
        </Radio>
      ))}
    </RadioGroup>
  );
}

function Item({
  productId,
  quantity,
}: {
  productId: string;
  quantity: string;
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

  if (isError) {
    return notFound();
  }

  if (isLoading || data?.data == null) {
    return <Skeleton className="h-20 rounded-lg w-full" />;
  }

  return (
    <>
      <div className="w-full flex gap-4">
        <Image
          src={data.data.image}
          width={80}
          height={80}
          alt={data.data.description}
          className="object-contain"
        />
        <div className="space-y-4">
          <p className="text-sm font-medium -tracking-tighter text-pretty">
            {data.data.title}
          </p>
          <div className="space-y-1">
            <p className="text-xs font-medium -tracking-tighter">
              {priceFormatter(data.data.price)}
            </p>
            <p className="text-xs font-medium -tracking-tighter text-muted-foreground">
              Qty: {quantity}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-xs uppercase font-bold -tracking-tighter">
            Subtotal
          </p>

          <p className="text-sm font-bold -tracking-tighter">
            {priceFormatter(data.data.price * parseInt(quantity))}
          </p>
        </div>
        <Separator />
      </div>
    </>
  );
}
