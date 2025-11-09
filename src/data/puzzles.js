// Sample puzzle data
export const samplePuzzle = {
  circles: ['Liquid', 'Blue', 'Drinkable'],
  words: [
    // Only Liquid (2)
    'Lava', 'Mercury',
    // Only Blue (2)
    'Sapphire', 'Blueberry',
    // Only Drinkable (2)
    'Milk', 'Coffee',
    // Liquid + Blue (2)
    'Blue Paint', 'Windex',
    // Liquid + Drinkable (2)
    'Orange Juice', 'Tea',
    // Blue + Drinkable (2)
    'Blue Slushie', 'Blue Gatorade',
    // All three (2)
    'Water', 'Blue Raspberry Soda'
  ],
  solution: {
    'only-1': ['Lava', 'Mercury'],
    'only-2': ['Sapphire', 'Blueberry'],
    'only-3': ['Milk', 'Coffee'],
    '1-2': ['Blue Paint', 'Windex'],
    '1-3': ['Orange Juice', 'Tea'],
    '2-3': ['Blue Slushie', 'Blue Gatorade'],
    'center': ['Water', 'Blue Raspberry Soda']
  }
}

// Additional puzzle examples
export const puzzles = [
  samplePuzzle
]
