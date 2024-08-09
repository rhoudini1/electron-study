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
          click: () => console.log("save as"), // todo
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
    const result = await dialog.showSaveDialog(mainWindow, {
      defaultPath: "filename.txt",
      filters: [
        { name: "Text Files", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });
    if (result.canceled) return null;
    filePath = result.filePath;
    const isFileSaved = writeToFile(text);
    return isFileSaved ? filePath : null;
  } else {
    const isFileSaved = writeToFile(text);
    return isFileSaved ? filePath : null;
  }
});

function writeToFile(data) {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log("Error saving file.", err);
      return false;
    }
  });
  return true;
}
