import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreator } from "../../context/CreatorContext";
import config from "../../config/appConfig.json";
import { backdropVariants, cardVariants } from "../motion/Allpopupmotion";
import logo from "../../assets/img/LOGO.png";
import Footer from "./Footer";

const NamePrompt = () => {
  const { showPrompt, saveName } = useCreator();
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (showPrompt) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showPrompt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) saveName(trimmed);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gradient-to-br from-white to-slate-300 w-full max-w-md h-full sm:h-auto sm:rounded-2xl p-6 overflow-y-auto shadow-2xl transform transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="text-center mb-4">
                <img
                  src={logo}
                  alt="STMD Logo"
                  className="mx-auto mb-2 w-16 h-16 object-contain"
                />

                <h2 className="text-xl font-semibold text-gray-800">
                  Welcome to {config.appName} 👋
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Please enter your name to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-full border bg-slate-50 border-gray-300 focus:outline-none focus:ring-1 ring-blue-400 transition duration-200 ease-in-out text-center text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-full transition"
                >
                  Continue
                </button>
              </form>
            </div>
            <Footer />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NamePrompt;
