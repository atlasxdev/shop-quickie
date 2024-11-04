import { motion } from "framer-motion";

export function ErrorMessage({ message }: { message?: string }) {
  return (
    <motion.p
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="text-[0.7rem] text-red-600 font-medium text-pretty -tracking-tighter"
    >
      {message}
    </motion.p>
  );
}
