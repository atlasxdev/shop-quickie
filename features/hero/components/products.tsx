"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRoute } from "@/axios/apiRoute";
import { notFound } from "next/navigation";
import { TProducts } from "@/types";
import { MensProductCarousel } from "./mens-product-carousel";
import { WomensProductCarousel } from "./womens-product-carousel";
import { JewelriesCarousel } from "./jewelries-carousel";
import { ElectronicsCarousel } from "./electronics";

import { Loader } from "lucide-react";
import { Card } from "@/components/ui/card";

function Products() {
  const mensClothing = useQuery({
    queryKey: ["men's clothing"],
    queryFn: async () => {
      return await apiRoute.get<TProducts>(
        "https://fakestoreapi.com/products/category/men's clothing"
      );
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const womensClothing = useQuery({
    queryKey: ["women's clothing"],
    queryFn: async () => {
      return await apiRoute.get<TProducts>(
        "https://fakestoreapi.com/products/category/women's clothing"
      );
    },

    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const jewelries = useQuery({
    queryKey: ["jewelries"],
    queryFn: async () => {
      return await apiRoute.get<TProducts>(
        "https://fakestoreapi.com/products/category/jewelery"
      );
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const electronics = useQuery({
    queryKey: ["electronics"],
    queryFn: async () => {
      return await apiRoute.get<TProducts>(
        "https://fakestoreapi.com/products/category/electronics"
      );
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (
    mensClothing.isError &&
    womensClothing.isError &&
    jewelries.isError &&
    electronics.isError
  ) {
    return notFound();
  }

  if (
    mensClothing.isLoading ||
    mensClothing.data?.data == null ||
    womensClothing.isLoading ||
    womensClothing.data?.data == null ||
    jewelries.isLoading ||
    jewelries.data?.data == null ||
    electronics.isLoading ||
    electronics.data?.data == null
  ) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Card className="flex items-center justify-center gap-4 h-max w-max p-4 md:p-6">
          <Loader className="animate-spin" />
          <p className="-tracking-tighter text-xs md:text-sm font-semibold">
            Please wait while we load your deals...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-10 space-y-8">
      <MensProductCarousel product={mensClothing.data.data} />
      <WomensProductCarousel product={womensClothing.data.data} />
      <JewelriesCarousel product={jewelries.data.data} />
      <ElectronicsCarousel product={electronics.data.data} />
    </div>
  );
}

export default Products;
