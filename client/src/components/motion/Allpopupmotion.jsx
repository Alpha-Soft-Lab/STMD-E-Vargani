export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};
