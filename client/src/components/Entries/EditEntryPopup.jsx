import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, cardVariants } from "../motion/Allpopupmotion";

const EditEntryPopup = ({ isOpen, entry, onConfirm, onCancel }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (entry) {
      setName(entry.name || "");
      setAmount(entry.amount || "");
      setStatus(entry.status || "pending");
      setPaymentMethod(entry.paymentMethod || "cash");
    }
  }, [entry]);

  const inputClass =
    "w-full border rounded-lg px-3 py-2 outline-none focus:outline-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-lg p-6 w-full max-w-sm"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-lg font-semibold mb-4">Edit Entry</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">Name</p>
              <input
                type="text"
                className={inputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-sm text-gray-700">Amount</p>
              <input
                type="number"
                className={inputClass}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-sm text-gray-700">Status</p>
              <select
                className={inputClass}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="fulfilled">Fulfilled</option>
              </select>
              <p className="text-sm text-gray-700">Payment Method</p>
              <select
                className={inputClass}
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={onCancel}
                className="px-3 py-1 rounded-full border text-gray-600 text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  onConfirm({ name, amount, status, paymentMethod })
                }
                className="px-3 py-1 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
              >
                Update
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditEntryPopup;
