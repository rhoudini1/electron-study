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

/* Helper function offered by AcodebiZ in this video
  to convert time in seconds to human readable minute length */
function secondsToTime(t) {
  return padZero(parseInt((t / 60) % 60)) + ":" + padZero(parseInt(t % 60));
}
function padZero(v) {
  return v < 10 ? "0" + v : v;
}

module.exports = { getUnknownSongTitle, secondsToTime };
