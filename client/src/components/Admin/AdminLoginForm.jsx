import React, { useState } from "react";

const AdminLoginForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
        required
        className="w-full px-4 py-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
      />
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          required
          className="w-full px-4 py-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition pr-10"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-blue-600 transition"
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.964 9.964 0 012.948-4.58M9.88 9.88a3 3 0 104.24 4.24M6.1 6.1l11.8 11.8"
              />
            </svg>
          )}
        </span>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
};

export default AdminLoginForm;
