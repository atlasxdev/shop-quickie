import LearnMore from "@/components/cta/learn-more";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import { memo } from "react";

export const Products = memo(function Products({
  actualProductArray,
}: {
  actualProductArray: Product[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {actualProductArray.map(({ id, title, category, description, image }) => (
        <Card
          key={id}
          className="flex-1 h-full shadow-none hover:shadow-lg hover:scale-[1.01] transition-transform"
        >
          <CardContent className="flex flex-col w-full h-full py-4">
            <CardHeader className="space-y-4 px-2">
              <CardTitle className="text-center text-xl -tracking-tighter text-balance font-bold">
                {title}
              </CardTitle>
              <Badge
                className=" capitalize rounded-full w-max mx-auto text-[0.7rem] font-normal"
                variant={"secondary"}
              >
                {category}
              </Badge>

              <LearnMore id={id} />
            </CardHeader>
            <div className="flex-1 flex items-center justify-center mb-4">
              <Image
                className="object-cover mx-auto"
                width={120}
                height={120}
                src={image}
                alt={description}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
