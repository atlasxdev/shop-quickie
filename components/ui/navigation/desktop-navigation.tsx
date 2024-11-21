"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { NAV_LINKS } from "@/constants";
import { wait } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { buttonVariants } from "../button";
import { ShoppingCartIcon } from "lucide-react";
import { OramaSearch } from "@/services/OramaSearch";
import { useCartStore, useUserStore } from "@/zustand-store/store";
import { UserDropdown } from "@/components/UserDropdown";
import { AnimatedNumber } from "../AnimatedNumber";

const staticLinks = NAV_LINKS.slice(1);

export function DesktopNavigation({
  isActiveLink,
  setIsActiveLink,
}: {
  isActiveLink: string | null;
  setIsActiveLink: Dispatch<SetStateAction<string | null>>;
}) {
  const user =
    useUserStore((state) => state.user) ??
    JSON.parse(localStorage.getItem("user") ?? "null");
  const cart =
    useCartStore((state) => state.cart) ??
    JSON.parse(localStorage.getItem("cart") ?? "null");
  const router = useRouter();

  return (
    <nav className={"sticky z-20 inset-x-0 p-4 md:p-6"}>
      <MaxWidthWrapper>
        <motion.div
          className={
            "w-full flex items-center justify-between backdrop-blur-md bg-white/70"
          }
        >
          <div className={"flex items-center gap-10"}>
            <Link
              onClick={() => {
                setIsActiveLink(null);
              }}
              className={"relative size-14"}
              href={"/"}
            >
              <Image
                src={"/logo.png"}
                priority
                fill
                className="object-cover"
                alt=""
              />
            </Link>

            <div className="hidden md:flex items-center justify-center">
              {NAV_LINKS.map(({ label, href, elementId }) =>
                elementId != null ? (
                  <Link
                    key={label}
                    href={href}
                    onClick={async (e) => {
                      e.preventDefault();
                      if (
                        staticLinks.some(({ label }) => label === isActiveLink)
                      ) {
                        setIsActiveLink(label);
                        document
                          .getElementById(elementId)!
                          .scrollIntoView({ behavior: "smooth" });
                      } else {
                        router.push("/");
                        setIsActiveLink(label);
                        await wait(1500);
                        document
                          .getElementById(elementId)!
                          .scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={buttonVariants({
                      className:
                        isActiveLink === label
                          ? "!text-[#FBA328] !font-semibold"
                          : "!text-black",
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    {label}
                  </Link>
                ) : (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => {
                      setIsActiveLink(label);
                    }}
                    className={buttonVariants({
                      className:
                        isActiveLink === label
                          ? "!text-[#FBA328] !font-semibold"
                          : "!text-black",
                      variant: "ghost",
                      size: "sm",
                    })}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="w-full flex justify-end items-center gap-4">
            <OramaSearch />
            {user ? <UserDropdown /> : null}
            <div className="relative hidden md:block">
              {cart[0].products.length > 0 ? (
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
                <ShoppingCartIcon className="!size-6" />
              </Link>
            </div>
          </div>
        </motion.div>
      </MaxWidthWrapper>
    </nav>
  );
}
