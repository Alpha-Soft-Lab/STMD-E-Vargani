import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, cardVariants } from "../motion/Allpopupmotion";

const CreateTabModal = ({ showModal, setShowModal, tabName, setTabName, date, setDate, onSubmit }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4 select-none"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-gradient-to-br from-white to-slate-100 rounded-2xl shadow-2xl p-6 w-full max-w-md font-gilroy"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800 select-none">
              Create New Tab
            </h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 select-none">
                  Tab Name
                </label>
                <input
                  type="text"
                  value={tabName}
                  onChange={(e) => setTabName(e.target.value)}
                  required
                  placeholder="Enter Tab Name"
                  className="bg-slate-50 w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-400 transition duration-200 ease-in-out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 select-none">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="bg-slate-50 w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-blue-400 transition duration-200 ease-in-out"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateTabModal;
