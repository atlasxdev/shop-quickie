"use client";

import { apiRoute } from "@/axios/apiRoute";
import { GoBack } from "@/components/cta/go-back";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { NavLoader } from "@/components/nav-loader";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { AddQuantity } from "@/features/cart/add-quantity";
import { Checkout } from "@/features/cart/Checkout";
import useMetadata from "@/hooks/use-metadata";
import { priceFormatter } from "@/lib/utils";
import { Product } from "@/types";
import { Cart, useCartStore, useUserStore } from "@/zustand-store/store";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogIn } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: false,
  loading: ({ isLoading }) => {
    if (isLoading) {
      return <NavLoader />;
    } else {
      return null;
    }
  },
});

function Page() {
  useMetadata(
    "Your Cart - Shop Quickie",
    "Review and manage the items in your shopping cart. Ready to proceed to checkout and complete your purchase? Enjoy a seamless shopping experience with all your favorite products just a click away!"
  );
  const updateCart = useCartStore((state) => state.updateCart);
  const cart = useCartStore((state) => state.cart);
  const user = useUserStore((state) => state.user);
  const logIn = useUserStore((state) => state.logIn);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const _cart = JSON.parse(localStorage.getItem("cart") ?? "null");
    updateCart(_cart);
    const _user = JSON.parse(localStorage.getItem("user") ?? "null");
    logIn(_user);
  }, [logIn, updateCart]);

  const products = useMemo(() => {
    if (cart == null) return [];
    if (user) {
      const userCart = cart.find(
        (items) =>
          items.userId == (user as unknown as { userId: number }).userId
      );
      return userCart != null
        ? cart.find(
            (items) =>
              items.userId == (user as unknown as { userId: number }).userId
          )!.products
        : [];
    } else {
      return cart != null ? cart.flatMap((items) => items.products) : [];
    }
  }, [cart, user]);

  useEffect(() => {
    setCartTotal(() =>
      products.reduce((acc, val) => acc + val.price * val.quantity, 0)
    );
  }, [products]);

  if (!isClient) {
    return (
      <>
        <Navigation />
        <div className="flex-1 py-12 md:py-14 lg:py-16">
          <MaxWidthWrapper className="max-w-screen-xl">
            <Skeleton className="w-full h-96" />
          </MaxWidthWrapper>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto">
          {products.length > 0 && (
            <div className="pl-6 xl:pl-0 pt-6 md:pt-8">
              <GoBack />
            </div>
          )}
          <div className="py-14 md:py-16 lg:py-20">
            <MaxWidthWrapper className="max-w-screen-lg">
              <AnimatePresence>
                {products.length > 0 && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    className="space-y-10 md:space-y-14"
                  >
                    <h1 className="text-center text-2xl md:text-3xl -tracking-tighter font-semibold">
                      Your cart total is{" "}
                      <AnimatedNumber value={cartTotal} isPrice={true} />
                    </h1>

                    {products.map((product, index) => (
                      <CartItem
                        setCartTotal={setCartTotal}
                        key={index}
                        id={product.productId}
                        index={index}
                        quantity={product.quantity}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {products.length > 0 && cartTotal > 0 && (
                <AnimatePresence>
                  <Checkout
                    user={user}
                    cartTotal={cartTotal}
                    products={products}
                  />
                </AnimatePresence>
              )}
              {cart == null || products.length == 0 || cart.length == 0 ? (
                <EmptyCart />
              ) : null}
            </MaxWidthWrapper>
          </div>
        </div>
      </div>
    </>
  );
}

function CartItem({
  id,
  quantity,
  index,
  setCartTotal,
}: {
  id?: string;
  quantity: number;
  index: number;
  setCartTotal: Dispatch<SetStateAction<number>>;
}) {
  const updateCart = useCartStore((state) => state.updateCart);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return await apiRoute.get<Product>(`/products/${id}`);
    },
    enabled: id != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    return notFound();
  }

  if (isLoading || data?.data == null) {
    return (
      <>
        <Skeleton className="w-full h-44 md:h-52" />
      </>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
      <Image
        className="object-contain hidden md:block"
        src={data.data.image}
        width={100}
        height={100}
        alt={data.data.description}
      />
      <Image
        className="object-cover block md:hidden mx-auto"
        src={data.data.image}
        width={80}
        height={80}
        alt={data.data.description}
      />

      <div className="w-full flex flex-col gap-4 py-4">
        <div className="w-full flex items-start md:items-center justify-between">
          <Link
            href={`/products?id=${data.data.id}`}
            className="text-base md:text-xl font-semibold -tracking-tighter w-full lg:w-[400px] text-balance hover:underline underline-offset-2"
          >
            {data.data.title}
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-4 md:gap-6">
            <AddQuantity
              quantity={quantity}
              productId={data.data.id.toString()}
            />
            <p className="text-sm md:text-lg -tracking-tighter">
              {priceFormatter(data.data.price * quantity)}
            </p>
          </div>
        </div>
        <Separator />
        <div className="w-full flex justify-between items-center">
          <p className="text-xs text-muted-foreground md:text-sm font-medium -tracking-tighter">
            Item price: {priceFormatter(data.data.price)}
          </p>
          <Button
            onClick={() => {
              setCartTotal((prev) => {
                if (prev == null) {
                  return prev;
                } else {
                  return prev - data.data.price;
                }
              });
              const cart: Cart[] = JSON.parse(
                localStorage.getItem("cart") ?? "[]"
              );
              const updatedCart = cart.flatMap((items) => {
                items.products.splice(index, 1);
                return items;
              });
              localStorage.removeItem("cart");
              updateCart(updatedCart);
              localStorage.setItem("cart", JSON.stringify(updatedCart));
            }}
            className="rounded-full text-red-600 p-0 text-xs md:text-sm"
            variant={"link"}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyCart() {
  const user =
    useUserStore((state) => state.user) ??
    JSON.parse(localStorage.getItem("user") ?? "null");
  const router = useRouter();

  return (
    <motion.div
      initial={{
        opacity: sessionStorage.getItem("hasAnimated") ? 1 : 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold -tracking-tighter">
          Your cart is empty
        </h1>
        <p className="text-sm md:text-base text-muted-foreground -tracking-tighter font-bold">
          {user
            ? "Check our wonderful products, keep browsing, and add them here."
            : "   Log in to check if you have any saved items, or simply keep shopping."}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 max-w-md">
        {!user ? (
          <Button
            onClick={() => router.push("/login")}
            size={"lg"}
            className="rounded-full w-full gap-2"
          >
            Sign in <LogIn />
          </Button>
        ) : null}
        <Button
          onClick={() => router.push("/store")}
          className="rounded-full w-full"
          variant={"secondary"}
        >
          Continue Shopping
          <ArrowRight />
        </Button>
      </div>
    </motion.div>
  );
}

export default Page;
