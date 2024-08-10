const electron = require("electron");
const fs = require("fs");
const path = require("node:path");
const { app, BrowserWindow, ipcMain, dialog, Menu } = electron;

let mainWindow;
let filePath = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const menuTemplate = [
    ...(process.platform === "darwin" ? [{ label: app.getName(), submenu: [{ role: about }] }] : []),
    {
      label: "File",
      submenu: [
        {
          label: "Save",
          click: () => mainWindow.webContents.send("save-btn-click"),
        },
        {
          label: "Save as",
          click: () => mainWindow.webContents.send("saveas-btn-click"),
        },
      ],
    },
    {
      role: "editMenu",
    },
  ];

  mainWindow.loadFile("index.html");
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("save", async (event, text) => {
  if (!filePath) {
    filePath = await getFilePathFromSaveDialog();
  }
  if (!filePath) return null;
  const isFileSaved = writeToFile(text);
  return isFileSaved ? filePath : null;
});

ipcMain.handle("save-as", async (event, text) => {
  const tempFilePath = await getFilePathFromSaveDialog();
  if (tempFilePath) filePath = tempFilePath;
  const isFileSaved = writeToFile(text);
  return isFileSaved ? filePath : null;
});

/**
 * Displays a save dialog and returns the file path that was chosen.
 * @returns { string | null } The file path that user selected; null if canceled.
 */
async function getFilePathFromSaveDialog() {
  const result = await dialog.showSaveDialog(mainWindow, {
    defaultPath: "filename.txt",
    filters: [
      { name: "Text Files", extensions: ["txt"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });
  return result.canceled ? null : result.filePath;
}

/**
 * Helper function to only write text to a file.
 * @param {string} data Text to be saved in a text file.
 * @returns { boolean } Confirmation if file was succesfully saved.
 */
function writeToFile(data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log("Error saving file.", err);
      return false;
    }
  });
  return true;
}
