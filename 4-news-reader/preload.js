const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("newsApi", {
  getNews: (news) => ipcRenderer.invoke("get-news", news),
});
