import React from "react";
import { useCreator } from "../../context/CreatorContext";
import NamePopup from "./NamePopup";

const NameWrapper = ({ children }) => {
  const { creatorName, showPrompt, saveName } = useCreator();

  return (
    <>
      {showPrompt && (
        <NamePopup
          onNameSaved={(name) => {
            saveName(name);
          }}
        />
      )}
      {creatorName && children}
    </>
  );
};

export default NameWrapper;
