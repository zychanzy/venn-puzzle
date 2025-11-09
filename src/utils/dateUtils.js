/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Date string like '2025-11-09'
 */
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Fetch today's puzzle from the server
 * @returns {Promise<Object>} Puzzle object with circles and words
 */
export const fetchTodaysPuzzle = async () => {
  const date = getTodayDate();

  try {
    const response = await fetch(`/puzzles/${date}.json`);

    if (!response.ok) {
      throw new Error(`Puzzle not found for ${date}`);
    }

    const puzzle = await response.json();
    return puzzle;
  } catch (error) {
    console.error('Error fetching puzzle:', error);
    throw error;
  }
};
