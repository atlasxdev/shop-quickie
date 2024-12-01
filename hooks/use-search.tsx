/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { oramaClient } from "@/services";
import { Product, TResult } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function useSearch(search: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [searchResults, setSearchResults] = useState<
    | {
        [key: string]: Product[];
      }
    | "no-results"
    | undefined
  >();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!search) return;
    const delay = setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["search", search],
        queryFn: async () => await oramaSearch(search),
      });
    }, 500);

    return () => {
      oramaClient.reset();
      clearTimeout(delay);
    };
  }, [queryClient, search]);

  async function oramaSearch(search: string) {
    try {
      setIsLoading(true);
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
        throw new Error("Something went wrong");
      }

      const categorizeProducts = searchResults.groups.reduce(
        (acc: { [key: string]: Product[] }, group: TResult) => {
          const category = group.values[0];
          acc[category.toString()] = group.result.map((item) => item.document);
          return acc;
        },
        {}
      );
      setCount(
        Object.values(categorizeProducts).reduce(
          (total, products) => total + products.length,
          0
        )
      );
      setSearchResults(categorizeProducts);
      setIsLoading(false);
      return categorizeProducts;
    } catch (error) {
      oramaClient.reset();
      console.error(error);
      setCount(0);
      setIsLoading(false);
      setSearchResults("no-results");
      return "no-results";
    }
  }

  return { searchResults, isLoading, count };
}

export default useSearch;
