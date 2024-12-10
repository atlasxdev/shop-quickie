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

import { Product as TProduct } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";

import { memo, useCallback, useMemo, useState } from "react";

import {
  CircleMinusIcon,
  CirclePlusIcon,
  MousePointerClickIcon,
} from "lucide-react";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import AddToCart from "@/components/cta/add-to-cart";
import { toast } from "sonner";
import { useUserStore } from "@/zustand-store/store";
import useMetadata from "@/hooks/use-metadata";
import { GoBack } from "@/components/cta/go-back";
import { ProductSlider } from "./ProductSlider";
import { SeeMore } from "./SeeMore";
import { AxiosResponse } from "axios";
import { RelatedProducts } from "./RelatedProducts";
import { ShopByCategory } from "./ShopByCategory";

export function ProductPage({ id, search }: { id: string; search?: string }) {
  const productAssets = useMemo(() => {
    return PRODUCT_IMAGES.find((product) => product.id === Number(id));
  }, [id]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return await apiRoute.get<TProduct>(`/products/${id}`);
    },
    enabled: id != null,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useMetadata(
    data == null ? "Loading..." : `${data.data.title} - Shop Quickie`,
    data == null ? "" : data.data.description
  );

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
      <div className="pt-6 pr-6 md:pt-8 md:pr-8">
        <GoBack />
      </div>
      <Product id={id} data={data} productAssets={productAssets} />
      <div className="pb-8 md:pb-10">
        {search ? <RelatedProducts id={id} search={search} /> : null}
        <ShopByCategory />
      </div>
    </>
  );
}

const Product = memo(function Product({
  id,
  data,
  productAssets,
}: {
  id: string;
  data: AxiosResponse<TProduct>;
  productAssets: {
    id: number;
    images: string[];
    details: string[];
  };
}) {
  const cachedAddQtyFn = useCallback(addQuantity, []);
  const cachedDecreaseQtyFn = useCallback(decreaseQuantity, []);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  function addQuantity() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQuantity() {
    setQuantity((prev) => {
      if (prev === 1) return 1;
      return prev - 1;
    });
  }

  const BEST_SELLERS = [1, 5, 18];

  return (
    <div className="py-8 md:py-12 space-y-12">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
        <div className="w-full lg:w-3/5">
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
              <ProductSlider productAssets={productAssets} />
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
                  onClick={() => cachedDecreaseQtyFn()}
                  size={"sm"}
                  className="rounded-full w-max"
                  variant={"ghost"}
                >
                  <CircleMinusIcon />
                </Button>
                <span className="w-full text-center">{quantity}</span>
                <Button
                  disabled={quantity >= 10}
                  onClick={() => cachedAddQtyFn()}
                  size={"sm"}
                  className="rounded-full w-max"
                  variant={"ghost"}
                >
                  <CirclePlusIcon />
                </Button>
              </div>
            </div>

            <SeeMore productAssets={productAssets} />
            <div className="space-y-4">
              <p className="uppercase text-muted-foreground -tracking-tighter font-bold">
                Item description
              </p>
              <p className="font-medium -tracking-tighter text-xs -text-balance">
                {data.data.description}
              </p>
            </div>

            <CardFooter className="flex-col gap-3 md:gap-4 px-0 pb-0 md:px-6 md:pb-6">
              <AddToCart
                size="lg"
                price={data.data.price}
                productId={data.data.id.toString()}
                quantity={quantity}
              />
              {user ? (
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
              ) : (
                <Button
                  onClick={() => {
                    toast("Please log in to continue your shopping spree! 🛒", {
                      action: {
                        label: "Sign in",
                        onClick: () => (window.location.href = "/login"),
                      },
                    });
                    toast.dismiss();
                  }}
                  size={"lg"}
                  className="rounded-full w-full"
                  variant={"default"}
                >
                  Buy now
                </Button>
              )}
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
