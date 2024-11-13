import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosResponse } from "axios";
import { TProducts } from "@/types";
import { Cart } from "@/zustand-store/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateCheckoutUrl(products: Cart["products"]) {
  const url: string[] = [];
  for (let index = 0; index < products.length; index++) {
    if (products.length === 1) {
      url.push(
        `productId=${products[index].productId}&quantity=${products[index].quantity}`
      );
    } else if (products.length == index + 1) {
      url.push(
        `productId=${products[index].productId}&quantity=${products[index].quantity}`
      );
    } else {
      url.push(
        `productId=${products[index].productId}&quantity=${products[index].quantity}&`
      );
    }
  }
  return url.join("");
}

export async function wait(time: number) {
  return new Promise((res) => setTimeout(res, time));
}

export function priceFormatter(price: number) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export function getActualProductArray(
  pages: AxiosResponse<TProducts, unknown>[],
  pageParams: unknown[]
) {
  const product = [...pages.flatMap((page) => page.data)];

  const currentPage = pageParams.slice(-1)[0] as number;

  console.log(pages);

  const pagesToSlice =
    (pageParams.reduce(
      (acc, val) => (acc as number) + (val as number),
      0
    ) as number) - currentPage;

  if (pagesToSlice === currentPage) {
    const actualProductArray = product.slice(0, pages[0].data.length);
    return actualProductArray;
  }

  const actualProductArray = product.slice(pagesToSlice);

  return actualProductArray;
}
