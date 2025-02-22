import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";

const GoogleAuthButton = ({ text, isLoading, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition border rounded-lg hover:bg-gray-50 w-full ${
        isLoading || disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
    >
      <FcGoogle />
      {isLoading ? (
        <>
          <FaSpinner className="animate-spin mx-2" />
          <span>{text}...</span>
        </>
      ) : (
        <span className="mx-2">{text}</span>
      )}
    </button>
  );
};

export default GoogleAuthButton;
