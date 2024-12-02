"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { buttonVariants } from "../button";
import { ShoppingCartIcon } from "lucide-react";
import { OramaSearch } from "@/services/OramaSearch";
import { useCartStore, useUserStore } from "@/zustand-store/store";
import { UserDropdown } from "@/components/UserDropdown";
import { AnimatedNumber } from "../AnimatedNumber";

export function DesktopNavigation({ pathname }: { pathname: string }) {
  const user =
    useUserStore((state) => state.user) ??
    JSON.parse(localStorage.getItem("user") ?? "null");
  const cart =
    useCartStore((state) => state.cart) ??
    JSON.parse(localStorage.getItem("cart") ?? "null");
  const { scrollY } = useScroll();
  const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) {
      setIsPageScrolled(true);
    } else {
      setIsPageScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{
        opacity: sessionStorage.getItem("hasAnimated") ? 1 : 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 0.3,
      }}
      className={cn(
        "p-4 md:p-6",
        !pathname.match(/[products][store]/) &&
          "sticky top-0 z-20 backdrop-blur-md bg-white/70 inset-x-0",
        isPageScrolled && !pathname.match(/[products][store]/) && "border-b"
      )}
    >
      <MaxWidthWrapper>
        <motion.div className={"w-full flex items-center justify-between"}>
          <Link className={"relative size-14"} href={"/"}>
            <Image
              src={"/logo.png"}
              priority
              fill
              className="object-cover"
              alt=""
            />
          </Link>
          <div className="w-full flex justify-end items-center gap-4">
            <OramaSearch />
            <Link
              href={"/store"}
              className={buttonVariants({
                className:
                  pathname === "/store"
                    ? "!text-[#FBA328] !font-semibold"
                    : "!text-black",
                variant: "ghost",
                size: "sm",
              })}
            >
              Store
            </Link>

            {user ? (
              <UserDropdown />
            ) : (
              <Link
                href={"/login"}
                className={buttonVariants({
                  className: "!py-5",
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Sign in
              </Link>
            )}
            <div className="relative hidden md:block">
              {cart != null && cart[0].products.length > 0 ? (
                <span className="bg-black right-0 -top-1 absolute size-5 flex items-center justify-center p-1 rounded-full border">
                  <AnimatedNumber
                    className="text-[0.7rem] text-white"
                    value={cart[0].products.length}
                  />
                </span>
              ) : null}
              <Link
                href={"/cart"}
                className={buttonVariants({
                  className: "!py-5",
                  variant: "ghost",
                  size: "sm",
                })}
              >
                <ShoppingCartIcon className={"!size-6"} />
              </Link>
            </div>
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </motion.nav>
  );
}
