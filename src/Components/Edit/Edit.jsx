import React, { useState } from "react";
import Add from "./Add/Add";
import Update from "./Update/Update";

const Edit = () => {
  const [mode, setMode] = useState("add"); // default is Add

  return (
    <div className="mx-auto p-6 w-full h-full top-0">
      {/* Slider Toggle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative w-48 bg-gray-300 rounded-full flex">
          <button
            onClick={() => setMode("add")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              mode === "add"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Add
          </button>
          <button
            onClick={() => setMode("update")}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
              mode === "update"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Update
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {mode === "add" ? <Add /> : <Update />}
    </div>
  );
};

export default Edit;
