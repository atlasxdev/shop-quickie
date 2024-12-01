"use client";

import { oramaClient } from "@/services";
import { Product, TResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { filterEmptyArrays, priceFormatter } from "@/lib/utils";
import LearnMore from "@/components/cta/learn-more";
import { ArrowRight, ExternalLink, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownFilter } from "@/services/components/DropdownFilter";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function RelatedProducts({
  search,
  id,
}: {
  search: string;
  id: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["related-products", search],
    queryFn: async () => {
      return await oramaSearch();
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: search != null,
  });
  const [count, setCount] = useState<number>(0);
  const [sortedResults, setSortedResults] = useState<
    | "no-results"
    | {
        [key: string]: Product[];
      }
    | undefined
  >(data);

  useEffect(() => {
    setSortedResults(data);
    if (data != "no-results" && data != null) {
      setCount(
        Object.values(data).reduce(
          (total, products) => total + products.length,
          0
        )
      );
    }
  }, [data]);

  async function oramaSearch() {
    try {
      const searchResults = await oramaClient.search({
        term: search,
        mode: "vector",
        groupBy: {
          properties: ["category"],
        },
        sortBy: {
          property: "title",
          order: "ASC",
        },
      });
      if (searchResults?.groups == null) {
        return "no-results";
      }
      const categorizeProducts = searchResults.groups.reduce(
        (acc: { [key: string]: Product[] }, group: TResult) => {
          const category = group.values[0];
          acc[category.toString()] = group.result
            .filter((item) => item.document.id.toString() != id)
            .map((v) => v.document);
          return acc;
        },
        {}
      );

      const filteredProducts = filterEmptyArrays(categorizeProducts);

      return filteredProducts;
    } catch (error) {
      setCount(0);
      oramaClient.reset();
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh] gap-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Loader className="animate-spin text-blue-600 w-10 h-10 mb-4" />
          <p className="text-gray-600 text-sm">Loading related products...</p>
        </motion.div>
      </div>
    );
  }

  if (data == null || data == "no-results") {
    return (
      <div className="pb-8 md:pb-10">
        <Card className="flex flex-col items-center justify-center gap-4 h-60 md:h-72 lg:h-80 py-6 md:py-8 px-4 border-none shadow-none">
          <div className="text-center space-y-4">
            <h2 className="-tracking-tighter text-sm md:text-base font-medium">
              🤔 Hmmm... No results found for {`"${search}"`}
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm -tracking-tighter text-balance">
              It seems like we couldn&apos;t find anything matching your search.
              But don&apos;t worry, our store is full of amazing finds! Try
              adjusting your keywords or explore our featured collections.
            </p>
          </div>
          <div className="w-max mx-auto">
            <Link
              href="/store"
              className={buttonVariants({
                variant: "secondary",
                className: "!rounded-full gap-2",
              })}
            >
              Browse Store
              <ArrowRight />
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-8 md:pb-10">
      <Card className="py-6 md:py-8 px-4 border-none shadow-none">
        <CardHeader className="px-0 md:p-6 space-y-6">
          <CardTitle className="text-center uppercase -tracking-tighter text-xl lg:text-2xl font-bold">
            Related Products
          </CardTitle>
          <div className="mt-0 md:mt-4 w-full flex items-center justify-between">
            <CardDescription className="text-xs md:text-sm font-medium -tracking-tighter">
              {count} results for {`"${search}"`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6 md:pt-0">
          {sortedResults != "no-results" && sortedResults != null && (
            <div className="w-full space-y-8 md:space-y-12">
              {Object.entries(sortedResults).map(([category, products]) => (
                <div className="space-y-6" key={category}>
                  <div className="w-full flex justify-between items-center">
                    <Link
                      className="text-[#FBA328] flex items-center justify-center gap-2"
                      href={`/store/${category}`}
                      target="_blank"
                    >
                      <h1 className="uppercase -tracking-tighter text-sm md:text-base font-bold">
                        {category}
                      </h1>
                      <ExternalLink className="size-4" />
                    </Link>
                    <DropdownFilter
                      category={category}
                      products={products}
                      setSortedResults={setSortedResults}
                      sortedResults={sortedResults}
                    />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <motion.div
                        layout
                        transition={{
                          type: "spring",
                          damping: 25,
                          stiffness: 120,
                        }}
                        className="bg-white w-full flex flex-col gap-4 rounded-lg p-6 md:p-8 border hover:shadow-md transition-shadow"
                        key={product.id}
                      >
                        <div className="h-36 md:h-44">
                          <Image
                            src={product.image}
                            alt={product.description}
                            width={100}
                            height={100}
                            className="hidden md:block object-contain mx-auto"
                          />
                          <Image
                            src={product.image}
                            alt={product.description}
                            width={80}
                            height={80}
                            className="block md:hidden object-contain mx-auto"
                          />
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                          <div className="h-[40px] md:h-[60px] xl:h-[72px]">
                            <p className="text-sm lg:text-base font-medium -tracking-tighter text-pretty">
                              {product.title}
                            </p>
                          </div>
                          <div className="h-[64px]">
                            <p className="text-xs font-medium -tracking-tighter text-pretty text-muted-foreground line-clamp-4">
                              {product.description}
                            </p>
                          </div>
                          <div className="w-full flex items-center justify-between">
                            <p className="text-base md:text-lg font-bold">
                              {priceFormatter(product.price)}
                            </p>

                            <LearnMore
                              className="w-2/4 mx-0 ml-auto"
                              id={product.id}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
