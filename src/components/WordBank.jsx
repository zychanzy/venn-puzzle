const WordBank = ({ words, allWords, onWordClick, onWordReturn }) => {
  const handleDragStart = (e, word) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', word);
    e.target.classList.add('opacity-50');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('opacity-50');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    if (e.currentTarget.classList.contains('word-bank-container')) {
      e.currentTarget.classList.add('ring-2', 'ring-green-400');
    }
  };

  const handleDragLeave = (e) => {
    if (e.currentTarget.classList.contains('word-bank-container')) {
      e.currentTarget.classList.remove('ring-2', 'ring-green-400');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('ring-2', 'ring-green-400');

    const word = e.dataTransfer.getData('text/plain');
    const sourceZone = e.dataTransfer.getData('sourceZone');

    if (word && sourceZone && onWordReturn) {
      onWordReturn(word, sourceZone);
    }
  };

  return (
    <div className="bg-white rounded-sm p-8 mb-6">
      <div
        className="word-bank-container flex flex-wrap gap-2.5 transition-all rounded-sm max-w-[800px] mx-auto"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {allWords.map((word) => {
          const isAvailable = words.includes(word);

          return isAvailable ? (
            <div
              key={word}
              draggable="true"
              onDragStart={(e) => handleDragStart(e, word)}
              onDragEnd={handleDragEnd}
              className="px-3.5 py-2 rounded-sm font-light text-base sm:text-lg cursor-grab active:cursor-grabbing transition-all bg-white text-[#1a1a1a] border border-gray-200 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] select-none"
              onClick={() => onWordClick(word)}
            >
              {word}
            </div>
          ) : (
            <div
              key={word}
              className="px-3.5 py-2 rounded-sm font-light text-base sm:text-lg bg-gray-100 text-gray-400 border border-gray-200 border-dashed select-none"
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordBank;
