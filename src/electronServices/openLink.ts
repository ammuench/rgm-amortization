import { ipcMain, shell } from "electron";
import CHANNELS from "../shared/channels";

ipcMain.handle(CHANNELS.OPEN_DESKTOP_BROWSER, async (event, url: string) => {
  shell.openExternal(url);
});
