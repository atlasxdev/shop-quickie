import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateCheckoutUrl } from "@/lib/utils";
import { Cart } from "@/zustand-store/store";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function Checkout({
  cartTotal,
  products,
}: {
  cartTotal: number;
  products: Cart["products"];
}) {
  const router = useRouter();
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
        <Button
          onClick={() => router.push(`/checkout?${checkoutUrl}`)}
          size={"lg"}
          className="w-full rounded-full gap-2"
        >
          Checkout <ArrowRight />
        </Button>
      </div>
    </motion.div>
  );
}
