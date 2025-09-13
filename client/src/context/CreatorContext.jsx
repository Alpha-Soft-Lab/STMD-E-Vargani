import React, { createContext, useContext, useEffect, useState } from "react";
import { showInfo } from "../utils/toastService";

const CreatorContext = createContext();

export const CreatorProvider = ({ children }) => {
  const [creatorName, setCreatorName] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("creatorName");

    if (storedName) {
      setCreatorName(storedName);
      setShowPrompt(false);

      if (!sessionStorage.getItem("welcomeShown")) {
        showInfo(`👋 Welcome back ${storedName}`);
        sessionStorage.setItem("welcomeShown", "true");
      }
    } else {
      setShowPrompt(true);
    }

    const handleStorageChange = () => {
      const updatedName = localStorage.getItem("creatorName");
      if (!updatedName) {
        setCreatorName("");
        setShowPrompt(true);
        sessionStorage.removeItem("welcomeShown");
      } else {
        setCreatorName(updatedName);
        setShowPrompt(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const saveName = (name) => {
    if (!name.trim()) return showError("Name cannot be empty.");

    localStorage.setItem("creatorName", name);
    setCreatorName(name);
    setShowPrompt(false);
    showInfo(`👋 Welcome ${name}`);
  };

  return (
    <CreatorContext.Provider value={{ creatorName, showPrompt, saveName }}>
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreator = () => useContext(CreatorContext);
