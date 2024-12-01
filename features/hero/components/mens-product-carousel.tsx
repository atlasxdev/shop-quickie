"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { A11y } from "swiper/modules";
import { TProducts } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CardProduct } from "@/components/CardProduct";

export function MensProductCarousel({ product }: { product: TProducts }) {
  const [isReachedBeginning, setIsReachedBeginning] = useState<boolean>(true);
  const [isReachedEnd, setIsReachedEnd] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <>
      <div
        id="men's clothing"
        className="scroll-mt-20 md:scroll-mt-32 pt-6 md:pt-8 w-full flex justify-between items-center"
      >
        <p className="uppercase font-bold text-lg sm:text-xl md:text-2xl -tracking-tighter">
          Men&apos;s Clothing
        </p>
        <Link
          href={"/store"}
          className={buttonVariants({
            className:
              "!font-bold uppercase !rounded-full gap-2 !text-[#FBA328] !p-0",
            variant: "link",
          })}
        >
          Shop All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>
      </div>
      <div className="flex md:hidden ml-auto w-max mx-auto">
        <Button
          size={"sm"}
          variant={"outline"}
          className="animate-pulse text-[0.7rem] gap-2 font-medium pointer-events-none"
        >
          Swipe right to discover more great products! 👉
        </Button>
      </div>
      <Swiper
        grabCursor
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        modules={[A11y]}
        className="relative !grid items-center !p-0 md:!p-4"
        onSwiper={(s) => {
          if (swiper) return;
          setSwiper(s);
        }}
        onSlideChange={() => {
          if (swiper?.isBeginning) {
            setIsReachedBeginning(true);
            setIsReachedEnd(false);
          } else if (swiper?.isEnd) {
            setIsReachedBeginning(false);
            setIsReachedEnd(true);
          } else {
            setIsReachedBeginning(false);
            setIsReachedEnd(false);
          }
        }}
      >
        <div
          onClick={() => swiper?.slidePrev()}
          className={cn(
            "hidden md:block absolute -left-0 z-20 rotate-180 size-16 transition-[transform_opacity] duration-200 cursor-pointer",
            isReachedBeginning ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        >
          <svg
            className="bg-black/5 backdrop-blur-lg fill-muted-foreground rounded-full border"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path>
          </svg>
        </div>
        <div
          onClick={() => swiper?.slideNext()}
          className={cn(
            "hidden md:block absolute -right-0 z-20 size-16 transition-[transform_opacity] duration-200 cursor-pointer",
            isReachedEnd ? "opacity-0 scale-0" : "opacity-100 scale-100"
          )}
        >
          <svg
            className="bg-black/5 backdrop-blur-lg fill-muted-foreground rounded-full border"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path>
          </svg>
        </div>
        {product.map(({ id, title, price, description, image }) => (
          <SwiperSlide key={id}>
            <CardProduct
              id={id}
              price={price}
              title={title}
              description={description}
              image={image}
              imageHeight="h-40"
              titleHeight="h-10"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
