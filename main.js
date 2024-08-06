const electron = require("electron");
const fs = require("fs");
const path = require("node:path");
const { app, BrowserWindow, ipcMain } = electron;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadFile("index.html");
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("save", (event, text) => {
  // todo: popup to show save dialog window
  fs.writeFile("text.txt", text, (err) => {
    if (err) console.log("Error saving file.", err);
  });
});
