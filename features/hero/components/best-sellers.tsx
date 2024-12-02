"use client";

import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.2 } },
};

export function BestSellers() {
  const ref = useRef(null); // Ref to monitor the component
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger animation when 20% of the element is in view

  return (
    <div ref={ref} className="space-y-10 md:space-y-16 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <motion.p
        className="uppercase text-center text-4xl md:text-5xl font-extrabold tracking-tight text-[#FBA328]"
        variants={fadeInUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        Best Sellers
      </motion.p>

      {/* Products Section */}
      <motion.div
        className="flex flex-col lg:flex-row gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Feature Product */}
        <motion.div
          className="relative group flex-1 overflow-hidden bg-gray-200 rounded-lg shadow-lg aspect-square"
          variants={fadeInUp}
        >
          <Image
            src={"/best-seller-1.png"}
            alt="best seller image"
            className="group-hover:scale-105 object-cover w-full h-full transition-transform duration-500 ease-in-out brightness-75"
            sizes="(max-width: 1024px) 100vw, 50vw"
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
          <div className="absolute z-10 bottom-6 md:bottom-10 lg:bottom-12 left-6 space-y-4 text-white">
            <div className="pr-0 md:pr-4">
              <motion.p
                className="text-pretty font-extrabold text-2xl md:text-4xl lg:text-5xl leading-tight"
                variants={fadeInUp}
              >
                Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops
              </motion.p>
            </div>
            <Link
              href={"/products?id=1"}
              className={buttonVariants({
                className:
                  "!rounded-full uppercase text-white px-6 py-3 hover:bg-opacity-90 transition",
                size: "lg",
              })}
            >
              Buy Now
            </Link>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 flex-1">
          <motion.div
            className="relative group flex-1 overflow-hidden bg-gray-300 rounded-lg shadow-lg aspect-square"
            variants={fadeInUp}
          >
            <Image
              src={"/best-seller-2.jpg"}
              alt="best seller image"
              className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover w-full h-full brightness-75"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            <div className="absolute z-10 bottom-4 md:bottom-8 left-4 space-y-2 text-white">
              <motion.p
                className="text-pretty font-extrabold text-lg md:text-xl lg:text-2xl leading-snug"
                variants={fadeInUp}
              >
                MBJ Women&apos;s Solid Short Sleeve Boat Neck V
              </motion.p>
              <Link
                href={"/products?id=18"}
                className={buttonVariants({
                  className:
                    "!rounded-full uppercase text-white px-4 py-2 hover:bg-opacity-90 transition",
                  size: "lg",
                })}
              >
                Buy Now
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="relative group flex-1 overflow-hidden bg-gray-300 rounded-lg shadow-lg aspect-square"
            variants={fadeInUp}
          >
            <Image
              src={"/best-seller-3.jpg"}
              alt="best seller image"
              className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover w-full h-full brightness-75"
              sizes="(max-width: 1024px) 50vw, 25vw"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
            <div className="absolute z-10 bottom-4 md:bottom-8 left-4 space-y-2 text-white">
              <motion.p
                className="text-pretty font-extrabold text-lg md:text-xl lg:text-2xl leading-snug"
                variants={fadeInUp}
              >
                John Hardy Women&apos;s Legends Naga Gold & Silver Dragon
                Station Chain Bracelet
              </motion.p>
              <Link
                href={"/products?id=5"}
                className={buttonVariants({
                  className:
                    "!rounded-full uppercase text-white px-4 py-2 hover:bg-opacity-90 transition",
                  size: "lg",
                })}
              >
                Buy Now
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
