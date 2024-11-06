"use client";

import { Cart, useCartStore } from "@/zustand-store/store";
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
  const addToCart = useCartStore((state) => state.addToCart);
  const updateCart = useCartStore((state) => state.updateCart);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function mutateCart() {
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    const _cart: Cart[] | [] = JSON.parse(localStorage.getItem("cart") ?? "[]");
    if (_cart.length == 0) {
      const CART = [
        {
          id: crypto.randomUUID(),
          userId: user.userId,
          products: [{ quantity, productId }],
          date: new Date().toDateString(),
        },
      ];
      addToCart({
        id: crypto.randomUUID(),
        userId: user.userId,
        products: [{ quantity, productId }],
        date: new Date().toDateString(),
      });
      localStorage.setItem("cart", JSON.stringify(CART));
    } else {
      localStorage.removeItem("cart");
      const newItem = { productId, quantity };
      const updatedCart = _cart.flatMap((item: Cart) =>
        item.products.flatMap((v) => [newItem, v])
      );
      updateCart(
        _cart.flatMap((items) => {
          return [{ ...items, products: updatedCart }];
        })
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          _cart.flatMap((items) => {
            return [{ ...items, products: updatedCart }];
          })
        )
      );
    }
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
      onClick={() => mutateCart()}
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
