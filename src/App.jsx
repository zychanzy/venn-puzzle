import { useState, useEffect } from 'react'
import './App.css'
import GridDiagram from './components/GridDiagram'
import WordBank from './components/WordBank'
import Controls from './components/Controls'
import { fetchTodaysPuzzle } from './utils/dateUtils'

function App() {
  const [puzzle, setPuzzle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [placements, setPlacements] = useState({}) // { zone: [words] }
  const [selectedZone, setSelectedZone] = useState(null)
  const [showThemes, setShowThemes] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [resultMessage, setResultMessage] = useState('')

  // Load today's puzzle on mount
  useEffect(() => {
    const loadPuzzle = async () => {
      try {
        setLoading(true)
        const todaysPuzzle = await fetchTodaysPuzzle()
        setPuzzle(todaysPuzzle)
        setError(null)
      } catch (err) {
        setError('Could not load today\'s puzzle. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadPuzzle()
  }, [])

  // Get all placed words (now 1 per zone instead of arrays)
  const placedWords = puzzle ? Object.values(placements).filter(w => w !== null) : []

  // Get available words (not yet placed)
  const availableWords = puzzle ? puzzle.words.filter(word => !placedWords.includes(word)) : []

  // Handle word click from word bank
  const handleWordClick = (word) => {
    if (!selectedZone) {
      alert('Please select a zone first!')
      return
    }

    // If zone already has a word, return it to the word bank first
    setPlacements(prev => ({
      ...prev,
      [selectedZone]: word
    }))
  }

  // Handle placed word click (remove it)
  const handlePlacedWordClick = (word, zone) => {
    setPlacements(prev => ({
      ...prev,
      [zone]: null
    }))
  }

  // Handle zone selection
  const handleZoneClick = (zone) => {
    setSelectedZone(selectedZone === zone ? null : zone)
  }

  // Reset puzzle
  const handleReset = () => {
    setPlacements({})
    setSelectedZone(null)
    setShowThemes(false)
    setShowSolution(false)
    setResultMessage('')
  }

  // Check solution
  const handleCheckSolution = () => {
    const isCorrect = checkSolution(placements, puzzle.solution)

    if (isCorrect) {
      setResultMessage('Correct! You solved the puzzle.')
      setShowThemes(true)
    } else {
      setResultMessage('Not quite right. Keep trying.')
    }
  }

  // Show/hide solution
  const handleToggleSolution = () => {
    if (!showSolution) {
      setPlacements(puzzle.solution)
      setShowThemes(true)
      setResultMessage('Solution revealed')
    }
    setShowSolution(!showSolution)
  }

  // Handle loading state
  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto p-5 min-h-screen">
        <header className="text-center text-[#1a1a1a] mb-10 pt-10">
          <h1 className="text-4xl mb-3 font-light tracking-tight">4-Theme Grid Puzzle</h1>
          <p className="text-base text-gray-600 font-light leading-relaxed">Loading today's puzzle...</p>
        </header>
      </div>
    )
  }

  // Handle error state
  if (error) {
    return (
      <div className="max-w-[1200px] mx-auto p-5 min-h-screen">
        <header className="text-center text-[#1a1a1a] mb-10 pt-10">
          <h1 className="text-4xl mb-3 font-light tracking-tight">4-Theme Grid Puzzle</h1>
          <p className="text-base text-red-600 font-light leading-relaxed">{error}</p>
        </header>
      </div>
    )
  }

  // Handle missing puzzle
  if (!puzzle) {
    return (
      <div className="max-w-[1200px] mx-auto p-5 min-h-screen">
        <header className="text-center text-[#1a1a1a] mb-10 pt-10">
          <h1 className="text-4xl mb-3 font-light tracking-tight">4-Theme Grid Puzzle</h1>
          <p className="text-base text-gray-600 font-light leading-relaxed">No puzzle available for today.</p>
        </header>
      </div>
    )
  }

  return (
    <div className="max-w-[1200px] mx-auto p-5 min-h-screen">
      <header className="text-center text-[#1a1a1a] mb-10 pt-10">
        <h1 className="text-4xl mb-3 font-light tracking-tight">4-Theme Grid Puzzle</h1>
        <p className="text-base text-gray-600 font-light leading-relaxed">
          Deduce the four hidden themes and place all 9 words correctly.
          {!showThemes && ' Click a zone to select it, then click a word to place it.'}
        </p>
      </header>

      {resultMessage && (
        <div className={`px-6 py-4 rounded text-center text-base font-normal border mb-6 ${
          resultMessage.includes('Correct!')
            ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
            : 'bg-white text-gray-600 border-gray-200'
        }`}>
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
  )
}

// Solution checker function for 4 themes
function checkSolution(placements, correctSolution) {
  // Check if all 9 words are placed
  const placedCount = Object.values(placements).filter(w => w !== null).length
  if (placedCount !== 9) return false

  // Generate all 24 permutations of 4 themes (4! = 24)
  const permutations = [
    [1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2],
    [1, 4, 2, 3], [1, 4, 3, 2], [2, 1, 3, 4], [2, 1, 4, 3],
    [2, 3, 1, 4], [2, 3, 4, 1], [2, 4, 1, 3], [2, 4, 3, 1],
    [3, 1, 2, 4], [3, 1, 4, 2], [3, 2, 1, 4], [3, 2, 4, 1],
    [3, 4, 1, 2], [3, 4, 2, 1], [4, 1, 2, 3], [4, 1, 3, 2],
    [4, 2, 1, 3], [4, 2, 3, 1], [4, 3, 1, 2], [4, 3, 2, 1]
  ]

  // Try each permutation
  for (const perm of permutations) {
    let isMatch = true

    // Map zones according to this permutation
    const mappedSolution = {}
    for (const [zone, word] of Object.entries(correctSolution)) {
      let mappedZone = zone

      // Handle single theme zones (e.g., '1', '2', '3', '4')
      if (zone.length === 1) {
        const themeNum = parseInt(zone)
        mappedZone = perm[themeNum - 1].toString()
      }
      // Handle two-theme zones (e.g., '12', '13', '24', '34')
      else if (zone.length === 2) {
        const themes = zone.split('').map(Number)
        const mappedThemes = themes.map(t => perm[t - 1]).sort()
        mappedZone = mappedThemes.join('')
      }
      // Handle four-theme center zone ('1234')
      else if (zone === '1234') {
        mappedZone = '1234' // All four always maps to all four
      }

      mappedSolution[mappedZone] = word
    }

    // Compare this permutation with player's placements
    for (const [zone, word] of Object.entries(mappedSolution)) {
      const playerWord = placements[zone]
      if (playerWord !== word) {
        isMatch = false
        break
      }
    }

    if (isMatch) return true
  }

  return false
}

export default App
