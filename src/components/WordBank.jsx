const WordBank = ({ words, onWordClick }) => {
  const handleDragStart = (e, word) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', word);
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
  };

  return (
    <div className="bg-white rounded-sm p-8 mb-6">
      <div className="flex flex-wrap gap-2.5">
        {words.map((word) => (
          <div
            key={word}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, word)}
            onDragEnd={handleDragEnd}
            className="px-3.5 py-2 rounded-sm font-light text-sm cursor-grab active:cursor-grabbing transition-all bg-white text-[#1a1a1a] border border-gray-200 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] select-none"
            onClick={() => onWordClick(word)}
          >
            {word}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordBank;
