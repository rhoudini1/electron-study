const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * Sends a text to main process, to be handled by a save dialog box.
   * @param {string} text Content to be saved in a text file.
   * @return {string | null} File location where it was saved.
   */
  saveText: (text) => ipcRenderer.invoke("save", text),
  /**
   * This function is triggered when the save button is clicked on window menu.
   * @param {function} callback Function to be called when event is triggered.
   */
  onSaveMenuBtnClicked: (callback) => ipcRenderer.on("save-btn-click", (_event) => callback()),
});
