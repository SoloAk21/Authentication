import React from "react";

const InputField = ({
  type = "text",
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
  return (
    <div className="relative flex items-center mt-4">
      {Icon && (
        <span className="absolute left-3">
          <Icon className="w-6 h-6 text-gray-300" />
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="block w-full py-3 pl-10 pr-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-1 focus:outline-none"
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
    </div>
  );
};

export default InputField;
