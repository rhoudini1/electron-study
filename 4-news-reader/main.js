const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const { getNews } = require("./js/news-api");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 700,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(async () => {
  createWindow();

  ipcMain.handle("get-news", async (event, category) => {
    const news = await getNews(category);
    return JSON.stringify(news);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
