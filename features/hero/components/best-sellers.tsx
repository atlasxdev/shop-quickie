import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function BestSellers() {
  return (
    <div className="space-y-8 md:space-y-14">
      <p className="text-center text-4xl md:text-5xl uppercase font-extrabold -tracking-tighter text-[#FBA328]">
        Best Sellers
      </p>
      <div className="flex flex-col items-stretch lg:flex-row gap-2">
        <div className="w-full relative group self-stretch overflow-hidden bg-[#AFAFAD]">
          <Image
            src={"/best-seller-1.png"}
            alt="best seller image"
            className="mx-auto block lg:hidden object-cover group-hover:scale-105 brightness-75 transition-transform"
            width={300}
            height={300}
          />
          <Image
            src={"/best-seller-1.png"}
            alt="best seller image"
            className="hidden lg:block group-hover:scale-105 object-cover brightness-75 transition-transform"
            fill
          />
          <div className="space-y-2 md:space-y-4 absolute z-10 bottom-6 md:bottom-10 lg:bottom-16 left-5 inset-x-0 px-2">
            <p className="text-white font-extrabold text-xl md:text-4xl lg:text-6xl -tracking-tighter text-balance">
              Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
            </p>
            <Link
              href={"/products?id=1"}
              className={buttonVariants({
                className: "!rounded-full uppercase",
                size: "lg",
              })}
            >
              Buy me
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="h-full flex items-center justify-center relative group overflow-hidden bg-[#BFBFBF]">
            <Image
              src={"/best-seller-2.jpg"}
              alt="best seller image"
              className="object-cover group-hover:scale-105 transition-transform brightness-75"
              width={300}
              height={300}
            />
            <div className="space-y-2 md:space-y-4 absolute z-10 bottom-6 md:bottom-10 lg:bottom-16 left-5 inset-x-0 px-2">
              <p className="text-white font-extrabold text-xl md:text-2xl lg:text-3xl -tracking-tighter text-balance">
                MBJ Women&apos;s Solid Short Sleeve Boat Neck V
              </p>
              <Link
                href={"/products?id=18"}
                className={buttonVariants({
                  className: "!rounded-full uppercase",
                  size: "lg",
                })}
              >
                Buy me
              </Link>
            </div>
          </div>
          <div className="h-full flex items-center justify-center relative group overflow-hidden bg-[#BFBFBF]">
            <Image
              src={"/best-seller-3.jpg"}
              alt="best seller image"
              className="group-hover:scale-105 object-cover transition-transform brightness-75"
              width={300}
              height={300}
            />
            <div className="space-y-2 md:space-y-4 absolute z-10 bottom-6 md:bottom-10 lg:bottom-16 left-5 inset-x-0 px-2">
              <p className="text-white font-extrabold text-base md:text-2xl lg:text-3xl -tracking-tighter text-balance">
                John Hardy Women&apos;s Legends Naga Gold & Silver Dragon
                Station Chain Bracelet
              </p>
              <Link
                href={"/products?id=5"}
                className={buttonVariants({
                  className: "!rounded-full uppercase",
                  size: "lg",
                })}
              >
                Buy me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
