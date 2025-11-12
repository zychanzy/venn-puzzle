import React from "react";

const Controls = ({
  onReset,
  onToggleSolution,
  showSolution,
}) => {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      <button
        className="px-6 py-3 border border-gray-300 rounded-sm text-sm font-normal cursor-pointer transition-all bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 uppercase tracking-wide"
        onClick={onReset}
      >
        Reset
      </button>

      <button
        className="px-6 py-3 border border-blue-600 rounded-sm text-sm font-normal cursor-pointer transition-all bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 uppercase tracking-wide"
        onClick={onToggleSolution}
      >
        {showSolution ? "Hide Solution" : "Show Solution"}
      </button>
    </div>
  );
};

export default Controls;
