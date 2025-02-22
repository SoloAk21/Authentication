// src/components/Spinner.js
import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner = () => (
  <div className="flex items-center justify-center">
    <FaSpinner className="animate-spin text-xl text-blue-500" />
  </div>
);

export default Spinner;
