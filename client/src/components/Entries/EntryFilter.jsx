import React, { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cardVariants } from "../../components/motion/Allpopupmotion"; 


const EntryFilter = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...localFilters, [name]: value };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="relative w-full mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/70 border border-gray-100 px-4 py-2 rounded-full shadow hover:shadow-md transition duration-200"
      >
        <SlidersHorizontal className="w-4 h-4 text-gray-600" />
        <span className="font-medium text-gray-700">Filters</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="entry-filter"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-50 mt-3 w-full max-w-5xl bg-gradient-to-br from-white to-slate-100 border-gray-200 rounded-2xl shadow-2xl p-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  name="fromDate"
                  value={localFilters.fromDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm shadow-sm transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  name="toDate"
                  value={localFilters.toDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm shadow-sm transition duration-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={localFilters.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm shadow-sm transition duration-200"
                >
                  <option value="">All</option>
                  <option value="cash">Cash</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={localFilters.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white/50 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm shadow-sm transition duration-200"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="fulfilled">Fulfilled</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EntryFilter;
