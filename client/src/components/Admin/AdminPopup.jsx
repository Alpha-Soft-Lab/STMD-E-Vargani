import React, { useState, useEffect } from "react";
import AdminLoginForm from "./AdminLoginForm";
import AdminRegisterForm from "./AdminRegisterForm";
import axiosInstance from "../../services/axios"; 

const AdminPopup = ({ show, onClose, onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [prevTab, setPrevTab] = useState("login");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [tabAnimating, setTabAnimating] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (show) {
      setVisible(true);
      setTimeout(() => setPopupOpen(true), 20);
    } else {
      setPopupOpen(false);
      setTimeout(() => setVisible(false), 300);
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [show]);

  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setTabAnimating(true);
      setPrevTab(activeTab);
      setTimeout(() => {
        setActiveTab(tab);
        setTabAnimating(false);
        setErrorMessage("");
        setSuccessMessage("");
      }, 200);
    }
  };

  const handleLoginChange = (field) => (e) => {
    setLoginData({ ...loginData, [field]: e.target.value });
  };

  const handleRegisterChange = (field) => (e) => {
    setRegisterData({ ...registerData, [field]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axiosInstance.post("/admin/login", loginData);
      setSuccessMessage("Login successful!");
      setTimeout(async () => {
        await onLoginSuccess();
        onClose();
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Invalid credentials");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axiosInstance.post("/admin/register", registerData);
      setSuccessMessage("Registration successful! Please login.");
      setTimeout(() => {
        setActiveTab("login");
        setRegisterData({ username: "", password: "" });
        setSuccessMessage("");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Registration failed.");
    }
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/40 flex justify-end transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-white to-slate-300 w-full max-w-md h-full p-6 overflow-y-auto shadow-2xl
          transform transition-all duration-300
          ${popupOpen ? "translate-x-0 scale-100" : "translate-x-full scale-95"}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 select-none">
            {activeTab === "login" ? "Admin Login" : "Admin Register"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close popup"
          >
            &times;
          </button>
        </div>

        <div className="flex space-x-4 mb-6 select-none">
          <button
            onClick={() => handleTabChange("login")}
            className={`flex-1 text-center py-2 rounded-lg font-medium transition-colors duration-300 ${
              activeTab === "login"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange("register")}
            className={`flex-1 text-center py-2 rounded-lg font-medium transition-colors duration-300 ${
              activeTab === "register"
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold select-text">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="mb-4 text-green-600 font-semibold select-text">{successMessage}</div>
        )}

        <div className="relative min-h-[220px]">
          {activeTab === "login" && !tabAnimating && (
            <AdminLoginForm
              username={loginData.username}
              password={loginData.password}
              onUsernameChange={handleLoginChange("username")}
              onPasswordChange={handleLoginChange("password")}
              onSubmit={handleLoginSubmit}
            />
          )}
          {activeTab === "register" && !tabAnimating && (
            <AdminRegisterForm
              username={registerData.username}
              password={registerData.password}
              onUsernameChange={handleRegisterChange("username")}
              onPasswordChange={handleRegisterChange("password")}
              onSubmit={handleRegisterSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPopup;
