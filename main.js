const electron = require("electron");
const fs = require("fs");
const path = require("node:path");
const { app, BrowserWindow, ipcMain, dialog } = electron;

let mainWindow;
let filePath = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
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
  if (!filePath) {
    dialog
      .showSaveDialog(mainWindow, {
        defaultPath: "filename.txt",
        filters: [
          { name: "Text Files", extensions: ["txt"] },
          { name: "All Files", extensions: ["*"] },
        ],
      })
      .then((result) => {
        if (result.canceled) return;
        filePath = result.filePath;
        writeToFile(text);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    writeToFile(text);
  }
});

function writeToFile(data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) console.log("Error saving file.", err);
  });
}
