const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { getUnknownSongTitle, secondsToTime } = require("./helpers");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

/* ============
      IPC
============ */
ipcMain.handle("parseFiles", async (event, filePathsJson) => {
  const { parseFile } = await import("music-metadata");
  const filePaths = JSON.parse(filePathsJson);
  const metadata = [];
  for (const path of filePaths) {
    const data = await parseFile(path);
    metadata.push({
      title: data.common.title ?? getUnknownSongTitle(path),
      artist: data.common.artist ?? "Unknown",
      duration: secondsToTime(data.format.duration),
    });
  }
  return JSON.stringify(metadata);
});
