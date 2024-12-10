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
import { useCartStore } from "@/zustand-store/store";

export function AddQuantity({
  quantity,
  productId,
}: {
  productId: string;
  quantity: number;
}) {
  const setItemQuantity = useCartStore((state) => state.setItemQuantity);
  function changeQuantity(value: number) {
    setItemQuantity(productId, value);
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
