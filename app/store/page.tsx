"use client";

import { apiRoute } from "@/axios/apiRoute";

import { Skeleton } from "@/components/ui/skeleton";
import { Products } from "@/features/store/components/Products";
import useMetadata from "@/hooks/use-metadata";
import { getActualProductArray } from "@/lib/utils";
import { TProducts } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

import { notFound } from "next/navigation";
import { useMemo } from "react";
import { useIntersectionObserver } from "usehooks-ts";

function Page() {
  useMetadata(
    "Store - Shop Quickie",
    "Discover a wide variety of products at unbeatable prices! Explore our store to find everything you need, from the latest trends to essential everyday items. Enjoy a seamless shopping experience with convenient browsing and easy checkout."
  );
  const { data, fetchNextPage, isLoading, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: async ({ pageParam }) => {
        return await apiRoute.get<TProducts>(`/products?limit=${pageParam}`);
      },
      initialPageParam: 3,
      getNextPageParam: (_, __, lastPageParam) => {
        return lastPageParam + 3;
      },
      maxPages: 7,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    });

  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
  });

  const actualProductArray = useMemo(() => {
    if (data?.pages == null) return;

    const { pages, pageParams } = data;

    const actualProductArray = getActualProductArray(pages, pageParams);

    return actualProductArray;
  }, [data]);

  if (isError) {
    return notFound();
  }

  if (isLoading || actualProductArray == null || data == null) {
    return (
      <div className="max-w-screen-2xl px-6 md:px-8 mx-auto  flex-1 pb-8">
        <Skeleton className="w-full h-80" />
      </div>
    );
  }

  if (isIntersecting) {
    fetchNextPage();
  }

  return (
    <div className="max-w-screen-2xl px-6 md:px-8 mx-auto flex-1 space-y-4 md:space-y-6">
      <Products actualProductArray={actualProductArray} />
      {isFetchingNextPage && <Skeleton className="w-full h-80" />}
      {data.pages.length === 7 ? (
        <div className="py-16 w-max mx-auto">
          <p className="text-base font-extrabold -tracking-tighter text-muted-foreground">
            That&apos;s all! Nothing more to load.
          </p>
        </div>
      ) : (
        <div ref={ref} className="py-8 inset-x-0 h-4 w-full" />
      )}
    </div>
  );
}

export default Page;
