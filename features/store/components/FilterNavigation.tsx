"use client";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { useMediaQuery } from "usehooks-ts";
import { CATEGORIES } from "@/constants";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Image from "next/image";
import MobileSwiper from "@/features/store/components/MobileSwiper";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

function FilterNavigation() {
  const params = useParams();
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState<string>(
    decodeURIComponent((params.category as string) ?? "")
  );
  const matches = useMediaQuery("(min-width: 640px)");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <MaxWidthWrapper className="w-full flex-1 py-12 md:py-16 lg:py-20">
        <Skeleton className="rounded-lg w-full h-96" />
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="space-y-8 md:space-y-12 py-14">
        <h1 className="text-center text-balance font-bold text-3xl md:text-4xl lg:text-5xl -tracking-tighter text-[#FBA328]">
          Store.{" "}
          <span className="text-muted-foreground">
            The easiest way to get the products you adore.
          </span>
        </h1>
        {matches ? (
          <div className="w-full flex justify-center items-center space-x-14">
            {CATEGORIES.map((category) => (
              <div className="flex flex-col items-center" key={category}>
                <Image
                  src={`/categories/${category}.jpg`}
                  alt={`${category} image`}
                  className="object-contain aspect-square"
                  width={110}
                  height={110}
                />
                <Button
                  variant={"link"}
                  size={"sm"}
                  className="capitalize text-xs -tracking-tighter"
                  onClick={() => {
                    setCategoryFilter(category);
                    router.push(`/store/${encodeURIComponent(category)}`);
                  }}
                >
                  {category}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <MobileSwiper setCategoryFilter={setCategoryFilter} />
        )}
      </div>
      <Breadcrumb className="py-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                className="text-sm md:text-base -tracking-tighter font-bold uppercase"
                href="/store"
                onClick={() => setCategoryFilter("")}
              >
                Store
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {categoryFilter && (
            <>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm md:text-base font-bold -tracking-tighter text-[#FBA328] uppercase">
                  {categoryFilter}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </MaxWidthWrapper>
  );
}

export default FilterNavigation;
