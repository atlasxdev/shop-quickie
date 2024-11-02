"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { apiRoute } from "@/axios/apiRoute";

import { notFound } from "next/navigation";
import { Loader } from "lucide-react";

import { TProducts } from "@/types";
import { MensProductCarousel } from "./mens-product-carousel";
import { WomensProductCarousel } from "./womens-product-carousel";
import { JewelriesCarousel } from "./jewelries-carousel";
import { ElectronicsCarousel } from "./electronics";

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
      <div className="h-dvh flex items-center justify-center">
        <Card className="rounded-full">
          <CardContent className="flex aspect-square items-center justify-center p-6">
            <Loader className="size-10 animate-spin" />
          </CardContent>
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
