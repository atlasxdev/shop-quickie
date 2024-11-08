"use client";

import { useLottie } from "lottie-react";
import { motion } from "framer-motion";
import orderAnimation from "../../public/order-status.json";

export function OrderAnimation() {
  const { View } = useLottie({
    animationData: orderAnimation,
    loop: true,
    className: "!size-52",
  });
  return (
    <motion.div
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        delay: 0.5,
      }}
    >
      {View}
    </motion.div>
  );
}
