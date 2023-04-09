import { ipcMain, BrowserWindow, dialog, app } from "electron";
import * as jetpack from "fs-jetpack";

import CHANNELS from "../shared/channels";

ipcMain.handle(CHANNELS.SAVE_FILE, async (event, configData: string) => {
  const currWindow = BrowserWindow.getFocusedWindow();
  if (currWindow) {
    const filePath = dialog.showSaveDialogSync(currWindow, {
      title: "Save Amortization Data",
      defaultPath: app.getPath("home"),
      filters: [
        {
          name: "Amortization File",
          extensions: ["AMOR"],
        },
      ],
      properties: ["showOverwriteConfirmation"],
    });
    if (filePath) {
      try {
        let filePathToUse = filePath;
        const [REGEX_MATCH] = filePath.match(/.amor$/i) ?? [];
        if (!REGEX_MATCH) {
          filePathToUse = `${filePath}.amor`;
        }
        await jetpack.writeAsync(filePathToUse, configData);
        return "FILE_WRITTEN";
      } catch (e) {
        return "ERROR";
      }
    } else {
      return null;
    }
  }
});
