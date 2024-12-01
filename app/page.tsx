"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ArrowRight } from "lucide-react";
import Products from "@/features/hero/components/products";
import HeroAnimation from "@/features/hero/components/hero-lottie-animation";
import { BestSellers } from "@/features/hero/components/best-sellers";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { NavLoader } from "@/components/nav-loader";
import { motion } from "framer-motion";
import useMetadata from "@/hooks/use-metadata";
import { useEffect, useState } from "react";

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

export default function Home() {
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
    <>
      <Navigation />
      <main className="flex-1">
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
                  Discover your favorite products in one quick stop. Browse
                  through categories, find great deals, and enjoy a seamless
                  shopping experience, all with just a few clicks.
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

        <MaxWidthWrapper>
          <section className="py-8 md:py-14">
            <BestSellers />
          </section>
        </MaxWidthWrapper>

        <MaxWidthWrapper className="bg-stone-50">
          <section className="space-y-8 w-full py-12 md:py-16 lg:py-24">
            <div className="max-w-5xl mx-auto space-y-4">
              <p className="text-[#FBA328] text-center uppercase text-balance text-2xl md:text-3xl lg:text-4xl font-extrabold -tracking-tighter">
                Discover your favorite products in one quick stop
              </p>
            </div>

            <Products />
          </section>
        </MaxWidthWrapper>

        <section className="py-24 sm:py-30 md:py-36">
          <MaxWidthWrapper className="max-w-lg space-y-6 md:space-y-8">
            <p className="text-center -tracking-tighter text-xl md:text-2xl font-extrabold">
              DISCOVER EVERYDAY ESSENTIALS AT SHOP QUICKIE
            </p>
            <p className="text-balance text-xs md:text-sm -tracking-tighter">
              At Shop Quickie, we believe in the power of convenience.
              We&apos;re here to make shopping quick, simple, and
              stylish—because we know life moves fast, and so should your
              shopping experience. Our collections are crafted with care,
              blending quality with affordability. From comfortable apparel and
              unique jewelry pieces to cutting-edge electronics, we’re here to
              serve every need with style and purpose.
              <br />
              <br />
              Shop Quickie is your go-to for the latest fashion trends, whether
              you&apos;re looking to dress up for a night out, find cozy
              essentials for your downtime, or accessorize with jewelry that
              shines. Our carefully selected electronics provide more than just
              utility; they’re designed to fit seamlessly into your lifestyle,
              enhancing every moment from work to play.
              <br />
              <br />
              We understand that shopping today is about more than just
              products. That’s why we focus on creating a personalized
              experience with quick delivery and customer care that puts you
              first. Shop Quickie is committed to bringing you what you need,
              when you need it—redefining the future of convenient shopping.
            </p>
            <br />
            <Image
              priority
              src={"/logo.png"}
              width={80}
              height={80}
              className="object-cover mx-auto"
              alt=""
            />
          </MaxWidthWrapper>
        </section>
      </main>
    </>
  );
}
