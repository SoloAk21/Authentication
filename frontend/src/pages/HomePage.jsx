import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-800">
                AuthApp
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Signup
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 hover:text-blue-500 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/login"
                className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
              >
                Signup
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="flex-grow bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Welcome to AuthApp
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Securely login or sign up to access your account.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-md text-lg font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-3 text-blue-500 border border-blue-500 hover:bg-blue-100 rounded-md text-lg font-medium"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} SoloAk AuthApp. All rights
            reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
