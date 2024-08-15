const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("mm", {
  parseFiles: (filePaths) => ipcRenderer.invoke("parseFiles", filePaths),
});
