"use client";

import { ShoppingCartIcon, User } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NAV_LINKS } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { wait } from "@/lib/utils";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import { MobileNavigation } from "./ui/navigation/mobile-navigation";
import { DesktopNavigation } from "./ui/navigation/desktop-navigation";

export default function Navigation() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isClient, setIsClient] = useState(false);
  const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false);
  const [isActiveLink, setIsActiveLink] = useState<string | null>(null);
  const matches = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) {
      return;
    } else {
      if (pathname.includes("/store")) {
        setIsActiveLink("Store");
      } else {
        setIsActiveLink(null);
      }
    }
  }, [isClient, pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) {
      setIsPageScrolled(true);
    } else {
      setIsPageScrolled(false);
    }
  });

  return (
    <>
      {matches ? (
        isPageScrolled && pathname == "/" ? (
          <FloatingNavBar
            isActiveLink={isActiveLink}
            setIsActiveLink={setIsActiveLink}
          />
        ) : (
          <DesktopNavigation
            isActiveLink={isActiveLink}
            setIsActiveLink={setIsActiveLink}
          />
        )
      ) : (
        <MobileNavigation
          isActiveLink={isActiveLink}
          setIsActiveLink={setIsActiveLink}
        />
      )}
    </>
  );
}

type Props = {
  isActiveLink: string | null;
  setIsActiveLink: Dispatch<SetStateAction<string | null>>;
};

function FloatingNavBar({ isActiveLink, setIsActiveLink }: Props) {
  const router = useRouter();
  const user = null;

  return (
    <motion.nav
      initial={{
        top: 0,
      }}
      animate={{
        top: 20,
      }}
      className={
        "flex items-center sticky z-20 inset-x-0 p-4 md:p-6 w-2/4 max-w-2xl mx-auto"
      }
    >
      <div
        className={
          "w-full flex items-center justify-between backdrop-blur-md bg-white/70 py-5 px-8 border rounded-full gap-6"
        }
      >
        <div className={"flex items-center gap-10"}>
          <Link
            onClick={() => {
              setIsActiveLink(null);
            }}
            className={"relative size-10"}
            href={"/"}
          >
            <Image src={"/logo.png"} fill className="object-cover" alt="" />
          </Link>

          <div className="hidden md:flex items-center justify-center">
            {NAV_LINKS.map(({ label, href, elementId }) =>
              elementId != null ? (
                <Link
                  key={label}
                  href={href}
                  onClick={async (e) => {
                    e.preventDefault();
                    if (isActiveLink === "Store") {
                      router.push("/");
                      setIsActiveLink(label);
                      await wait(1000);
                      document
                        .getElementById(elementId)!
                        .scrollIntoView({ behavior: "smooth" });
                    } else {
                      setIsActiveLink(label);
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
        <div className="flex items-center gap-4">
          {user ? (
            <Button size={"sm"} variant={"ghost"} className="rounded-full">
              <User className="!size-5" />
            </Button>
          ) : null}
          <div className="hidden md:block cursor-pointer rounded-md p-2">
            <ShoppingCartIcon />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
