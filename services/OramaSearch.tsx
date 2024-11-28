"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Product } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, ArrowUpDown, Loader, SearchIcon } from "lucide-react";
import Image from "next/image";
import LearnMore from "@/components/cta/learn-more";
import { CardDescription } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import { priceFormatter } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSearch from "@/hooks/use-search";
import Link from "next/link";

export function OramaSearch() {
  const [isClicked, setIsClicked] = useState<boolean>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const { searchResults, isLoading } = useSearch(search);

  useEffect(() => {
    if (searchResults == null || searchResults == "no-results") return;
    if (isClicked) {
      searchResults.sort(
        (d1, d2) =>
          (d2.document as Product).price - (d1.document as Product).price
      );
    } else {
      searchResults.sort(
        (d1, d2) =>
          (d1.document as Product).price - (d2.document as Product).price
      );
    }
  }, [isClicked, searchResults]);

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
      <DialogContent className="!rounded-xl px-4">
        <ScrollArea className="mt-4 h-96">
          <div className="pl-2 pb-4 pr-4 space-y-6 md:space-y-8">
            <DialogHeader className="pt-6 space-y-4">
              <DialogTitle className="text-center -tracking-tighter uppercase font-extrabold text-[#FBA328]">
                Ask me anything
              </DialogTitle>

              <Input
                autoFocus
                placeholder="Search for products..."
                className="text-xs md:text-sm"
                value={search}
                onChange={(e) => {
                  if (e.target.value == null) return;
                  setSearch(e.target.value);
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
              {searchResults == "no-results" && (
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
                  transition={{
                    delay: 0.2,
                  }}
                  className="space-y-6 py-10"
                >
                  <div className="text-center space-y-4">
                    <h2 className="-tracking-tighter text-sm md:text-base font-medium">
                      🤔 Hmmm... No Matches Found
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm -tracking-tighter text-balance">
                      It seems like we couldn&apos;t find anything matching your
                      search. But don&apos;t worry, our store is full of amazing
                      finds! Try adjusting your keywords or explore our featured
                      collections.
                    </p>{" "}
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
                </motion.div>
              )}
            </AnimatePresence>

            {searchResults != "no-results" &&
              searchResults != null &&
              searchResults.length > 0 && (
                <>
                  <div className="mt-0 md:mt-4 w-full flex items-center justify-between">
                    <CardDescription className="mt-2 text-xs font-medium -tracking-tighter">
                      {searchResults.length} Results
                    </CardDescription>
                    <Button
                      disabled={searchResults.length <= 1}
                      onClick={() =>
                        setIsClicked((prev) => {
                          if (prev == null) {
                            return true;
                          } else {
                            return !prev;
                          }
                        })
                      }
                      variant={"ghost"}
                      size={"sm"}
                      className="gap-2"
                    >
                      Price
                      <ArrowUpDown />
                    </Button>
                  </div>
                  <div className="w-full space-y-2">
                    {searchResults.map((hit) => (
                      <motion.div
                        layout
                        transition={{
                          type: "spring",
                          damping: 25,
                          stiffness: 120,
                          delay: 0.4,
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
                              <LearnMore
                                variant="link"
                                id={hit.document.id}
                                search={search}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
