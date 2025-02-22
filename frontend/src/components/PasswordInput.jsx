import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const PasswordInput = ({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  required = false,
  icon: Icon,
  focused,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative flex items-center mt-4">
      {Icon && (
        <span className="absolute left-3">
          <Icon className="w-6 h-6 text-gray-300" />
        </span>
      )}
      <input
        type={visible ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="block w-full py-3 pl-10 pr-10 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-1 focus:outline-none"
      />
      <label
        className={`absolute left-10 transition-all duration-200 font-normal ${
          focused || value
            ? "top-0 text-xs text-blue-500 bg-white px-1 -translate-y-1/2"
            : "top-1/2 text-gray-400 font-extralight -translate-y-1/2"
        }`}
      >
        {placeholder}
      </label>
      <button
        type="button"
        className="absolute text-sm right-3 flex items-center gap-1 text-gray-500 hover:text-gray-700"
        onClick={() => setVisible(!visible)}
      >
        {visible ? (
          <>
            <RiEyeOffLine size={16} />
            <span>Hide</span>
          </>
        ) : (
          <>
            <RiEyeLine size={16} />
            <span>Show</span>
          </>
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
