import React from 'react'

const Controls = ({
  onCheckSolution,
  onReset,
  onToggleSolution,
  showSolution,
  allWordsPlaced
}) => {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      <button
        className={`
          px-6 py-3 border rounded-sm text-sm font-normal cursor-pointer transition-all
          uppercase tracking-wide
          ${allWordsPlaced
            ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] hover:bg-[#333] hover:border-[#333]'
            : 'opacity-30 cursor-not-allowed bg-[#1a1a1a] text-white border-[#1a1a1a]'
          }
        `}
        onClick={onCheckSolution}
        disabled={!allWordsPlaced}
        title={!allWordsPlaced ? 'Place all words first' : 'Check if your solution is correct'}
      >
        Check Solution
      </button>

      <button
        className="px-6 py-3 border border-gray-200 rounded-sm text-sm font-normal cursor-pointer transition-all bg-white text-[#1a1a1a] hover:bg-gray-100 hover:border-[#1a1a1a] uppercase tracking-wide"
        onClick={onReset}
      >
        Reset
      </button>

      <button
        className="px-6 py-3 border border-gray-200 rounded-sm text-sm font-normal cursor-pointer transition-all bg-white text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] uppercase tracking-wide"
        onClick={onToggleSolution}
      >
        {showSolution ? 'Hide Solution' : 'Show Solution'}
      </button>
    </div>
  )
}

export default Controls
