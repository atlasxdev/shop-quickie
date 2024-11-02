"use client";
import { ReactNode, useMemo } from "react";
import { motion } from "framer-motion";

export function TextEffect({
  words,
  delay = 0,
  icon,
  className,
}: {
  words: string;
  delay?: number;
  icon?: ReactNode;
  className?: string;
}) {
  const splittedWords = words.split(" ");

  const wordsToDisplay = useMemo(() => {
    function splitWords() {
      const _splittedWords = [];
      for (let i = 0; i < splittedWords.length; i++) {
        _splittedWords.push(splittedWords[i]);
      }
      return _splittedWords;
    }
    return splitWords();
  }, [splittedWords]);

  return (
    <div className="w-full flex gap-2 flex-wrap -tracking-tighter">
      {wordsToDisplay.map((word, idx) => (
        <motion.span
          className={className}
          initial={{
            opacity: 0,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          transition={{
            delay: idx / 20 + delay,
          }}
          key={idx}
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        className="inline-block"
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
      >
        {icon}
      </motion.span>
    </div>
  );
}
