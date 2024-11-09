"use client";
import "swiper/css";
import "swiper/css/navigation";
import { apiRoute } from "@/axios/apiRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRODUCT_IMAGES } from "@/constants";
import { cn } from "@/lib/utils";
import { Product as TProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import { Swiper as SwiperType } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { A11y } from "swiper/modules";
import { ImageZoom } from "./ImageZoom";
import {
  ArrowLeftIcon,
  CircleMinusIcon,
  CirclePlusIcon,
  MousePointerClickIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import AddToCart from "@/components/cta/add-to-cart";
import { toast } from "sonner";
import { useUserStore } from "@/zustand-store/store";

export function Product({ id }: { id: string }) {
  const userStore = useUserStore((state) => state.user);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [isReachedBeginning, setIsReachedBeginning] = useState<boolean>(true);
  const [isReachedEnd, setIsReachedEnd] = useState<boolean>(false);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [user, setUser] = useState();

  const productAssets = PRODUCT_IMAGES.find(
    (product) => product.id === Number(id)
  );

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") ?? "null"));
  }, []);

  const BEST_SELLERS = [1, 5, 18];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return await apiRoute.get<TProduct>(`/products/${id}`);
    },
    enabled: id != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isError || productAssets == null) {
    return notFound();
  }

  if (isLoading || data == null) {
    return (
      <div className="py-12 md:py-14 lg:py-16 space-y-12">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Skeleton className="w-full md:w-3/5 h-64 md:h-96 rounded-lg" />
          <Skeleton className="w-full md:w-2/5 h-64 md:h-96 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pl-0 lg:pl-2 pt-6 pr-6 md:pt-8 md:pr-8">
        <Button
          onClick={() => router.back()}
          className="uppercase font-bold -tracking-tighter text-[#FBA328] gap-2 pl-0 lg:pl-4"
          variant={"link"}
          size={"sm"}
        >
          <ArrowLeftIcon />
          Go back
        </Button>
      </div>
      <div className="py-8 md:py-12 space-y-12">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          <div className="w-full lg:w-3/5 pl-0 lg:pl-6">
            <Card className="md:sticky md:top-12 border-none shadow-none">
              <CardHeader className="space-y-0 flex flex-row justify-between items-center p-4 md:p-6">
                <Badge
                  className="capitalize rounded-full font-medium w-max text-[0.7rem]"
                  variant={"secondary"}
                >
                  {data.data.category}
                </Badge>
                {BEST_SELLERS.some((v) => v == data.data.id) ? (
                  <Badge
                    className="capitalize rounded-full font-medium w-max text-[0.7rem] space-x-1.5"
                    variant={"outline"}
                  >
                    🌟 Best seller
                  </Badge>
                ) : null}
              </CardHeader>
              <CardContent className="!p-6">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  modules={[A11y]}
                  className="relative !flex items-center"
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
                      "absolute -left-0 z-20 rotate-180 size-8 md:size-12 transition-[transform_opacity] duration-200 cursor-pointer",
                      isReachedBeginning
                        ? "opacity-0 scale-0"
                        : "opacity-100 scale-100"
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
                      "absolute -right-0 z-20 size-8 md:size-12 transition-[transform_opacity] duration-200 cursor-pointer",
                      isReachedEnd
                        ? "opacity-0 scale-0"
                        : "opacity-100 scale-100"
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
                  {productAssets.images.map((imageUrl, index) => (
                    <SwiperSlide
                      key={index}
                      className="!flex !items-center !justify-center !w-full !px-6 md:!px-8"
                    >
                      <ImageZoom
                        imageUrl={imageUrl}
                        description={data.data.description}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </CardContent>
              <CardFooter className="w-max mx-auto space-x-2">
                <CardDescription className="animate-pulse text-xs md:text-sm font-medium -tracking-tighter">
                  Tap image to enlarge
                </CardDescription>
                <MousePointerClickIcon className="stroke-muted-foreground" />
              </CardFooter>
            </Card>
          </div>
          <Card className="flex flex-col w-full lg:w-2/5 ">
            <CardHeader className="space-y-6">
              <div className="w-full space-y-4">
                <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold -tracking-tighter text-balance">
                  {data.data.title}
                </CardTitle>
                <div className="flex items-center justify-between space-x-2">
                  <div className="flex space-x-2">
                    <Rating
                      value={data.data.rating.rate}
                      isDisabled
                      halfFillMode="svg"
                      readOnly
                      className="size-6"
                    />
                    <span className="text-xs font-bold underline">
                      {data.data.rating.rate}
                    </span>
                  </div>
                  <CardDescription className="text-[#FBA328] -tracking-tighter text-xs font-bold">
                    {data.data.rating.count} ratings
                  </CardDescription>
                </div>
              </div>
              <CardDescription className="text-base md:text-lg text-black font-medium">
                <AnimatedNumber
                  value={data.data.price * quantity}
                  isPrice={true}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="w-full flex items-center justify-between">
                <p className="uppercase text-muted-foreground -tracking-tighter font-bold">
                  Quantity
                </p>
                <div className="w-max flex items-center justify-between gap-6">
                  <Button
                    disabled={quantity == 1}
                    onClick={() =>
                      setQuantity((prev) => {
                        if (prev === 1) return 1;
                        return prev - 1;
                      })
                    }
                    size={"sm"}
                    className="rounded-full w-max"
                    variant={"ghost"}
                  >
                    <CircleMinusIcon />
                  </Button>
                  <span className="w-full text-center">{quantity}</span>
                  <Button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    size={"sm"}
                    className="rounded-full w-max"
                    variant={"ghost"}
                  >
                    <CirclePlusIcon />
                  </Button>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4">
                <p className="uppercase text-muted-foreground -tracking-tighter font-bold">
                  Item details
                </p>
                {productAssets.details.map((detail, index) =>
                  index < 3 ? (
                    <div key={index} className="space-y-4">
                      <p className="font-medium -tracking-tighter text-xs md:text-sm text-balance">
                        - {detail}
                      </p>
                      <Separator />
                    </div>
                  ) : (
                    <motion.div
                      key={index}
                      animate={{
                        opacity: seeMore ? 1 : 0,
                        display: seeMore ? "block" : "none",
                      }}
                      className={"space-y-4"}
                    >
                      <p className="font-medium -tracking-tighter text-xs md:text-sm text-balance">
                        - {detail}
                      </p>
                      <Separator />
                    </motion.div>
                  )
                )}
                <Button
                  size={"sm"}
                  variant={"secondary"}
                  onClick={() => setSeeMore((prev) => !prev)}
                  className="gap-2"
                >
                  {seeMore ? "See less" : "See more"}
                  <motion.svg
                    animate={{
                      rotate: seeMore ? "-90deg" : "90deg",
                    }}
                    className={
                      "bg-black/5 backdrop-blur-lg fill-muted-foreground rounded-full border "
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 36 36"
                  >
                    <path d="M23.5587,16.916 C24.1447,17.4999987 24.1467,18.446 23.5647,19.034 L16.6077,26.056 C16.3147,26.352 15.9287,26.4999987 15.5427,26.4999987 C15.1607,26.4999987 14.7787,26.355 14.4867,26.065 C13.8977,25.482 13.8947,24.533 14.4777,23.944 L20.3818,17.984 L14.4408,12.062 C13.8548,11.478 13.8528,10.5279 14.4378,9.941 C15.0218,9.354 15.9738,9.353 16.5588,9.938 L23.5588,16.916 L23.5587,16.916 Z"></path>
                  </motion.svg>
                </Button>
              </div>

              <div className="space-y-4">
                <p className="uppercase text-muted-foreground -tracking-tighter font-bold">
                  Item description
                </p>
                <p className="font-medium -tracking-tighter text-xs -text-balance">
                  {data.data.description}
                </p>
              </div>

              <CardFooter className="flex-col gap-3 md:gap-4 px-0 pb-0 md:px-6 md:pb-6">
                {user || userStore ? (
                  <>
                    <AddToCart
                      productId={data.data.id.toString()}
                      quantity={quantity}
                    />
                    <Button
                      onClick={() =>
                        router.push(
                          `/checkout?productId=${id}&quantity=${quantity}`
                        )
                      }
                      size={"lg"}
                      className="rounded-full w-full"
                      variant={"default"}
                    >
                      Buy now
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() =>
                        toast("🛒 Please sign in to add items to your cart.", {
                          action: {
                            label: "Sign in",
                            onClick: () => router.push("/login"),
                          },
                        })
                      }
                      size={"lg"}
                      className="rounded-full w-full gap-2"
                      variant={"secondary"}
                    >
                      Add to cart
                      <ShoppingCartIcon />
                    </Button>
                    <Button
                      onClick={() =>
                        toast("Please sign in to buy this product", {
                          action: {
                            label: "Sign in",
                            onClick: () => router.push("/login"),
                          },
                        })
                      }
                      size={"lg"}
                      className="rounded-full w-full"
                      variant={"default"}
                    >
                      Buy now
                    </Button>
                  </>
                )}
              </CardFooter>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
