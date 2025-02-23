"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-red-600">Something went wrong</h2>
        <p className="text-gray-700 mt-2">{error.message}</p>

        <button
          onClick={() => reset()}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
