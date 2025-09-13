import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/img/LOGO.png";
import config from "../config/appConfig.json";
import AdminPopup from "./Admin/AdminPopup";
import LogoutHandler from "./Admin/AdminLogout";

const Navbar = () => {
  const { isAdmin, authChecked, checkAdmin, logout } = useAuth();
  const [showPopup, setShowPopup] = useState(false);

  const handleLoginSuccess = async () => {
    await checkAdmin();
    setShowPopup(false);
  };

  const handleLogoutSuccess = async () => {
    await logout();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-50/10 backdrop-blur-md shadow-md py-3 rounded-lg">
        <div className="max-xl mx-auto px-4 flex items-center justify-between font-gilroy">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img
                src={logo}
                alt={config.appName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <div className="text-lg font-semibold text-gray-700 select-none">
                {config.appName}
              </div>
              <div className="text-xs text-gray-500">{config.subtitle}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-gray-100 text-gray-700  px-3 py-1 rounded-full text-sm font-medium shadow transition"
            >
              <span className="text-base">👤</span>
              <span>Profile</span>
            </Link>

            {!authChecked ? (
              <div className="text-sm text-gray-400 animate-pulse">Checking...</div>
            ) : isAdmin ? (
              <LogoutHandler onLogoutSuccess={handleLogoutSuccess} />
            ) : (
              <button
                onClick={() => setShowPopup(true)}
                className="bg-blue-600 text-white px-4 py-1.5 rounded-full shadow hover:bg-blue-700 transition text-sm ring-1 ring-blue-500/50 hover:ring-blue-600"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </nav>

      <AdminPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;
