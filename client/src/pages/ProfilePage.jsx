import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import defaultAvatar from "../assets/img/Shree Ram.jpg";
import { useProfileStorage } from "../hooks/useProfileStorage";
import EditProfileModal from "../components/User/EditProfileModal";

const ProfilePage = () => {
  const { name, role, avatar, saveProfile, compressAvatar } = useProfileStorage();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleAvatarUpload = (e, setTempAvatar) => {
    const file = e.target.files[0];
    if (!file) return;
    compressAvatar(file, setTempAvatar);
  };

  const handleSave = (tempName, tempRole, tempAvatar) => {
    saveProfile(tempName, tempRole, tempAvatar);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-300 px-4 pt-10">
      <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
        <img
          src={avatar || defaultAvatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full border object-cover shadow"
        />
        <h2 className="text-2xl font-semibold text-gray-700">{name || "Not set"}</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Role:</span> {role || "Not set"}
        </p>

        <button
          onClick={openModal}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <EditProfileModal
            name={name}
            role={role}
            avatar={avatar}
            onClose={closeModal}
            onSave={handleSave}
            onAvatarUpload={handleAvatarUpload}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
