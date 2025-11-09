import { useState } from 'react'
import './App.css'
import VennDiagram from './components/VennDiagram'
import WordBank from './components/WordBank'
import Controls from './components/Controls'
import { samplePuzzle } from './data/puzzles'

function App() {
  const [puzzle] = useState(samplePuzzle)
  const [placements, setPlacements] = useState({}) // { zone: [words] }
  const [selectedZone, setSelectedZone] = useState(null)
  const [showThemes, setShowThemes] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [resultMessage, setResultMessage] = useState('')

  // Get all placed words
  const placedWords = Object.values(placements).flat()

  // Get available words (not yet placed)
  const availableWords = puzzle.words.filter(word => !placedWords.includes(word))

  // Handle word click from word bank
  const handleWordClick = (word) => {
    if (!selectedZone) {
      alert('Please select a zone first!')
      return
    }

    // Add word to selected zone
    setPlacements(prev => ({
      ...prev,
      [selectedZone]: [...(prev[selectedZone] || []), word]
    }))
  }

  // Handle placed word click (remove it)
  const handlePlacedWordClick = (word, zone) => {
    setPlacements(prev => ({
      ...prev,
      [zone]: prev[zone].filter(w => w !== word)
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
    // Import and use solution checker
    const isCorrect = checkSolution(placements, puzzle.solution)

    if (isCorrect) {
      setResultMessage('🎉 Congratulations! You solved the puzzle!')
      setShowThemes(true)
    } else {
      setResultMessage('❌ Not quite right. Keep trying!')
    }
  }

  // Show/hide solution
  const handleToggleSolution = () => {
    if (!showSolution) {
      setPlacements(puzzle.solution)
      setShowThemes(true)
      setResultMessage('💡 Solution revealed')
    }
    setShowSolution(!showSolution)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Triple Venn Puzzle</h1>
        <p className="instructions">
          Place all 14 words into the correct zones of the Venn diagram.
          {!showThemes && ' Can you figure out the three hidden themes?'}
        </p>
      </header>

      {resultMessage && (
        <div className={`result-message ${resultMessage.includes('🎉') ? 'success' : 'info'}`}>
          {resultMessage}
        </div>
      )}

      <VennDiagram
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

// Solution checker function
function checkSolution(placements, correctSolution) {
  // Check if all 14 words are placed
  const placedCount = Object.values(placements).flat().length
  if (placedCount !== 14) return false

  // Normalize zone keys (e.g., "1-2" and "2-1" are the same)
  const normalizeZone = (zone) => {
    const parts = zone.split('-').map(Number).filter(n => !isNaN(n)).sort()
    if (parts.length === 0) return zone // 'center' or 'only-X'
    if (zone.startsWith('only-')) return zone
    if (zone === 'center') return zone
    return parts.join('-')
  }

  // Generate all 6 permutations of circle assignments
  const permutations = [
    [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]
  ]

  // Try each permutation
  for (const perm of permutations) {
    let isMatch = true

    // Map zones according to this permutation
    const mappedSolution = {}
    for (const [zone, words] of Object.entries(correctSolution)) {
      let mappedZone = zone

      if (zone.startsWith('only-')) {
        const circleNum = parseInt(zone.split('-')[1])
        mappedZone = `only-${perm[circleNum - 1]}`
      } else if (zone.includes('-') && zone !== 'center') {
        const circles = zone.split('-').map(Number)
        const mappedCircles = circles.map(c => perm[c - 1]).sort()
        mappedZone = mappedCircles.join('-')
      }
      // 'center' stays as 'center'

      mappedSolution[mappedZone] = words
    }

    // Compare this permutation with player's placements
    for (const [zone, words] of Object.entries(mappedSolution)) {
      const playerWords = placements[zone] || []
      if (playerWords.length !== words.length) {
        isMatch = false
        break
      }

      // Check if all words match (order doesn't matter)
      const sortedPlayer = [...playerWords].sort()
      const sortedCorrect = [...words].sort()
      if (!sortedPlayer.every((w, i) => w === sortedCorrect[i])) {
        isMatch = false
        break
      }
    }

    if (isMatch) return true
  }

  return false
}

export default App
