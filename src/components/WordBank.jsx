import React from 'react'

const WordBank = ({ words, selectedZone, onWordClick }) => {
  if (words.length === 0) {
    return (
      <div className="bg-white rounded-sm p-8 mb-6 border border-gray-200">
        <h3 className="mb-4 text-[#1a1a1a] text-base font-normal tracking-wide uppercase">Word Bank</h3>
        <div className="py-8 text-center text-base text-[#1a1a1a] font-light">
          All words placed
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-sm p-8 mb-6 border border-gray-200">
      <h3 className="mb-4 text-[#1a1a1a] text-base font-normal tracking-wide uppercase">
        Word Bank — {words.length} Remaining
      </h3>
      {!selectedZone && (
        <p className="text-gray-400 text-sm mb-4 font-light">
          Click a zone in the diagram first, then click a word to place it.
        </p>
      )}
      <div className="flex flex-wrap gap-2.5">
        {words.map(word => (
          <div
            key={word}
            className="px-3.5 py-2 rounded-sm font-light text-sm cursor-pointer transition-all bg-white text-[#1a1a1a] border border-gray-200 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] select-none"
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
