import { useState, useEffect } from "react";
import GridDiagram from "./components/GridDiagram";
import WordBank from "./components/WordBank";
import Controls from "./components/Controls";
import Modal from "./components/Modal";
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
  const [showModal, setShowModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  // Auto-check solution when all words are placed
  useEffect(() => {
    if (!puzzle) return;

    const placedCount = Object.values(placements)
      .flat()
      .filter((w) => w !== null).length;

    // Check if all 14 words are placed
    if (placedCount === 14) {
      const isCorrect = checkSolution(placements, puzzle.solution);

      if (isCorrect) {
        setModalSuccess(true);
        setModalMessage(
          "You've successfully solved the puzzle! All words are in their correct zones."
        );
        setShowModal(true);
        setShowThemes(true);
        setResultMessage("Correct! You solved the puzzle.");
      } else {
        setModalSuccess(false);
        setModalMessage(
          "Not quite right. Some words are in the wrong zones. Try rearranging them!"
        );
        setShowModal(true);
        setResultMessage("Not quite right. Keep trying.");
      }
    }
  }, [placements, puzzle]);

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

  // Handle word drop from drag and drop
  const handleWordDrop = (word, zoneId, sourceZone) => {
    setPlacements((prev) => {
      // If dragging from another zone, remove from source first
      let newPlacements = { ...prev };

      if (sourceZone) {
        const sourceWords = newPlacements[sourceZone] || [];
        newPlacements[sourceZone] = sourceWords.filter((w) => w !== word);
      }

      // Add to target zone (max 2 words)
      const currentWords = newPlacements[zoneId] || [];
      if (currentWords.length >= 2) {
        return prev; // Don't allow drop if zone is full
      }

      newPlacements[zoneId] = [...currentWords, word];
      return newPlacements;
    });
  };

  // Handle word drop back to word bank
  const handleWordReturnToBank = (word, sourceZone) => {
    if (sourceZone) {
      setPlacements((prev) => {
        const sourceWords = prev[sourceZone] || [];
        return {
          ...prev,
          [sourceZone]: sourceWords.filter((w) => w !== word),
        };
      });
    }
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
    // Select the zone when removing a word
    setSelectedZone(zone);
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
    setShowModal(false);
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
            <h1 className="text-4xl mb-3 font-light tracking-tight">Trisect</h1>
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
            <h1 className="text-4xl mb-3 font-light tracking-tight">Trisect</h1>
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
          <h1 className="text-4xl mb-3 font-light tracking-tight">Trisect</h1>
          <p className="text-base text-gray-600 font-light leading-relaxed">
            Discover three hidden themes and sort words by how many they match!
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
          onWordDrop={handleWordDrop}
        />

        <WordBank
          words={availableWords}
          allWords={puzzle.words}
          selectedZone={selectedZone}
          onWordClick={handleWordClick}
          onWordReturn={handleWordReturnToBank}
        />

        <Controls
          onReset={handleReset}
          onToggleSolution={handleToggleSolution}
          showSolution={showSolution}
        />

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          isSuccess={modalSuccess}
          message={modalMessage}
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
