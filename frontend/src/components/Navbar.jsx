import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Sydney Events
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition"
          >
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
