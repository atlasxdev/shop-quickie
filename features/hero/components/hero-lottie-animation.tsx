"use client";

import { useLottie } from "lottie-react";
import { motion } from "framer-motion";
import groovyWalkAnimation from "../../../public/animation.json";

function HeroAnimation() {
  const { View } = useLottie({
    animationData: groovyWalkAnimation,
    loop: true,
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

export default HeroAnimation;
