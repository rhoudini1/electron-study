const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("radioApi", {
  getStations: () => ipcRenderer.invoke("get-stations"),
});
