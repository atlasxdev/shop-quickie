/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { oramaClient } from ".";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Result } from "@orama/orama";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Loader, SearchIcon } from "lucide-react";
import Image from "next/image";
import LearnMore from "@/components/cta/learn-more";
import { CardDescription } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { priceFormatter } from "@/lib/utils";
import { useDebounceCallback } from "usehooks-ts";

export function OramaSearch() {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Result<any>[]>([]);
  const debouncedOramaSearch = useDebounceCallback(oramaSearch, 500);

  useEffect(() => {
    if (isClicked) {
      results.sort(
        (d1, d2) =>
          (d2.document as Product).price - (d1.document as Product).price
      );
    } else {
      results.sort(
        (d1, d2) =>
          (d1.document as Product).price - (d2.document as Product).price
      );
    }
  }, [isClicked, results]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  async function oramaSearch(term: string) {
    try {
      setIsLoading(true);
      const searchResults = await oramaClient.search({
        term: term,
        mode: "vector",
        limit: 5,
      });

      if (!searchResults?.hits.length) {
        setIsLoading(false);
        setResults([]);
        throw new Error("Something went wrong");
      }
      setIsLoading(false);
      setResults(searchResults.hits);
    } catch (error) {
      oramaClient.reset();
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className="flex w-full max-w-xs justify-between mx-4 lg:mx-0 text-muted-foreground hover:text-black"
          variant={"secondary"}
          size={"sm"}
        >
          <div className="flex items-center gap-2">
            <SearchIcon />
            Search...
          </div>

          <kbd className="hidden md:inline-flex pointer-events-none  h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-sm">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="!rounded-xl px-4 h-96 overflow-auto">
        <DialogHeader className="pt-6 space-y-4">
          <DialogTitle className="text-center -tracking-tighter uppercase font-extrabold text-[#FBA328]">
            Ask me anything
          </DialogTitle>

          <Input
            autoFocus
            placeholder="Search for products..."
            className="text-xs md:text-sm"
            value={search}
            onChange={async (e) => {
              if (e.target.value == null) return;
              setSearch(e.target.value);
              await debouncedOramaSearch(e.target.value);
            }}
          />
        </DialogHeader>

        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{
                opacity: 0,
                display: "none",
              }}
              animate={{
                opacity: 1,
                display: "block",
              }}
              exit={{
                opacity: 0,
                display: "none",
              }}
              className="mx-auto w-max"
            >
              <Loader className="animate-spin stroke-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>

        {results != null && results.length > 0 && (
          <>
            <div className="mt-0 md:mt-4 w-full flex items-center justify-between">
              <CardDescription className="mt-2 text-xs font-medium -tracking-tighter">
                {results.length} Results
              </CardDescription>
              <Button
                disabled={results.length <= 1}
                onClick={() => setIsClicked((prev) => !prev)}
                variant={"ghost"}
                size={"sm"}
                className="gap-2"
              >
                Price
                <ArrowUpDown />
              </Button>
            </div>
            <div className="w-full space-y-2">
              {results.map((hit: Result<Product>) => (
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 120,
                  }}
                  className="w-full flex gap-4 rounded-md p-4 border hover:shadow-md transition-shadow"
                  key={hit.id}
                >
                  <Image
                    src={hit.document.image}
                    alt={hit.document.description}
                    width={50}
                    height={50}
                    className="object-contain"
                  />
                  <div className="flex flex-col gap-4 w-full">
                    <p className="text-sm font-medium -tracking-tighter text-pretty">
                      {hit.document.title}
                    </p>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-sm">
                        {priceFormatter(hit.document.price)}
                      </p>
                      <div onClick={() => setIsOpen(false)}>
                        <LearnMore variant="link" id={hit.document.id} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
