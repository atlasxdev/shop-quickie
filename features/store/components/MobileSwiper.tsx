"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { CATEGORIES } from "@/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function MobileSwiper({
  categoryFilter,
  setCategoryFilter,
}: {
  categoryFilter: string;
  setCategoryFilter: Dispatch<SetStateAction<string>>;
}) {
  const router = useRouter();
  const [isReachedBeginning, setIsReachedBeginning] = useState<boolean>(true);
  const [isReachedEnd, setIsReachedEnd] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  return (
    <Swiper
      grabCursor
      slidesPerView={2}
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
      className="max-w-xs relative !px-0"
    >
      <div
        onClick={() => swiper?.slidePrev()}
        className={cn(
          "absolute top-10 -left-0 z-20 rotate-180 size-6 transition-[transform_opacity] duration-200 cursor-pointer",
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
          "absolute top-10 -right-0 z-20 size-6 transition-[transform_opacity] duration-200 cursor-pointer",
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
      {CATEGORIES.map((category) => (
        <SwiperSlide key={category}>
          <div className="flex flex-col items-center" key={category}>
            <Image
              src={`/categories/${category}.jpg`}
              alt={`${category} image`}
              className="object-contain aspect-square"
              width={80}
              height={80}
            />
            <Button
              variant={"link"}
              size={"sm"}
              className={cn("capitalize text-xs -tracking-tighter", {
                "text-[#FBA328]": category === categoryFilter,
              })}
              onClick={() => {
                setCategoryFilter(category);
                router.push(`/store/${encodeURIComponent(category)}`);
              }}
            >
              {category}
            </Button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MobileSwiper;
