import React, { useEffect } from "react";
import { IoMdCheckmarkCircle, IoMdAlert } from "react-icons/io";

const Alert = ({
  message,
  success,
  onDismiss,
  autoDismiss = true,
  dismissTime = 5000,
}) => {
  // Automatically dismiss the alert after `dismissTime` milliseconds
  useEffect(() => {
    if (autoDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, dismissTime);

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [autoDismiss, dismissTime, onDismiss]);

  return (
    <div
      className={`fixed top-4 right-4 p-3 text-sm rounded-lg flex items-center transition-transform transform-gpu ease-in-out duration-300 animate-slide-in ${
        success
          ? "text-green-800 bg-green-200 border border-green-500"
          : "text-red-800 bg-red-200 border border-red-500"
      }`}
    >
      {success ? (
        <IoMdCheckmarkCircle className="w-5 h-5 mr-2" />
      ) : (
        <IoMdAlert className="w-5 h-5 mr-2" />
      )}
      <span className="mr-10">{message}</span>
      <button
        type="button"
        className="ml-auto hover:underline"
        onClick={onDismiss}
      >
        Dismiss
      </button>
    </div>
  );
};

export default Alert;
