// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import CHANNELS from "./shared/channels";

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("channels", {
  saveFile: (tableData: any[]) =>
    ipcRenderer.invoke(CHANNELS.SAVE_FILE, tableData),
});
