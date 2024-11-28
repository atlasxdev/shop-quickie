"use client";

import { oramaClient } from "@/services";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Result } from "@orama/orama";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { priceFormatter } from "@/lib/utils";
import LearnMore from "@/components/cta/learn-more";

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

  async function oramaSearch() {
    try {
      const searchResults = await oramaClient.search({
        term: search,
        mode: "vector",
        limit: 5,
      });

      if (!searchResults?.hits.length) {
        throw new Error("Something went wrong");
      }

      return (searchResults.hits as Result<Product>[]).filter(
        (v) => v.document.id.toString() != id
      );
    } catch (error) {
      oramaClient.reset();
      console.error(error);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="pb-8 md:pb-10">
      <Card className="py-6 md:py-8 px-4 border-none shadow-none">
        <CardHeader className="space-y-6">
          <CardTitle className="text-center uppercase -tracking-tighter text-xl md:text-2xl font-bold">
            Related Products
          </CardTitle>
          <div className="mt-0 md:mt-4 w-full flex items-center justify-between">
            <CardDescription className="text-xs md:text-sm font-medium -tracking-tighter">
              {data?.length} results for {`"${search}"`}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0 md:px-6 md:pb-6 md:pt-0">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.map((hit) => (
              <motion.div
                layout
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 120,
                }}
                className="w-full flex flex-col gap-4 rounded-lg p-6 md:p-8 border hover:shadow-md transition-shadow"
                key={hit.id}
              >
                <div className="h-36 md:h-44">
                  <Image
                    src={hit.document.image}
                    alt={hit.document.description}
                    width={100}
                    height={100}
                    className="hidden md:block object-contain mx-auto"
                  />
                  <Image
                    src={hit.document.image}
                    alt={hit.document.description}
                    width={80}
                    height={80}
                    className="block md:hidden object-contain mx-auto"
                  />
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="h-[40px] md:h-[60px] xl:h-[72px]">
                    <p className="text-sm lg:text-base font-medium -tracking-tighter text-pretty">
                      {hit.document.title}
                    </p>
                  </div>
                  <div className="h-[64px]">
                    <p className="text-xs font-medium -tracking-tighter text-pretty text-muted-foreground line-clamp-4">
                      {hit.document.description}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <p className="text-base md:text-lg font-bold">
                      {priceFormatter(hit.document.price)}
                    </p>

                    <LearnMore
                      className="w-2/4 mx-0 ml-auto"
                      id={hit.document.id}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
