/**
 * Formats a given date string in ISO format to a human-readable format.
 * The resulting format will be "Thursday 25th of July, 3:00 PM" (or similar).
 * @param {string} isoDate - The date in ISO format (e.g., "2023-07-25T15:00:00").
 * @returns {string} - The formatted date in a human-readable format.
 */
const formatDate = (isoDate) => {
  // Convert the ISO date string to a Date object
  const date = new Date(isoDate);

  // Options for formatting the date
  const options = {
    weekday: 'long', // "Thursday"
    day: 'numeric', // "25th"
    month: 'long', // "July"
    hour: 'numeric', // "3pm"
    minute: 'numeric', // "00" (optional)
    hour12: true, // Use 12-hour format (optional)
  };

  // Create a new DateTimeFormat object with the specified options
  const formatter = new Intl.DateTimeFormat('en-US', options);

  // Format the date and return the result
  return formatter.format(date);
};

export default formatDate;
