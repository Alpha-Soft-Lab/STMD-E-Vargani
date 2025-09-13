import { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { showError, showSuccess } from "../utils/toastService";

export const useProfileStorage = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("creatorName") || "");
    setRole(localStorage.getItem("creatorRole") || "");
    setAvatar(localStorage.getItem("creatorAvatar") || "");
  }, []);

  const saveProfile = (tempName, tempRole, tempAvatar) => {
    localStorage.setItem("creatorName", tempName);
    localStorage.setItem("creatorRole", tempRole);
    localStorage.setItem("creatorAvatar", tempAvatar);
    setName(tempName);
    setRole(tempRole);
    setAvatar(tempAvatar);
    showSuccess("Profile updated successfully");
  };

  const compressAvatar = async (file, setTempAvatar) => {
    const MAX_FILE_MB = 3;
    const MAX_COMPRESS_MB = 0.6;

    if (!file.type.startsWith("image/")) {
      showError("Only image files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      showError("Max allowed file size is 3MB.");
      return;
    }

    try {
      const options = {
        maxSizeMB: MAX_COMPRESS_MB,
        maxWidthOrHeight: 600,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      const reader = new FileReader();
      reader.onload = () => {
        setTempAvatar(reader.result);
        showSuccess("Profile picture uploaded successfully");
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Compression error:", err);
      showError("Failed to compress image. Please try another one");
    }
  };

  return { name, role, avatar, saveProfile, compressAvatar };
};
