const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { RadioBrowserApi, StationSearchType } = require("radio-browser-api");

const radioApi = new RadioBrowserApi("electron-radio-app");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();

  ipcMain.handle("get-stations", async (event) => {
    const stations = await radioApi.searchStations({
      countryCode: "US",
      limit: 20,
      offset: 0,
    });
    return JSON.stringify(stations);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
