import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, cardVariants } from "../motion/Allpopupmotion";
import { showSuccess, showError } from "../../utils/toastService";
import config from "../../config/appConfig.json";
import jsPDF from "jspdf";
import ReceiptCanvas from "./ReceiptCanvas";

const ReceiptPopup = ({ isOpen, entry, onClose }) => {
  const [canvasRef, setCanvasRef] = useState(null);

  if (!isOpen || !entry) return null;

  const handleDownload = () => {
    try {
      if (!canvasRef?.current) return;

      const imgData = canvasRef.current.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvasRef.current.width, canvasRef.current.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvasRef.current.width, canvasRef.current.height);
      pdf.save(`${config.appName} Receipt- ${entry.name}.pdf`);

      showSuccess("Receipt PDF downloaded successfully!");
    } catch (error) {
      showError("Failed to download receipt PDF.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-gradient-to-br from-white to-slate-200 rounded-lg shadow-lg overflow-auto
                      w-full max-w-[650px] max-h-[90vh] 
                      p-6
                      sm:p-8"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ReceiptCanvas
              entry={entry}
              isOpen={isOpen}
              onReady={(ref) => setCanvasRef(ref)}
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-3 py-2 rounded-full text-sm hover:bg-green-700 transition"
              >
                Download PDF
              </button>
              <button
                onClick={onClose}
                className="bg-slate-500 text-white px-3 py-2 rounded-full text-sm hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReceiptPopup;
