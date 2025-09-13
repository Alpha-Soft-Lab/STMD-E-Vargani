import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { backdropVariants, cardVariants } from "../../components/motion/Allpopupmotion";
import { showError } from "../../utils/toastService";

const EditProfileModal = ({ name, role, avatar, onClose, onSave, onAvatarUpload }) => {
  const [tempName, setTempName] = useState(name);
  const [tempRole, setTempRole] = useState(role);
  const [tempAvatar, setTempAvatar] = useState(avatar);

  useEffect(() => {
    setTempName(name);
    setTempRole(role);
    setTempAvatar(avatar);
  }, [name, role, avatar]);

  const handleSaveClick = () => {
    if (!tempName.trim()) return showError("Name cannot be empty.");
    onSave(tempName, tempRole, tempAvatar);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl p-6 w-full max-w-sm space-y-4"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h3 className="text-lg font-semibold text-gray-800">Update Details</h3>

        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          placeholder="Enter name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        />

        <select
          value={tempRole}
          onChange={(e) => setTempRole(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
        >
          <option value="">Select Role</option>
          <option value="President (अध्यक्ष)">President (अध्यक्ष)</option>
          <option value="Vice President (उपाध्यक्ष)">Vice President (उपाध्यक्ष)</option>
          <option value="Secretary (सचिव)">Secretary (सचिव)</option>
          <option value="Vice Secretary (उपसचिव)">Vice Secretary (उपसचिव)</option>
          <option value="Treasurer (खजिनदार)">Treasurer (खजिनदार)</option>
          <option value="Member (सदस्य)">Member (सदस्य)</option>
          <option value="Volunteer (स्वयंसेवक)">Volunteer (स्वयंसेवक)</option>
        </select>

        <label className="block text-sm font-medium text-gray-700">
          <span className="block mb-1">Profile Picture</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onAvatarUpload(e, setTempAvatar)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>

        {tempAvatar && (
          <img
            src={tempAvatar}
            alt="Preview"
            className="w-20 h-20 rounded-full object-cover mx-auto border"
          />
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditProfileModal;
