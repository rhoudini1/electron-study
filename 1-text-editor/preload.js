const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  saveText: (text) => ipcRenderer.invoke("save", text),
  saveTextAs: (text) => ipcRenderer.invoke("save-as", text),

  onSaveMenuBtnClicked: (callback) => ipcRenderer.on("save-btn-click", (_event) => callback()),
  onSaveAsMenuBtnClicked: (callback) => ipcRenderer.on("saveas-btn-click", (_event) => callback()),
});
