import { useState, useEffect } from "react";
import GridDiagram from "./components/GridDiagram";
import WordBank from "./components/WordBank";
import Controls from "./components/Controls";
import { fetchTodaysPuzzle } from "./utils/dateUtils";

function App() {
  const [puzzle, setPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [placements, setPlacements] = useState({}); // { zone: [words] }
  const [selectedZone, setSelectedZone] = useState(null);
  const [showThemes, setShowThemes] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // Load today's puzzle on mount
  useEffect(() => {
    const loadPuzzle = async () => {
      try {
        setLoading(true);
        const todaysPuzzle = await fetchTodaysPuzzle();
        setPuzzle(todaysPuzzle);
        setError(null);
      } catch (err) {
        setError("Could not load today's puzzle. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPuzzle();
  }, []);

  // Get all placed words (each zone can have multiple words)
  const placedWords = puzzle
    ? Object.values(placements)
        .flat()
        .filter((w) => w !== null)
    : [];

  // Get available words (not yet placed)
  const availableWords = puzzle
    ? puzzle.words.filter((word) => !placedWords.includes(word))
    : [];

  // Handle word click from word bank
  const handleWordClick = (word) => {
    if (!selectedZone) {
      alert("Please select a zone first!");
      return;
    }

    // Add word to the zone's array (max 2 words per zone)
    setPlacements((prev) => {
      const currentWords = prev[selectedZone] || [];
      if (currentWords.length >= 2) {
        alert("This zone already has 2 words!");
        return prev;
      }
      return {
        ...prev,
        [selectedZone]: [...currentWords, word],
      };
    });
  };

  // Handle placed word click (remove it)
  const handlePlacedWordClick = (word, zone) => {
    setPlacements((prev) => {
      const currentWords = prev[zone] || [];
      return {
        ...prev,
        [zone]: currentWords.filter((w) => w !== word),
      };
    });
  };

  // Handle zone selection
  const handleZoneClick = (zone) => {
    setSelectedZone(selectedZone === zone ? null : zone);
  };

  // Reset puzzle
  const handleReset = () => {
    setPlacements({});
    setSelectedZone(null);
    setShowThemes(false);
    setShowSolution(false);
    setResultMessage("");
  };

  // Check solution
  const handleCheckSolution = () => {
    const isCorrect = checkSolution(placements, puzzle.solution);

    if (isCorrect) {
      setResultMessage("Correct! You solved the puzzle.");
      setShowThemes(true);
    } else {
      setResultMessage("Not quite right. Keep trying.");
    }
  };

  // Show/hide solution
  const handleToggleSolution = () => {
    if (!showSolution) {
      setPlacements(puzzle.solution);
      setShowThemes(true);
      setResultMessage("Solution revealed");
    }
    setShowSolution(!showSolution);
  };

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5">
        <div className="max-w-[1200px] w-full">
          <header className="text-center text-[#1a1a1a]">
            <h1 className="text-4xl mb-3 font-light tracking-tight">
              3-Theme Triangle Puzzle
            </h1>
            <p className="text-base text-gray-600 font-light leading-relaxed">
              Loading today's puzzle...
            </p>
          </header>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5">
        <div className="max-w-[1200px] w-full">
          <header className="text-center text-[#1a1a1a]">
            <h1 className="text-4xl mb-3 font-light tracking-tight">
              3-Theme Triangle Puzzle
            </h1>
            <p className="text-base text-red-600 font-light leading-relaxed">
              {error}
            </p>
          </header>
        </div>
      </div>
    );
  }

  // Handle missing puzzle
  if (!puzzle) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-5">
        <div className="max-w-[1200px] w-full">
          <header className="text-center text-[#1a1a1a]">
            <h1 className="text-4xl mb-3 font-light tracking-tight">
              3-Theme Triangle Puzzle
            </h1>
            <p className="text-base text-gray-600 font-light leading-relaxed">
              No puzzle available for today.
            </p>
          </header>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-5 flex flex-col items-center justify-center">
      <div className="max-w-[1200px] w-full">
        <header className="text-center text-[#1a1a1a] mb-8">
          <h1 className="text-4xl mb-3 font-light tracking-tight">
            3-Theme Triangle Puzzle
          </h1>
          <p className="text-base text-gray-600 font-light leading-relaxed">
            Deduce the three hidden themes and place all 14 words correctly.
            {!showThemes &&
              " Click a zone to select it, then click a word to place it. Each zone needs 2 words."}
          </p>
        </header>

        {resultMessage && (
          <div
            className={`px-6 py-4 rounded text-center text-base font-normal border mb-6 ${
              resultMessage.includes("Correct!")
                ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                : "bg-white text-gray-600 border-gray-200"
            }`}
          >
            {resultMessage}
          </div>
        )}

        <GridDiagram
          circles={puzzle.circles}
          placements={placements}
          selectedZone={selectedZone}
          showThemes={showThemes}
          onZoneClick={handleZoneClick}
          onWordClick={handlePlacedWordClick}
        />

        <WordBank
          words={availableWords}
          selectedZone={selectedZone}
          onWordClick={handleWordClick}
        />

        <Controls
          onCheckSolution={handleCheckSolution}
          onReset={handleReset}
          onToggleSolution={handleToggleSolution}
          showSolution={showSolution}
          allWordsPlaced={availableWords.length === 0}
        />
      </div>
    </div>
  );
}

// Solution checker function for 3 themes
function checkSolution(placements, correctSolution) {
  // Check if all 14 words are placed (7 zones × 2 words each)
  const placedCount = Object.values(placements)
    .flat()
    .filter((w) => w !== null).length;
  if (placedCount !== 14) return false;

  // Generate all 6 permutations of 3 themes (3! = 6)
  const permutations = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ];

  // Try each permutation
  for (const perm of permutations) {
    let isMatch = true;

    // Map zones according to this permutation
    const mappedSolution = {};
    for (const [zone, words] of Object.entries(correctSolution)) {
      let mappedZone = zone;

      // Handle single theme zones (e.g., '1', '2', '3')
      if (zone.length === 1) {
        const themeNum = parseInt(zone);
        mappedZone = perm[themeNum - 1].toString();
      }
      // Handle two-theme zones (e.g., '12', '13', '23')
      else if (zone.length === 2) {
        const themes = zone.split("").map(Number);
        const mappedThemes = themes.map((t) => perm[t - 1]).sort();
        mappedZone = mappedThemes.join("");
      }
      // Handle three-theme center zone ('123')
      else if (zone === "123") {
        mappedZone = "123"; // All three always maps to all three
      }

      mappedSolution[mappedZone] = words;
    }

    // Compare this permutation with player's placements
    for (const [zone, words] of Object.entries(mappedSolution)) {
      const playerWords = placements[zone] || [];
      // Check if both arrays have the same words (order doesn't matter)
      if (
        playerWords.length !== words.length ||
        !words.every((w) => playerWords.includes(w))
      ) {
        isMatch = false;
        break;
      }
    }

    if (isMatch) return true;
  }

  return false;
}

export default App;
