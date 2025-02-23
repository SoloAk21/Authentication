import React from "react";

const FormContainer = ({ children, onSubmit, title, subtitle }) => {
  return (
    <section class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 py-4 shadow-lg">
        <h1 className="text-2xl font-bold text-white bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 animate-text">
          SoloAk Auth
        </h1>
      </div>
      <div className="container flex items-center justify-center mt-16 px-6 mx-auto">
        <form
          className="w-full max-w-md border p-6 rounded-lg shadow-lg"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </div>
          {children}
        </form>
      </div>
    </section>
  );
};

export default FormContainer;
