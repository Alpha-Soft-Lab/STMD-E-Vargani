import React from "react";

const AdminRegisterForm = ({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={onUsernameChange}
        required
        className="w-full px-4 py-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}
        required
        className="w-full px-4 py-2 bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 transition"
      />
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
      >
        Register
      </button>
    </form>
  );
};

export default AdminRegisterForm;
