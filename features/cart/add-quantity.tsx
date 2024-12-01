"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Cart, useCartStore } from "@/zustand-store/store";

export function AddQuantity({
  quantity,
  productId,
}: {
  productId: string;
  quantity: number;
}) {
  const updateCart = useCartStore((state) => state.updateCart);
  function changeQuantity(value: number) {
    const _cart: Cart[] | [] = JSON.parse(localStorage.getItem("cart") ?? "[]");
    const updatedCart = _cart.flatMap((item: Cart) => {
      if (item.products.find((v) => v.productId == productId)) {
        item.products.forEach((v) => {
          if (v.productId == productId) {
            v.quantity = value;
          } else {
            return v;
          }
        });
        return item.products.flatMap((v) => v);
      }
      return item.products.flatMap((v) => [v]);
    });
    localStorage.removeItem("cart");
    updateCart(
      _cart.flatMap((items) => {
        return [
          {
            ...items,
            products: updatedCart,
          },
        ];
      })
    );
    localStorage.setItem(
      "cart",
      JSON.stringify(
        _cart.flatMap((items) => {
          return [
            {
              ...items,
              products: updatedCart,
            },
          ];
        })
      )
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <p className="text-sm -tracking-tighter text-muted-foreground">
        Qty:{" "}
        <AnimatedNumber className="font-semibold text-black" value={quantity} />
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ChevronDown className="stroke-[#0071E3]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="space-y-2">
          <ScrollArea className="h-40 pr-3">
            {Array.from({ length: 10 }).map((_, index) => (
              <DropdownMenuItem
                onClick={() => changeQuantity(index + 1)}
                className="max-w-full tabular-nums cursor-pointer"
                key={index}
              >
                <AnimatedNumber value={index + 1} className="w-max mx-auto" />
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
