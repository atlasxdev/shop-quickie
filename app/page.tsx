"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { TextEffect } from "@/components/ui/text-effect";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Products from "@/features/hero/components/products";
import HeroAnimation from "@/features/hero/components/hero-lottie-animation";
import { BestSellers } from "@/features/hero/components/best-sellers";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { NavLoader } from "@/components/nav-loader";

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
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <MaxWidthWrapper className="!px-0">
          <section className="pt-16 pb-24 sm:pt-24 sm:pb-32 md:pt-32 md:pb-44 flex flex-col lg:flex-row justify-center items-center px-4 md:px-6">
            <div className="w-full flex flex-col gap-4 items-center md:items-start px-6">
              <TextEffect
                words="Shop in a Snap – Quick Finds, Big Smiles!"
                className="hidden lg:block text-5xl md:text-7xl font-extrabold text-[#FBA328]"
              />

              <h1 className="block lg:hidden text-5xl md:text-7xl font-extrabold text-[#FBA328]">
                Shop in a Snap – Quick Finds, Big Smiles!
              </h1>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                className="hidden lg:block text-base font-medium -tracking-tighter text-balance text-muted-foreground origin-left"
              >
                Discover your favorite products in one quick stop. Browse
                through categories, find great deals, and enjoy a seamless
                shopping experience, all with just a few clicks.
              </motion.p>

              <p className="block lg:hidden text-sm font-medium -tracking-tighter text-balance text-muted-foreground origin-left">
                Discover your favorite products in one quick stop. Browse
                through categories, find great deals, and enjoy a seamless
                shopping experience, all with just a few clicks.
              </p>
              <br />
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
            </div>

            <div className="hidden lg:block mx-auto w-3/5">
              <HeroAnimation />
            </div>
          </section>
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
