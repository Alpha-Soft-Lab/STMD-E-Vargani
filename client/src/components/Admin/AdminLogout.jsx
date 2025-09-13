import React from "react";
import axios from "../../services/axios";

const LogoutHandler = ({ onLogoutSuccess }) => {
  const handleLogout = async () => {
    try {
      const res = await axios.post("/admin/logout");

      if (res.status === 200) {
        onLogoutSuccess();
      } else {
        console.warn("Logout response not 200:", res.status);
      }
    } catch (err) {
      console.error("Logout failed:", err.response?.data?.error || err.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-1.5 rounded-full shadow hover:bg-red-700 transition text-sm"
    >
      Logout
    </button>
  );
};

export default LogoutHandler;
