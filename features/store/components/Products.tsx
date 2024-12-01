import { CardProduct } from "@/components/CardProduct";
import { Product } from "@/types";
import { memo } from "react";

export const Products = memo(function Products({
  actualProductArray,
}: {
  actualProductArray: Product[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {actualProductArray.map(
        ({ id, title, category, description, image, price }) => {
          switch (category) {
            case "men's clothing":
              return (
                <CardProduct
                  id={id}
                  price={price}
                  title={title}
                  description={description}
                  image={image}
                  imageHeight="h-40"
                  titleHeight="h-10"
                />
              );
            case "women's clothing":
              return (
                <CardProduct
                  id={id}
                  price={price}
                  title={title}
                  description={description}
                  image={image}
                  imageHeight="h-40"
                  titleHeight="h-10 md:h-16"
                />
              );
            case "electronics":
              return (
                <CardProduct
                  description={description}
                  id={id}
                  image={image}
                  imageHeight="h-40"
                  price={price}
                  title={title}
                  titleHeight="h-14 md:h-16"
                />
              );
            case "jewelery":
              return (
                <CardProduct
                  description={description}
                  id={id}
                  price={price}
                  image={image}
                  title={title}
                  imageHeight="h-44"
                  titleHeight="h-12 md:h-16"
                />
              );
            default:
              break;
          }
        }
      )}
    </div>
  );
});
