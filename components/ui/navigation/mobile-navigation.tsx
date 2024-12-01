"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { buttonVariants } from "../button";
import { Link as LucideLink, ShoppingCartIcon } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { wait } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { OramaSearch } from "@/services/OramaSearch";
import { UserDropdown } from "@/components/UserDropdown";
import { useCartStore, useUserStore } from "@/zustand-store/store";
import { AnimatedNumber } from "../AnimatedNumber";

const staticLinks = NAV_LINKS.slice(1);

export function MobileNavigation({
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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav
      className={
        "sticky top-0 z-20 inset-x-0 p-6 backdrop-blur-md bg-white/70 border-b"
      }
    >
      <div className="w-full flex items-center justify-between">
        <Sheet onOpenChange={(open) => setIsOpen(open)} open={isOpen}>
          <SheetTrigger>
            <svg
              strokeWidth="2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <Link
                onClick={() => {
                  setIsOpen(false);
                  setIsActiveLink(null);
                }}
                className={"relative size-20 mx-auto"}
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
              <div className="flex items-center w-max mx-auto space-x-2">
                <SheetTitle>Quick links</SheetTitle>
                <LucideLink />
              </div>
            </SheetHeader>
            <div className="mt-4 w-full flex items-center">
              <OramaSearch />
            </div>
            <div className="mt-12 flex flex-col">
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
                        setIsOpen(false);
                      } else {
                        router.push("/");
                        setIsActiveLink(label);
                        setIsOpen(false);
                        await wait(1500);
                        document
                          .getElementById(elementId)!
                          .scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={buttonVariants({
                      className: "uppercase -tracking-tighter !justify-start",
                      variant: "link",
                      size: "lg",
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
                      className: "uppercase -tracking-tighter !justify-start",
                      variant: "link",
                      size: "lg",
                    })}
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-1.5">
          {user ? <UserDropdown /> : null}
          <div className="relative">
            {cart != null && cart[0].products.length > 0 ? (
              <span className="bg-black right-0 -top-1.5 absolute size-5 flex items-center justify-center p-1 rounded-full border">
                <AnimatedNumber
                  className="text-[0.65rem] text-white"
                  value={cart[0].products.length}
                />
              </span>
            ) : null}
            <Link
              href={"/cart"}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <ShoppingCartIcon className="!size-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
