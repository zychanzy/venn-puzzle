import React from 'react'

const WordBank = ({ words, selectedZone, onWordClick }) => {
  if (words.length === 0) {
    return (
      <div className="word-bank">
        <h3>Word Bank</h3>
        <div className="word-bank-empty">
          ✓ All words placed!
        </div>
      </div>
    )
  }

  return (
    <div className="word-bank">
      <h3>Word Bank ({words.length} remaining)</h3>
      {!selectedZone && (
        <p className="hint">Click a zone in the diagram first, then click a word to place it.</p>
      )}
      <div className="word-list">
        {words.map(word => (
          <div
            key={word}
            className="word-chip available"
            onClick={() => onWordClick(word)}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WordBank
