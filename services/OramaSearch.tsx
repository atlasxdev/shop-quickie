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
import { Loader, SearchIcon } from "lucide-react";
import Image from "next/image";
import LearnMore from "@/components/cta/learn-more";
import { CardDescription } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { priceFormatter } from "@/lib/utils";

export function OramaSearch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Result<any>[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen, setSearch]);

  async function oramaSearch(term: string) {
    try {
      setIsLoading(true);
      const searchResults = await oramaClient.search({
        term: term,
        mode: "vector",
        sortBy: {
          property: "price",
          order: "ASC",
        },
      });
      if (searchResults == null) {
        setIsLoading(false);
        throw new Error("Something went wrong");
      }
      setResults(searchResults.hits);
      setIsLoading(false);
    } catch (error) {
      oramaClient.reset();
      console.error(error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className="flex w-full lg:w-2/6 justify-start mx-4 lg:mx-0 lg:pl-6 text-muted-foreground hover:text-black"
          variant={"secondary"}
          size={"sm"}
        >
          <SearchIcon />
          Search...
        </Button>
      </DialogTrigger>
      <DialogContent className="!rounded-xl px-4 max-h-96 max-w-md overflow-auto">
        <DialogHeader className="pt-6 space-y-4">
          <DialogTitle className="text-center -tracking-tighter uppercase font-extrabold text-[#FBA328]">
            Ask me anything
          </DialogTitle>
          <Input
            autoFocus
            placeholder="Search..."
            value={search}
            onChange={async (e) => {
              if (e.target.value == null) return;
              setSearch(e.target.value);
              await oramaSearch(e.target.value);
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
        <AnimatePresence>
          {results.length === 0 && isLoading == false && (
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
            >
              <p className="text-balance text-center -tracking-tighter text-muted-foreground font-bold">
                Quickly find the product you want by simply typing it here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {results.length > 0 && (
          <>
            <CardDescription className="mt-2">
              {results.length} Results
            </CardDescription>
            <div className="w-full space-y-2">
              {results.map((hit: Result<Product>) => (
                <div
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
                </div>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
