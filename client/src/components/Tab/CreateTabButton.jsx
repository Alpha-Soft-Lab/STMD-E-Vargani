import { useState } from "react";
import { motion } from "framer-motion";
import CreateTabModal from "../motion/TabCreatepopup";
import { createTab } from "../Tab/TabCreate"; 
import { showSuccess, showError } from "../../utils/toastService";

const CreateTabButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [tabName, setTabName] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [hovered, setHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createTab({ tabName, date });
      showSuccess("Tab created successfully");
      setShowModal(false);
      setTabName("");
      setDate(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
      });
    } catch (error) {
      showError("Failed to create tab. Please try again.");
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-2 select-none">
        {hovered && (
          <div className="mb-1 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md select-none">
            Create Tab
          </div>
        )}
        <motion.button
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setShowModal(true)}
          whileHover={{
            rotate: [0, 10, -10, 5, 0],
            boxShadow: "0 0 12px rgba(59, 130, 246, 0.7)",
          }}
          whileTap={{ x: -8 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="bg-blue-600 text-white text-3xl w-14 h-14 rounded-full shadow-xl hover:bg-blue-700 flex items-center justify-center select-none"
        >
          +
        </motion.button>
      </div>

      <CreateTabModal
        showModal={showModal}
        setShowModal={setShowModal}
        tabName={tabName}
        setTabName={setTabName}
        date={date}
        setDate={setDate}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default CreateTabButton;
