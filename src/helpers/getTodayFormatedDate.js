/**
 * Returns the current date in a formatted string.
 * The resulting format will be in "YYYY-MM-DD" (e.g., "2023-07-25").
 * @returns {string} - The formatted current date string.
 */
const getTodayFormattedDate = () => {
  // Get the current date as a string in ISO format (e.g., "2023-07-25T15:00:00")
  const today = new Date().toISOString().slice(0, 10);

  // Return the date in the desired format ("YYYY-MM-DD")
  return today;
};

export default getTodayFormattedDate;
