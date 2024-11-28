"use client";

import { oramaClient } from "@/services";
import { Product } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Result } from "@orama/orama";

function useSearch(search: string) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    Result<Product>[] | "no-results" | undefined
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
        limit: 5,
      });

      if (!searchResults?.hits.length) {
        setIsLoading(false);
        setSearchResults("no-results");
        throw new Error("Something went wrong");
      }
      setSearchResults(searchResults.hits as Result<Product>[]);
      setIsLoading(false);
      return searchResults.hits as Result<Product>[];
    } catch (error) {
      oramaClient.reset();
      console.error(error);
      setSearchResults("no-results");
      return "no-results";
    }
  }

  return { searchResults, isLoading };
}

export default useSearch;
