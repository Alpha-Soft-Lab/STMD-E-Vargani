import React from "react";
import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

const AnimatedRefreshIcon = () => {
  return (
    <motion.div
      key="loader"
      className="flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: [1, 1.15, 1],
        rotate: 360,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        duration: 1,
      }}
    >
      <RotateCcw size={18} />
    </motion.div>
  );
};

export default AnimatedRefreshIcon;
