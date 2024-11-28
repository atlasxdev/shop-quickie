import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export function LearnMore({
  id,
  search,
  variant = "default",
  className,
}: {
  id: number;
  search?: string;
  className?: string;
  variant?: "link" | "default";
}) {
  return (
    <Link
      href={
        search ? `/products?id=${id}&search=${search}` : `/products?id=${id}`
      }
      className={buttonVariants({
        className: cn("w-max !rounded-full mx-auto text-[0.7rem]", className),
        variant: variant,
        size: "sm",
      })}
    >
      Learn more
    </Link>
  );
}

export default LearnMore;
