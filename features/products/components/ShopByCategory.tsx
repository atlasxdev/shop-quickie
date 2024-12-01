import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export function ShopByCategory() {
  return (
    <Card className="bg-white py-6 space-y-4 md:space-y-6">
      <CardHeader>
        <CardTitle className="uppercase -tracking-tighter font-bold text-xl md:text-2xl text-center">
          Shop By Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex flex-wrap justify-evenly items-center gap-6 md:gap-8">
          {CATEGORIES.map((category) => (
            <div className="flex flex-col items-center" key={category}>
              <Image
                src={`/categories/${category}.jpg`}
                alt={`${category} image`}
                className="object-contain aspect-square"
                width={120}
                height={120}
              />
              <Link
                href={`/store/${encodeURIComponent(category)}`}
                className={buttonVariants({
                  className:
                    "capitalize text-xs -tracking-tighter hover:text-[#FBA328]",
                  variant: "link",
                  size: "sm",
                })}
              >
                {category}
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
