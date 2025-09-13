import React from "react";
import { motion } from "framer-motion";
import { cardVariants } from "../motion/Allpopupmotion";

const DeleteConfirmPopup = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3"
      onClick={onCancel} 
    >
      <motion.div
        className="bg-slate-200 rounded-2xl shadow-xl p-6 w-full max-w-sm"
        variants={cardVariants} 
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()} 
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-confirm-title"
      >
        <h2 id="delete-confirm-title" className="text-lg font-semibold text-gray-800 mb-2">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this entry? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100 transition text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1.5 rounded-full bg-red-600 text-white hover:bg-red-700 transition text-sm"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmPopup;
