import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, cardVariants } from "../../components/motion/Allpopupmotion"; 

const ConfirmPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={onCancel}
      >
        <motion.div
          className="bg-gradient-to-br from-slate-50 to-slate-200 rounded-2xl shadow-2xl p-6 w-full max-w-md font-gilroy select-none"
          variants={cardVariants} 
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-6 text-gray-900 text-center text-lg font-medium">
            {message}
          </p>
          <div className="flex flex-col sm:flex-row justify-end gap-4">
            <button
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition text-center"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-full sm:w-auto px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition text-center"
            >
              Delete
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmPopup;
