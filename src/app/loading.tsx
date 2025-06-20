// loading.tsx
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <svg
          className="mb-4 h-10 w-10 animate-spin text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-lg font-medium text-green-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
