# Daily Puzzles

This directory contains JSON files for each day's puzzle.

## File Naming Convention

Each puzzle file should be named in the format: `YYYY-MM-DD.json`

Example: `2025-11-09.json`

## Puzzle Format

Each JSON file should contain:

```json
{
  "circles": ["Theme1", "Theme2", "Theme3"],
  "words": [
    "Word1", "Word2", "Word3", "Word4",
    "Word5", "Word6", "Word7", "Word8",
    "Word9", "Word10", "Word11", "Word12",
    "Word13", "Word14"
  ],
  "solution": {
    "only-1": ["Word1", "Word2"],
    "only-2": ["Word3", "Word4"],
    "only-3": ["Word5", "Word6"],
    "1-2": ["Word7", "Word8"],
    "1-3": ["Word9", "Word10"],
    "2-3": ["Word11", "Word12"],
    "center": ["Word13", "Word14"]
  }
}
```

## Requirements

- **Exactly 3 circles/themes**
- **Exactly 14 words total**
- Words should be distributed as follows:
  - 2 words for Theme 1 only
  - 2 words for Theme 2 only
  - 2 words for Theme 3 only
  - 2 words for Theme 1 + Theme 2
  - 2 words for Theme 1 + Theme 3
  - 2 words for Theme 2 + Theme 3
  - 2 words for all three themes (center)

## Solution Format

The `solution` object contains the correct placement for each zone:

- `only-1`: Words that belong only to Theme 1
- `only-2`: Words that belong only to Theme 2
- `only-3`: Words that belong only to Theme 3
- `1-2`: Words that belong to Theme 1 AND Theme 2 (but not Theme 3)
- `1-3`: Words that belong to Theme 1 AND Theme 3 (but not Theme 2)
- `2-3`: Words that belong to Theme 2 AND Theme 3 (but not Theme 1)
- `center`: Words that belong to all three themes

## Adding New Puzzles

1. Create a new file: `public/puzzles/YYYY-MM-DD.json`
2. Add the three themes in the `circles` array
3. Add 14 words in the `words` array (in any order)
4. Deploy to your hosting service (Vercel, Netlify, Cloudflare Pages, etc.)

## Example

```json
{
  "circles": ["Liquid", "Blue", "Drinkable"],
  "words": [
    "Lava", "Mercury", "Sapphire", "Blueberry",
    "Milk", "Coffee", "Blue Paint", "Windex",
    "Orange Juice", "Tea", "Blue Slushie", "Blue Gatorade",
    "Water", "Blue Raspberry Soda"
  ],
  "solution": {
    "only-1": ["Lava", "Mercury"],
    "only-2": ["Sapphire", "Blueberry"],
    "only-3": ["Milk", "Coffee"],
    "1-2": ["Blue Paint", "Windex"],
    "1-3": ["Orange Juice", "Tea"],
    "2-3": ["Blue Slushie", "Blue Gatorade"],
    "center": ["Water", "Blue Raspberry Soda"]
  }
}
```
