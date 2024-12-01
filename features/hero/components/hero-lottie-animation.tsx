"use client";

import { useLottie } from "lottie-react";
import { motion } from "framer-motion";
import groovyWalkAnimation from "../../../public/animation-optimized.json";

function HeroAnimation() {
  const { View } = useLottie({
    animationData: groovyWalkAnimation,
    loop: true,
  });

  return (
    <motion.div
      initial={{
        x: 30,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
      }}
    >
      {View}
    </motion.div>
  );
}

export default HeroAnimation;
