const path = require("node:path");
const { app, BrowserWindow, ipcMain } = require("electron");
const { getUnknownSongTitle } = require("./helpers");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 400,
    height: 500,
    minWidth: 320,
    minHeight: 400,
    maxWidth: 480,
    maxHeight: 600,
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
      duration: data.format.duration,
      path: path.replace(/\\/g, "/"),
    });
  }
  return JSON.stringify(metadata);
});
