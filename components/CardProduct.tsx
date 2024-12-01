import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { cn, priceFormatter } from "@/lib/utils";
import Link from "next/link";
import { Product } from "@/types";
import AddToCart from "./cta/add-to-cart";

export function CardProduct({
  title,
  description,
  id,
  image,
  price,
  imageHeight,
  titleHeight,
}: Pick<Product, "description" | "image" | "id" | "price" | "title"> & {
  imageHeight: string;
  titleHeight: string;
}) {
  return (
    <Card className="flex-1 h-full shadow-none hover:shadow-lg hover:scale-[1.01] transition-transform">
      <CardContent className="flex flex-col w-full h-full py-4">
        <CardHeader className="space-y-4 px-2">
          <div
            className={cn("flex items-center justify-center mb-4", imageHeight)}
          >
            <Image
              className="object-cover mx-auto"
              width={120}
              height={120}
              src={image}
              alt={description}
            />
          </div>
          <div className={cn("flex items-center", titleHeight)}>
            <CardTitle className="text-sm lg:text-base -tracking-tighter text-balance font-bold">
              {title}
            </CardTitle>
          </div>
          <div className="space-y-2">
            <p className="font-medium -tracking-tighter">
              {priceFormatter(price)}
            </p>
            <CardDescription className="text-xs -tracking-tighter text-balance line-clamp-3">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <div className="flex flex-col-reverse md:flex-row items-center gap-2">
          <Link
            href={`/products?id=${id}`}
            className={buttonVariants({
              className: "text-sm -tracking-tighter !rounded-full w-full",
              size: "sm",
            })}
          >
            Buy now
          </Link>
          <AddToCart
            price={price}
            productId={id.toString()}
            quantity={1}
            size="sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}
