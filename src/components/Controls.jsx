import React from "react";

const Controls = ({
  onCheckSolution,
  onReset,
  onToggleSolution,
  showSolution,
  allWordsPlaced,
}) => {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      <button
        className={`
          px-6 py-3 border rounded-sm text-sm font-normal cursor-pointer transition-all
          uppercase tracking-wide
          ${
            allWordsPlaced
              ? "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700"
              : "opacity-30 cursor-not-allowed bg-emerald-600 text-white border-emerald-600"
          }
        `}
        onClick={onCheckSolution}
        disabled={!allWordsPlaced}
        title={
          !allWordsPlaced
            ? "Place all words first"
            : "Check if your solution is correct"
        }
      >
        Check Solution
      </button>

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
