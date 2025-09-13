import { motion } from "framer-motion";

const TabsSectionLabel = () => {
  return (
    <div className="px-5 mt-6 mb-4 ">
      <div className="flex items-center gap-3">
        <hr className="flex-grow border-t border-gray-300" />
        <motion.h2
          className="text-lg font-semibold text-gray-600 tracking-wide"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tabs
        </motion.h2>
        <hr className="flex-grow border-t border-gray-300" />
      </div>
    </div>
  );
};

export default TabsSectionLabel;
