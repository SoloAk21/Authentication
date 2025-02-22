import React, { useRef } from "react";

const CodeInput = ({ code, setCode, onPaste }) => {
  const inputRefs = useRef([]);

  // Handles individual input changes
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits (0-9)

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="flex justify-center" onPaste={onPaste}>
      {code.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          type="text"
          maxLength={1}
          className="w-10 h-12 border rounded-md text-center mx-1 text-xl font-bold"
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !code[i] && i > 0) {
              inputRefs.current[i - 1].focus();
            }
          }}
        />
      ))}
    </div>
  );
};

export default CodeInput;
