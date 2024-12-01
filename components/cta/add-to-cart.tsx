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
  price,
  size = "lg",
}: {
  productId: string;
  quantity: number;
  price: number;
  size: "lg" | "sm";
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
    const products = _cart.flatMap((items) => items.products);
    if (_cart.length == 0) {
      const CART = [
        {
          id: crypto.randomUUID(),
          userId: user.userId,
          products: [{ productId, quantity, price }],
          date: new Date().toDateString(),
        },
      ];
      addToCart({
        id: crypto.randomUUID(),
        userId: user.userId,
        products: [{ productId, quantity, price }],
        date: new Date().toDateString(),
      });
      localStorage.setItem("cart", JSON.stringify(CART));
      toast.success("Item added to your cart! 🎉", {
        action: {
          label: "View",
          onClick: () => router.push("/cart"),
        },
      });
    } else if (products.length == 0) {
      localStorage.removeItem("cart");
      const newItem = { productId, quantity, price };
      const updatedCart = _cart.flatMap((item: Cart) => {
        item.products.push(newItem as never);
        return item;
      });
      updateCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item added to your cart! 🎉", {
        action: {
          label: "View",
          onClick: () => router.push("/cart"),
        },
      });
    } else {
      localStorage.removeItem("cart");
      const newItem = { productId, quantity, price };
      const updatedCart = _cart.flatMap((item: Cart) => {
        if (item.products.find((v) => v.productId == newItem.productId)) {
          item.products.forEach((v) => {
            if (v.productId == newItem.productId) {
              if (v.quantity + quantity > 10 || v.quantity >= 10) {
                toast.warning("🔔 Heads Up!", {
                  description: "You can only add up to 10 of this item.",
                });
              } else {
                v.quantity += quantity;
                toast.success("Item added to your cart! 🎉", {
                  action: {
                    label: "View",
                    onClick: () => router.push("/cart"),
                  },
                });
              }
            } else {
              return v;
            }
          });
          return item.products.flatMap((v) => v);
        }
        toast.success("Item added to your cart! 🎉", {
          action: {
            label: "View",

            onClick: () => router.push("/cart"),
          },
        });
        return item.products.flatMap((v) => [newItem, v]);
      });
      updateCart(
        _cart.flatMap((items) => {
          return [
            {
              ...items,
              products: updatedCart.filter(
                (v, index) => updatedCart.indexOf(v) === index
              ),
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
                products: updatedCart.filter(
                  (v, index) => updatedCart.indexOf(v) === index
                ),
              },
            ];
          })
        )
      );
    }
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
