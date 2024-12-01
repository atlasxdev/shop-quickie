import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectSeparator,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Product } from "@/types";
import { Dispatch, SetStateAction } from "react";

export function DropdownFilter({
  category,
  products,
  sortedResults,
  setSortedResults,
}: {
  category: string;
  products: Product[];
  sortedResults: {
    [key: string]: Product[];
  };
  setSortedResults: Dispatch<
    SetStateAction<
      | {
          [key: string]: Product[];
        }
      | "no-results"
      | undefined
    >
  >;
}) {
  return (
    <Select
      disabled={products.length <= 1}
      onValueChange={(v) => {
        switch (v) {
          case "price-asc":
            const copy = { ...sortedResults };
            copy[category] = [...products].sort((a, b) => a.price - b.price);
            setSortedResults(copy);
            break;
          case "price-desc":
            const copy2 = { ...sortedResults };
            copy2[category] = [...products].sort((a, b) => b.price - a.price);
            setSortedResults(copy2);
            break;
          case "title-asc":
            const copy3 = { ...sortedResults };
            copy3[category] = [...products].sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              return 0;
            });
            setSortedResults(copy3);
            break;
          case "title-desc":
            const copy4 = { ...sortedResults };
            copy4[category] = [...products]
              .sort((a, b) => {
                if (a.title < b.title) {
                  return -1;
                }
                return 0;
              })
              .reverse();
            setSortedResults(copy4);
            break;
          default:
            break;
        }
      }}
    >
      <SelectTrigger
        className={buttonVariants({
          className:
            "w-[150px] md:w-[200px] justify-between text-[0.7rem] md:text-xs",
          variant: "outline",
          size: "sm",
        })}
      >
        <SelectValue placeholder="Sort Options" />
      </SelectTrigger>
      <SelectContent className="bg-white shadow-lg rounded-md mt-2 w-48">
        <SelectGroup>
          <SelectLabel className="px-4 py-2 text-[0.7rem] md:text-xs font-semibold text-gray-700">
            Sort Options
          </SelectLabel>
          <SelectSeparator className="border-t" />
          <SelectItem
            value="price-asc"
            className="px-4 py-2 text-[0.7rem] md:text-xs text-muted-foreground cursor-pointer"
          >
            By Price ASC
          </SelectItem>
          <SelectItem
            value="price-desc"
            className="px-4 py-2 text-[0.7rem] md:text-xs text-muted-foreground cursor-pointer"
          >
            By Price DESC
          </SelectItem>
          <SelectSeparator className="border-t" />
          <SelectItem
            value="title-asc"
            className="px-4 py-2 text-[0.7rem] md:text-xs text-muted-foreground cursor-pointer"
          >
            By Title ASC
          </SelectItem>
          <SelectItem
            value="title-desc"
            className="px-4 py-2 text-[0.7rem] md:text-xs text-muted-foreground cursor-pointer"
          >
            By Title DESC
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
