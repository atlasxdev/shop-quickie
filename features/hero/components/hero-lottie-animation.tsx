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
        y: sessionStorage.getItem("hasAnimated") ? 0 : 30,
        opacity: sessionStorage.getItem("hasAnimated") ? 1 : 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        delay: 3,
      }}
    >
      {View}
    </motion.div>
  );
}

export default HeroAnimation;
