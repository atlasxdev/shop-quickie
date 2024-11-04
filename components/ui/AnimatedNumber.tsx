"use client";
import { cn, priceFormatter } from "@/lib/utils";
import { motion, SpringOptions, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type AnimatedNumber = {
  value: number;
  className?: string;
  isPrice?: boolean;
  springOptions?: SpringOptions;
};

export function AnimatedNumber({
  value,
  className,
  isPrice = false,
  springOptions,
}: AnimatedNumber) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    isPrice ? priceFormatter(current) : Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
