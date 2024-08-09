const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * Sends a text to main process, to be handled by a save dialog box.
   * @param {string} text Content to be saved in a text file.
   * @return {string | null} File location where it was saved.
   */
  saveText: (text) => ipcRenderer.invoke("save", text),
});
