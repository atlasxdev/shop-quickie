"use client";

import { apiRoute } from "@/axios/apiRoute";
import { CardProduct } from "@/components/CardProduct";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { getActualProductArray } from "@/lib/utils";
import { TProducts } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { memo, useMemo } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export const Products = memo(function Products({
  category,
}: {
  category: string;
}) {
  const maxItems =
    decodeURIComponent(category) === "men's clothing"
      ? 4
      : decodeURIComponent(category) === "women's clothing"
      ? 6
      : category === "electronics"
      ? 6
      : 4;
  const { data, fetchNextPage, isLoading, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: [`store-${category}`],
      queryFn: async ({ pageParam }) => {
        return await apiRoute.get<TProducts>(
          `/products/category/${
            category === "jewelries" ? "jewelery" : category
          }?limit=${pageParam}`
        );
      },
      initialPageParam: 3,
      getNextPageParam: (_, __, lastPageParam) => {
        return lastPageParam + 3;
      },
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
      <MaxWidthWrapper className="flex-1 pb-8">
        <Skeleton className="w-full h-80" />
      </MaxWidthWrapper>
    );
  }

  if (isIntersecting) {
    fetchNextPage();
  }

  return (
    <MaxWidthWrapper className="flex-1 space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actualProductArray.map(
          ({ id, title, category, description, image, price }) => {
            switch (category) {
              case "men's clothing":
                return (
                  <CardProduct
                    key={id}
                    id={id}
                    price={price}
                    title={title}
                    description={description}
                    image={image}
                    imageHeight="h-40"
                    titleHeight="h-10"
                  />
                );
              case "women's clothing":
                return (
                  <CardProduct
                    key={id}
                    id={id}
                    price={price}
                    title={title}
                    description={description}
                    image={image}
                    imageHeight="h-40"
                    titleHeight="h-10 md:h-16"
                  />
                );
              case "electronics":
                return (
                  <CardProduct
                    key={id}
                    description={description}
                    id={id}
                    image={image}
                    imageHeight="h-40"
                    price={price}
                    title={title}
                    titleHeight="h-14 md:h-16"
                  />
                );
              case "jewelery":
                return (
                  <CardProduct
                    key={id}
                    description={description}
                    id={id}
                    price={price}
                    image={image}
                    title={title}
                    imageHeight="h-44"
                    titleHeight="h-12 md:h-16"
                  />
                );
              default:
                break;
            }
          }
        )}
      </div>
      {isFetchingNextPage && <Skeleton className="w-full h-80" />}
      {data.pages.flatMap((page) => page.data).length > maxItems ? (
        <div className="py-16 w-max mx-auto">
          <p className="text-base font-extrabold -tracking-tighter text-muted-foreground">
            That&apos;s all! Nothing more to load.
          </p>
        </div>
      ) : (
        <div ref={ref} className="py-8 inset-x-0 h-4 w-full" />
      )}
    </MaxWidthWrapper>
  );
});
