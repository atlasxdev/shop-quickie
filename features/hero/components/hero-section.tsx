"use client";

import { ArrowRight } from "lucide-react";
import HeroAnimation from "@/features/hero/components/hero-lottie-animation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import useMetadata from "@/hooks/use-metadata";

export function HeroSection() {
  useMetadata(
    "Shop Quickie",
    "Your go-to platform for fast, hassle-free online shopping. Discover a wide range of products, find great deals, and enjoy a seamless experience with just a few clicks. Get started now!"
  );
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    const timeout = setTimeout(
      () => sessionStorage.setItem("hasAnimated", "true"),
      4000
    );

    return () => clearTimeout(timeout);
  }, []);

  return (
    <MaxWidthWrapper className="!px-0">
      {isClient ? (
        <section className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-44 flex flex-col lg:flex-row justify-center items-center px-6 md:px-8">
          <div className="w-full flex flex-col gap-4 items-center md:items-start">
            <motion.h1
              initial={{
                opacity: sessionStorage.getItem("hasAnimated") ? 1 : 0,
                y: sessionStorage.getItem("hasAnimated") ? 0 : 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 1.5,
              }}
              className="text-5xl md:text-7xl font-extrabold text-[#FBA328]"
            >
              Shop in a Snap – Quick Finds, Big Smiles!
            </motion.h1>

            <motion.p
              initial={{
                opacity: sessionStorage.getItem("hasAnimated") ? 1 : 0,
                y: sessionStorage.getItem("hasAnimated") ? 0 : 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 2,
              }}
              className="text-sm md:text-base font-medium -tracking-tighter text-balance text-muted-foreground origin-left"
            >
              Discover your favorite products in one quick stop. Browse through
              categories, find great deals, and enjoy a seamless shopping
              experience, all with just a few clicks.
            </motion.p>
            <br />
            <motion.div
              initial={{
                opacity: sessionStorage.getItem("hasAnimated") ? 1 : 0,
                y: sessionStorage.getItem("hasAnimated") ? 0 : 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 2.5,
              }}
            >
              <Link
                href={"/store"}
                className={buttonVariants({
                  className:
                    "text-sm uppercase !rounded-full -tracking-tighter gap-2",
                  size: "lg",
                })}
              >
                Shop now <ArrowRight />
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:block mx-auto w-3/5">
            <HeroAnimation />
          </div>
        </section>
      ) : (
        <div className="flex items-center justify-center h-[80vh]">
          <motion.div
            className="flex space-x-2 animate-bounce"
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="w-4 h-4 bg-orange-500 rounded-full" />
            <div className="w-4 h-4 bg-orange-600 rounded-full" />
            <div className="w-4 h-4 bg-orange-700 rounded-full" />
          </motion.div>
        </div>
      )}
    </MaxWidthWrapper>
  );
}
