import React from "react";
import { RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedRefreshIcon from "../motion/TabRefresh";
import shreeramimg from "../../assets/img/Shree Ram.jpg";

const TabListRefreshButton = ({ onClick, isRefreshing }) => {
  return (
    <div className="flex justify-between items-center px-5 pt-4 mb-4 mt-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-200 shadow-lg overflow-hidden">
          <img
            src={shreeramimg}
            alt="Shree Ram"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-lg font-semibold text-gray-800">Welcome</span>
          <span className="text-xs text-orange-500 tracking-wide uppercase font-medium">
            Jai Shree Ram 🙏
          </span>
        </div>
      </div>

      <button
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50"
        disabled={isRefreshing}
      >
        <AnimatePresence mode="wait">
          {isRefreshing ? (
            <AnimatedRefreshIcon />
          ) : (
            <motion.div
              key="text"
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <RotateCcw size={18} />
              <span>Refresh</span>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default TabListRefreshButton;
