import React from 'react'

const Controls = ({
  onCheckSolution,
  onReset,
  onToggleSolution,
  showSolution,
  allWordsPlaced
}) => {
  return (
    <div className="controls">
      <button
        className="btn btn-primary"
        onClick={onCheckSolution}
        disabled={!allWordsPlaced}
        title={!allWordsPlaced ? 'Place all words first' : 'Check if your solution is correct'}
      >
        Check Solution
      </button>

      <button
        className="btn btn-secondary"
        onClick={onReset}
      >
        Reset
      </button>

      <button
        className="btn btn-hint"
        onClick={onToggleSolution}
      >
        {showSolution ? 'Hide Solution' : 'Show Solution'}
      </button>
    </div>
  )
}

export default Controls
