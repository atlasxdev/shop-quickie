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
  price,
  size = "lg",
}: {
  productId: string;
  quantity: number;
  price: number;
  size: "lg" | "sm";
}) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const setCart = useCartStore((state) => state.setCart);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function mutateCart() {
    const products = cart?.products;
    const item = { productId, quantity, price };
    if (cart == null) {
      const _cart = {
        id: crypto.randomUUID(),
        userId: (user as unknown as { token: string; userId: number })?.userId,
        products: [{ ...item }],
        date: new Date().toDateString(),
      };
      setCart(_cart);
      toast.success("Item added to your cart! 🎉", {
        action: {
          label: "View",
          onClick: () => router.push("/cart"),
        },
      });
      return;
    }

    const productExist = products?.find((v) => v.productId == item.productId);

    if (productExist == null) {
      addToCart(item);
      toast.success("Item added to your cart! 🎉", {
        action: {
          label: "View",
          onClick: () => router.push("/cart"),
        },
      });
      return;
    }

    if (productExist.quantity > 10 || productExist.quantity + quantity > 10) {
      toast.dismiss();
      toast.warning("🔔 Heads Up!", {
        description: "You can only add up to 10 of this item.",
      });
      return;
    }

    const updatedProductQuantity = {
      ...productExist,
      quantity: productExist.quantity + quantity,
    };
    removeItem(productExist.productId);
    addToCart(updatedProductQuantity);
    toast.dismiss();
    toast.success("Item added to your cart! 🎉", {
      action: {
        label: "View",
        onClick: () => router.push("/cart"),
      },
    });
    return;
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
      onClick={() => mutateCart()}
      size={size}
      className="rounded-full w-full gap-2"
      variant={"secondary"}
    >
      Add to cart
      <ShoppingCartIcon />
    </Button>
  );
}

export default AddToCart;
