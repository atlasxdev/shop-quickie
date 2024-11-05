"use client";

import { useCartStore, useUserStore } from "@/zustand-store/store";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function AddToCart({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();
  // const user = useUserStore((state) => state.user);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function updateCart() {
    addToCart({
      productId,
      quantity,
    });
    toast("Item added to your cart! 🎉", {
      action: {
        label: "View",
        onClick: () => router.push("/cart"),
      },
    });
  }

  if (!isClient) {
    return (
      <Button
        disabled
        size={"lg"}
        className="rounded-full w-full gap-2"
        variant={"secondary"}
      >
        Add to cart
        <ShoppingCartIcon />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => updateCart()}
      size={"lg"}
      className="rounded-full w-full gap-2"
      variant={"secondary"}
    >
      Add to cart
      <ShoppingCartIcon />
    </Button>
  );
}

export default AddToCart;
