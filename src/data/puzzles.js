// Sample puzzle data
export const samplePuzzle = {
  circles: ['Sweet', 'Grows', 'Gifts'],
  words: [
    // Only Sweet (2)
    'Candy', 'Sugar',
    // Only Grows (2)
    'Tree', 'Grass',
    // Only Gifts (2)
    'Jewelry', 'Money',
    // Sweet + Grows (2)
    'Strawberry', 'Peach',
    // Sweet + Gifts (2)
    'Chocolate', 'Perfume',
    // Grows + Gifts (2)
    'Flower', 'Tulip',
    // All three (2)
    'Rose', 'Honey'
  ],
  solution: {
    'only-1': ['Candy', 'Sugar'],
    'only-2': ['Tree', 'Grass'],
    'only-3': ['Jewelry', 'Money'],
    '1-2': ['Strawberry', 'Peach'],
    '1-3': ['Chocolate', 'Perfume'],
    '2-3': ['Flower', 'Tulip'],
    'center': ['Rose', 'Honey']
  }
}

// Additional puzzle examples
export const puzzles = [
  samplePuzzle,

  // Puzzle 2: Technology, Communication, Office
  {
    circles: ['Technology', 'Communication', 'Office'],
    words: [
      'Laptop', 'Server',
      'Letter', 'Speech',
      'Desk', 'Chair',
      'Email', 'Phone',
      'Tablet', 'Computer',
      'Fax', 'Memo',
      'Telephone', 'Printer'
    ],
    solution: {
      'only-1': ['Laptop', 'Server'],
      'only-2': ['Letter', 'Speech'],
      'only-3': ['Desk', 'Chair'],
      '1-2': ['Email', 'Phone'],
      '1-3': ['Tablet', 'Computer'],
      '2-3': ['Fax', 'Memo'],
      'center': ['Telephone', 'Printer']
    }
  },

  // Puzzle 3: Cold, Wet, Winter
  {
    circles: ['Cold', 'Wet', 'Winter'],
    words: [
      'Ice', 'Freezer',
      'Rain', 'Ocean',
      'Scarf', 'Ski',
      'Sleet', 'Hail',
      'Snowman', 'Icicle',
      'Puddle', 'Flood',
      'Snow', 'Frost'
    ],
    solution: {
      'only-1': ['Ice', 'Freezer'],
      'only-2': ['Rain', 'Ocean'],
      'only-3': ['Scarf', 'Ski'],
      '1-2': ['Sleet', 'Hail'],
      '1-3': ['Snowman', 'Icicle'],
      '2-3': ['Puddle', 'Flood'],
      'center': ['Snow', 'Frost']
    }
  }
]
