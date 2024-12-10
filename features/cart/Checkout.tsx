import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateCheckoutUrl } from "@/lib/utils";
import { Cart, UserType } from "@/zustand-store/store";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

export function Checkout({
  user,
  cartTotal,
  products,
}: {
  user: UserType | null;
  cartTotal: number;
  products: Cart["products"];
}) {
  const checkoutUrl = generateCheckoutUrl(products);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="w-full py-12 md:py-14 space-y-6"
    >
      <Separator />
      <div className=" w-full flex justify-between items-center">
        <p className="text-lg md:text-2xl -tracking-tighter font-semibold">
          Your total
        </p>
        <AnimatedNumber
          className="text-lg md:text-2xl font-semibold"
          value={cartTotal}
          isPrice={true}
        />
      </div>
      <div className="w-52 ml-auto ">
        {user ? (
          <Link
            href={`/checkout?${checkoutUrl}`}
            className={buttonVariants({
              size: "lg",
              className: "w-full !rounded-full gap-2",
            })}
          >
            Checkout <ArrowRight />
          </Link>
        ) : (
          <Button
            onClick={() => {
              const toastId = toast(
                "Please log in to continue your shopping spree! 🛒",
                {
                  action: {
                    label: "Sign in",
                    onClick: () => (window.location.href = "/login"),
                  },
                }
              );
              toast.dismiss(toastId);
            }}
            size={"lg"}
            className="rounded-full gap-2 w-full"
          >
            Checkout <ArrowRight />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
