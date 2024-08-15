/**
 * Helper function to retrieve song name based on file name.
 * @param {string} Song path received from file input.
 * @returns {string} The song name based on file name.
 */
const getUnknownSongTitle = (path) => {
  const splitPath = path.split("\\");
  const song = splitPath[splitPath.length - 1];
  const lastDotIndex = song.lastIndexOf(".");
  return lastDotIndex === -1 ? song : song.substring(0, lastDotIndex);
};

module.exports = { getUnknownSongTitle };
