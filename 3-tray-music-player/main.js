const path = require("node:path");
const { app, BrowserWindow, ipcMain, Tray } = require("electron");
const { getUnknownSongTitle } = require("./helpers");

let tray = null;
let win = null;

const createWindow = () => {
  if (process.platform === "darwin") {
    app.dock.hide();
  }
  win = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("index.html");
  win.hide();
};

app.whenReady().then(() => {
  createWindow();
  tray = new Tray("images/iconTemplate.png");

  tray.on("click", (event, bounds) => {
    const { x, y } = bounds;
    const { width, height } = win.getBounds();
    if (win.isVisible()) {
      win.hide();
    } else {
      win.setBounds({
        x: x - width / 2,
        y: process.platform === "darwin" ? y : y - height,
        width,
        height,
      });
      win.show();
    }
  });

  win.on("blur", () => {
    win.hide();
  });
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
