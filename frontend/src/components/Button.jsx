import React from "react";
import Spinner from "./Spinner";

const Button = ({ children, onClick, disabled = false, loading = false }) => {
  return (
    <button
      type="submit"
      className={`w-full text-white my-4  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
        loading || disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-400"
      } focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
