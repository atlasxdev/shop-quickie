"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Loader, SearchIcon } from "lucide-react";
import Image from "next/image";
import LearnMore from "@/components/cta/learn-more";
import { AnimatePresence, motion } from "framer-motion";
import { priceFormatter } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import useSearch from "@/hooks/use-search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { DropdownFilter } from "./components/DropdownFilter";

export function OramaSearch() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setIsOpen]);

  return (
    <>
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full max-w-sm justify-between mx-4 lg:mx-0 text-muted-foreground hover:text-black"
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

      {isOpen && <OramaSearchContent isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
}

type OramaSearchProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function OramaSearchContent({ isOpen, setIsOpen }: OramaSearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const { searchResults, isLoading, count } = useSearch(search);
  const [sortedResults, setSortedResults] = useState(searchResults);

  useEffect(() => {
    setSortedResults(searchResults);
  }, [searchResults]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogContent className="!rounded-xl px-4 max-w-2xl">
        <ScrollArea className="mt-4 h-[400px]">
          <div className="relative pl-2 pb-4 pr-4 space-y-6 md:space-y-8">
            <DialogHeader className="sticky top-0 z-20 pt-6 space-y-4 backdrop-blur-md bg-white/70 p-4 rounded-md">
              <DialogTitle className="text-center -tracking-tighter uppercase font-extrabold text-[#FBA328]">
                Ask me anything
              </DialogTitle>

              <Input
                autoFocus
                placeholder="Search for products..."
                className="text-xs md:text-sm bg-white"
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
                      🤔 Hmmm... No results found
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
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        router.push("/store");
                      }}
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

            {sortedResults != "no-results" && sortedResults != null && (
              <div className="w-full space-y-2">
                <div className="w-max ml-auto">
                  <Badge
                    variant={"secondary"}
                    className="font-medium -tracking-tighter"
                  >
                    Number of results:
                    <span className="ml-1">{count}</span>
                  </Badge>
                </div>
                <div className="w-full space-y-10 md:space-y-12">
                  {Object.entries(sortedResults).map(([category, products]) => (
                    <div className="py-4 space-y-2" key={category}>
                      <div className="w-full flex justify-between items-center">
                        <h1 className="uppercase -tracking-tighter text-sm md:text-base font-bold text-[#FBA328]">
                          {category}
                        </h1>
                        <DropdownFilter
                          category={category}
                          products={products}
                          setSortedResults={setSortedResults}
                          sortedResults={sortedResults}
                        />
                      </div>
                      {products.map((product) => (
                        <motion.div
                          layout
                          transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 120,
                          }}
                          className="bg-white w-full flex flex-col gap-4 rounded-lg p-4 md:p-6 border hover:shadow-md transition-shadow"
                          key={product.id}
                        >
                          <Image
                            src={product.image}
                            alt={product.description}
                            width={80}
                            height={80}
                            className="hidden md:block object-contain mx-auto"
                          />
                          <Image
                            src={product.image}
                            alt={product.description}
                            width={60}
                            height={60}
                            className="block md:hidden object-contain mx-auto"
                          />
                          <div className="flex flex-col gap-4 w-full">
                            <p className="text-sm lg:text-base font-medium -tracking-tighter text-pretty">
                              {product.title}
                            </p>

                            <p className="text-xs font-medium -tracking-tighter text-pretty text-muted-foreground line-clamp-3">
                              {product.description}
                            </p>
                            <div className="w-full flex items-center justify-between">
                              <p className="text-sm md:text-base font-bold">
                                {priceFormatter(product.price)}
                              </p>
                              <div
                                className="w-2/4"
                                onClick={() => setIsOpen(false)}
                              >
                                <LearnMore
                                  search={search}
                                  className="w-full mx-0 ml-auto"
                                  id={product.id}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
